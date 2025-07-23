#!/bin/bash

echo "🚀 تشغيل خوادم منصة Opti..."
echo "=================================="

# Function to check if port is in use
check_port() {
    if curl -s http://localhost:$1 > /dev/null 2>&1; then
        echo "✅ المنفذ $1 يعمل"
        return 0
    else
        echo "❌ المنفذ $1 لا يعمل"
        return 1
    fi
}

# Kill existing processes
echo "🔄 إيقاف الخوادم السابقة..."
pkill -f "vite" > /dev/null 2>&1
pkill -f "node.*index.js" > /dev/null 2>&1
sleep 2

# Start backend server
echo "🔗 تشغيل الخادم الخلفي (Backend)..."
cd server
node index.js > /dev/null 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

# Check backend
if check_port 5000; then
    echo "✅ الخادم الخلفي يعمل على المنفذ 5000"
else
    echo "❌ فشل في تشغيل الخادم الخلفي"
    exit 1
fi

# Start frontend server
echo "🎨 تشغيل الخادم الأمامي (Frontend)..."
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
sleep 5

# Check frontend
if check_port 8080; then
    echo "✅ الخادم الأمامي يعمل على المنفذ 8080"
else
    echo "❌ فشل في تشغيل الخادم الأمامي"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "=================================="
echo "🎉 تم تشغيل جميع الخوادم بنجاح!"
echo "=================================="
echo "📱 الواجهة الأمامية: http://localhost:8080"
echo "🔗 API الخلفي: http://localhost:5000"
echo "🧪 صفحة الاختبار: http://localhost:8080/test"
echo "=================================="
echo "👤 حساب العميل: customer@test.com / password123"
echo "👨‍💼 حساب المدير: admin@test.com / admin123"
echo "=================================="
echo "⚠️  اضغط Ctrl+C لإيقاف الخوادم"

# Keep script running
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait