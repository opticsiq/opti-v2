#!/bin/bash

echo "🔧 إصلاح مشكلة الصفحة البيضاء وإنشاء رابط عام"
echo "================================================="

# Stop all existing processes
echo "🛑 إيقاف العمليات السابقة..."
pkill -f "vite" > /dev/null 2>&1
pkill -f "node.*index.js" > /dev/null 2>&1
pkill -f "ssh.*serveo" > /dev/null 2>&1
sleep 2

# Start backend server
echo "🔗 تشغيل الخادم الخلفي..."
cd server
node index.js > backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

# Check backend
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ الخادم الخلفي يعمل على المنفذ 5000"
else
    echo "❌ فشل في تشغيل الخادم الخلفي"
    exit 1
fi

# Start frontend server
echo "🎨 تشغيل الخادم الأمامي..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 8

# Check frontend
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ الخادم الأمامي يعمل على المنفذ 8080"
else
    echo "❌ فشل في تشغيل الخادم الأمامي"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "================================================="
echo "🌐 إنشاء رابط عام باستخدام Serveo..."
echo "================================================="

# Create public tunnel
echo "⏳ جاري إنشاء النفق العام..."
(ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -R 80:localhost:8080 serveo.net 2>&1 | tee serveo_tunnel.log) &
TUNNEL_PID=$!

sleep 10

# Extract URL from log
PUBLIC_URL=$(grep -o 'https://[a-zA-Z0-9]*\.serveo\.net' serveo_tunnel.log 2>/dev/null | head -1)

if [ ! -z "$PUBLIC_URL" ]; then
    echo "================================================="
    echo "🎉 تم إنشاء الرابط العام بنجاح!"
    echo "================================================="
    echo ""
    echo "🌐 الرابط العام: $PUBLIC_URL"
    echo ""
    echo "📱 الروابط المباشرة:"
    echo "   🏠 الصفحة الرئيسية: $PUBLIC_URL"
    echo "   👤 تسجيل دخول العملاء: $PUBLIC_URL/login"  
    echo "   👨‍💼 تسجيل دخول المدراء: $PUBLIC_URL/admin/login"
    echo "   🧪 صفحة الاختبار: $PUBLIC_URL/test"
    echo ""
    echo "🔑 حسابات الاختبار:"
    echo "   عميل: customer@test.com / password123"
    echo "   مدير: admin@test.com / admin123"
    echo ""
    echo "================================================="
    echo "✅ النظام يعمل الآن بشكل كامل!"
    echo "================================================="
    echo ""
    echo "📊 حالة الخوادم:"
    echo "   🔗 Backend: http://localhost:5000 ✅"
    echo "   🎨 Frontend: http://localhost:8080 ✅"
    echo "   🌐 Public: $PUBLIC_URL ✅"
    echo ""
    echo "⚠️  اتركه يعمل لاستمرار الخدمة"
    echo "⚠️  اضغط Ctrl+C لإيقاف جميع الخدمات"
    
    # Save URL for later use
    echo "$PUBLIC_URL" > current_public_url.txt
    
else
    echo "================================================="
    echo "⚠️  لم يتم إنشاء رابط تلقائي"
    echo "================================================="
    echo ""
    echo "🔧 لإنشاء رابط عام يدوياً:"
    echo "1. افتح terminal جديد"
    echo "2. شغل: ssh -R 80:localhost:8080 serveo.net"
    echo "3. انسخ الرابط الذي يظهر"
    echo ""
    echo "📱 الخوادم المحلية تعمل على:"
    echo "   Frontend: http://localhost:8080"
    echo "   Backend: http://localhost:5000"
fi

# Keep running
trap "echo '🛑 إيقاف الخدمات...'; kill $BACKEND_PID $FRONTEND_PID $TUNNEL_PID 2>/dev/null; exit" INT TERM
wait