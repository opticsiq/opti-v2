require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function createDatabase() {
    let connection;
    
    try {
        console.log('🔄 بدء إنشاء قاعدة البيانات...');
        
        // الاتصال بـ MySQL باستخدام root وكلمة المرور مباشرة
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Muhaiminqais3981656100@@',
            port: 3306
        });

        console.log('✅ تم الاتصال بـ MySQL بنجاح');

        // ... باقي الكود كما هو ...

    } catch (error) {
        console.error('حدث خطأ أثناء إنشاء قاعدة البيانات:', error);
    }
}

createDatabase(); 