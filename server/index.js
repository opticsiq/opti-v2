const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'opti-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Database setup
const dbPath = path.join(__dirname, 'opti.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table (customers and admins)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      cost DECIMAL(10,2) NOT NULL,
      description TEXT,
      image_url TEXT,
      stock INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      total_price DECIMAL(10,2) NOT NULL,
      profit DECIMAL(10,2) NOT NULL,
      status TEXT DEFAULT 'pending',
      customer_name TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES users (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `);

  // Insert default admin user
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`
    INSERT OR IGNORE INTO users (name, email, password, role) 
    VALUES ('المدير العام', 'admin@test.com', ?, 'admin')
  `, [adminPassword]);

  // Insert default customer
  const customerPassword = bcrypt.hashSync('password123', 10);
  db.run(`
    INSERT OR IGNORE INTO users (name, email, password, phone, address) 
    VALUES ('أحمد محمد العلي', 'customer@test.com', ?, '+966 50 123 4567', 'الرياض، المملكة العربية السعودية')
  `, [customerPassword]);

  // Insert sample products
  db.run(`
    INSERT OR IGNORE INTO products (name, type, price, cost, description, stock) 
    VALUES 
    ('نظارة طبية كلاسيكية', 'glasses', 250.00, 150.00, 'نظارة طبية عالية الجودة', 10),
    ('عدسات لاصقة شهرية', 'contacts', 120.00, 80.00, 'عدسات لاصقة مريحة للاستخدام الشهري', 25),
    ('نظارة شمسية رياضية', 'sunglasses', 180.00, 100.00, 'نظارة شمسية مثالية للأنشطة الرياضية', 15)
  `);

  // Insert sample orders
  db.run(`
    INSERT OR IGNORE INTO orders (customer_id, product_id, total_price, profit, status, customer_name) 
    VALUES 
    (2, 1, 250.00, 100.00, 'completed', 'أحمد محمد'),
    (2, 2, 120.00, 40.00, 'processing', 'فاطمة علي'),
    (2, 3, 180.00, 80.00, 'completed', 'محمد خالد')
  `);
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

// Get user profile
app.get('/api/profile', authenticateToken, (req, res) => {
  db.get('SELECT id, name, email, phone, address, role FROM users WHERE id = ?', 
    [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(user);
  });
});

// Get orders
app.get('/api/orders', authenticateToken, (req, res) => {
  let query = `
    SELECT o.*, p.name as product_name, p.type as product_type 
    FROM orders o 
    JOIN products p ON o.product_id = p.id
  `;
  let params = [];

  if (req.user.role === 'customer') {
    query += ' WHERE o.customer_id = ?';
    params.push(req.user.id);
  }

  query += ' ORDER BY o.created_at DESC';

  db.all(query, params, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(orders);
  });
});

// Get products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(products);
  });
});

// Get statistics
app.get('/api/stats', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const stats = {};

  // Get total customers
  db.get("SELECT COUNT(*) as count FROM users WHERE role = 'customer'", (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    stats.totalCustomers = result.count;

    // Get total orders
    db.get('SELECT COUNT(*) as count FROM orders', (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      stats.totalOrders = result.count;

      // Get total sales
      db.get('SELECT SUM(total_price) as total FROM orders', (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        stats.totalSales = result.total || 0;

        // Get pending orders
        db.get("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'", (err, result) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          stats.pendingOrders = result.count;

          res.json(stats);
        });
      });
    });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Opti Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Opti Server is running on port ${PORT}`);
  console.log(`📊 Admin login: admin@test.com / admin123`);
  console.log(`👤 Customer login: customer@test.com / password123`);
});