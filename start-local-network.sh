#!/bin/bash

echo "🏠 تشغيل الخوادم على الشبكة المحلية"
echo "=================================="

# Stop existing processes
pkill -f "vite\|node.*index.js" > /dev/null 2>&1
sleep 2

# Start backend server
echo "🔗 تشغيل الخادم الخلفي..."
cd server
node index.js &
BACKEND_PID=$!
cd ..
sleep 3

# Start frontend server
echo "🎨 تشغيل الخادم الأمامي..."
npm run dev &
FRONTEND_PID=$!
sleep 5

echo "=================================="
echo "🌐 الروابط على شبكتك المحلية:"
echo "=================================="
echo ""
echo "📱 للوصول من أجهزة أخرى على نفس الشبكة:"
echo ""
echo "🏠 الصفحة الرئيسية:"
echo "   http://192.168.0.101:8080"
echo ""
echo "👤 تسجيل دخول العملاء:"
echo "   http://192.168.0.101:8080/login"
echo ""
echo "👨‍💼 تسجيل دخول المدراء:"
echo "   http://192.168.0.101:8080/admin/login"
echo ""
echo "🧪 صفحة الاختبار:"
echo "   http://192.168.0.101:8080/test"
echo ""
echo "=================================="
echo "🔑 حسابات الاختبار:"
echo "=================================="
echo "عميل: customer@test.com / password123"
echo "مدير: admin@test.com / admin123"
echo ""
echo "=================================="
echo "📋 ملاحظات:"
echo "=================================="
echo "• هذه الروابط تعمل فقط على شبكتك المحلية"
echo "• تأكد من أن الأجهزة الأخرى متصلة بنفس الشبكة"
echo "• قد تحتاج لتعطيل الجدار الناري مؤقتاً"
echo ""
echo "⚠️  اضغط Ctrl+C لإيقاف الخوادم"

# Keep running
trap "echo '🛑 إيقاف الخوادم...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait