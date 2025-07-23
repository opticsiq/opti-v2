#!/bin/bash

echo "🔄 إعادة تشغيل مع الإعدادات المُصححة"
echo "====================================="

# Kill all processes
pkill -f "vite\|node.*index.js\|ssh.*serveo" > /dev/null 2>&1
sleep 3

# Start backend
echo "🔗 تشغيل Backend..."
cd server && node index.js > ../backend.log 2>&1 &
cd ..
sleep 3

# Start frontend with fixed config
echo "🎨 تشغيل Frontend (مع allowedHosts: 'all')..."
npm run dev > frontend.log 2>&1 &
sleep 8

# Create new tunnel
echo "🌐 إنشاء نفق عام جديد..."
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -R 80:localhost:8080 serveo.net 2>&1 | tee tunnel.log &

sleep 10

# Extract URL
URL=$(grep -o 'https://[a-zA-Z0-9]*\.serveo\.net' tunnel.log 2>/dev/null | head -1)

if [ ! -z "$URL" ]; then
    echo "====================================="
    echo "🎉 الرابط العام الجديد:"
    echo "$URL"
    echo "====================================="
    echo ""
    echo "📱 الروابط:"
    echo "🏠 الرئيسية: $URL"
    echo "👤 العملاء: $URL/login"
    echo "👨‍💼 المدراء: $URL/admin/login"
    echo ""
    echo "🔑 حسابات الاختبار:"
    echo "عميل: customer@test.com / password123"
    echo "مدير: admin@test.com / admin123"
    echo ""
    echo "✅ المشكلة تم حلها! allowedHosts: 'all' تم إضافتها"
else
    echo "⚠️ جاري إنشاء الرابط... انتظر قليلاً"
fi

echo "🔄 الخوادم تعمل في الخلفية"