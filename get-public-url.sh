#!/bin/bash

echo "🌐 إنشاء رابط عام لمنصة Opti"
echo "=================================="

# Check if server is running
if ! curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "❌ الخادم الأمامي لا يعمل على المنفذ 8080"
    echo "🚀 تشغيل الخادم..."
    ./run-servers.sh &
    sleep 10
fi

echo "✅ الخادم يعمل على http://localhost:8080"
echo ""

# Method 1: Try serveo
echo "🔄 محاولة 1: استخدام Serveo..."
(timeout 10 ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -R 80:localhost:8080 serveo.net 2>&1 | grep -E "Forwarding.*https://.*serveo.net" | head -1) &
SERVEO_PID=$!
sleep 8
kill $SERVEO_PID 2>/dev/null

# Method 2: Try localhost.run  
echo "🔄 محاولة 2: استخدام localhost.run..."
(timeout 10 ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -R 80:localhost:8080 nokey@localhost.run 2>&1 | grep -E "https://.*localhost.run" | head -1) &
LOCALHOST_PID=$!
sleep 8
kill $LOCALHOST_PID 2>/dev/null

echo ""
echo "=================================="
echo "🔧 إنشاء رابط عام يدوياً:"
echo "=================================="
echo ""
echo "لإنشاء رابط عام، افتح terminal جديد وشغل أحد هذه الأوامر:"
echo ""
echo "1️⃣ استخدام Serveo (الأسهل):"
echo "   ssh -R 80:localhost:8080 serveo.net"
echo ""
echo "2️⃣ استخدام localhost.run:"
echo "   ssh -R 80:localhost:8080 nokey@localhost.run"
echo ""
echo "3️⃣ استخدام Ngrok (يحتاج تسجيل):"
echo "   - اذهب إلى: https://dashboard.ngrok.com/signup"
echo "   - سجل حساب مجاني"
echo "   - احصل على authtoken"
echo "   - شغل: ./ngrok config add-authtoken YOUR_TOKEN"
echo "   - شغل: ./ngrok http 8080"
echo ""
echo "=================================="
echo "📱 بعد الحصول على الرابط:"
echo "=================================="
echo ""
echo "🌐 الصفحة الرئيسية: [الرابط العام]"
echo "👤 تسجيل دخول العملاء: [الرابط العام]/login"
echo "👨‍💼 تسجيل دخول المدراء: [الرابط العام]/admin/login"
echo "🧪 صفحة الاختبار: [الرابط العام]/test"
echo ""
echo "🔑 حسابات الاختبار:"
echo "   عميل: customer@test.com / password123"
echo "   مدير: admin@test.com / admin123"
echo ""
echo "=================================="

# Keep server running
echo "⚠️  الخادم يعمل الآن. اتركه يعمل أثناء إنشاء الرابط العام"
echo "⚠️  اضغط Ctrl+C لإيقاف الخادم"