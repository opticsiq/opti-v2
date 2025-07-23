#!/bin/bash

echo "🚀 بدء تشغيل منصة Opti..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت تبعيات Frontend..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 تثبيت تبعيات Backend..."
    cd server && npm install && cd ..
fi

echo "🔧 بدء تشغيل الخوادم..."

# Start backend server in background
echo "🔗 تشغيل Backend على المنفذ 5000..."
cd server && node index.js &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🎨 تشغيل Frontend على المنفذ 8080..."
echo "=================================="
echo "📱 الواجهة الأمامية: http://localhost:8080"
echo "🔗 API الخلفي: http://localhost:5000"
echo "=================================="
echo "👤 حساب العميل: customer@test.com / password123"
echo "👨‍💼 حساب المدير: admin@test.com / admin123"
echo "=================================="
echo "⚠️  اضغط Ctrl+C لإيقاف الخوادم"

npm run dev

# Cleanup: kill backend when frontend stops
kill $BACKEND_PID 2>/dev/null