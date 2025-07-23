#!/bin/bash

echo "🌐 إنشاء رابط عام لمنصة Opti"
echo "=================================="

# Check if servers are running
echo "🔍 فحص حالة الخوادم..."

if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ الخادم الأمامي يعمل (المنفذ 8080)"
    FRONTEND_RUNNING=true
else
    echo "❌ الخادم الأمامي لا يعمل"
    FRONTEND_RUNNING=false
fi

if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ الخادم الخلفي يعمل (المنفذ 5000)"
    BACKEND_RUNNING=true
else
    echo "❌ الخادم الخلفي لا يعمل"
    BACKEND_RUNNING=false
fi

# Start servers if needed
if [ "$FRONTEND_RUNNING" = false ] || [ "$BACKEND_RUNNING" = false ]; then
    echo "🚀 تشغيل الخوادم المطلوبة..."
    
    # Kill existing processes
    pkill -f "vite" > /dev/null 2>&1
    pkill -f "node.*index.js" > /dev/null 2>&1
    sleep 2
    
    # Start backend
    if [ "$BACKEND_RUNNING" = false ]; then
        echo "🔗 تشغيل الخادم الخلفي..."
        cd server
        node index.js > /dev/null 2>&1 &
        cd ..
        sleep 3
    fi
    
    # Start frontend
    if [ "$FRONTEND_RUNNING" = false ]; then
        echo "🎨 تشغيل الخادم الأمامي..."
        npm run dev > /dev/null 2>&1 &
        sleep 5
    fi
fi

echo "=================================="
echo "🌐 خيارات الوصول العام:"
echo "=================================="

# Method 1: Using serveo.net (SSH tunnel)
echo "1️⃣  استخدام Serveo (مجاني):"
echo "   ssh -R 80:localhost:8080 serveo.net"
echo ""

# Method 2: Using localhost.run
echo "2️⃣  استخدام localhost.run (مجاني):"
echo "   ssh -R 80:localhost:8080 nokey@localhost.run"
echo ""

# Method 3: Using ngrok (if available)
if command -v ngrok &> /dev/null || [ -f "./ngrok" ]; then
    echo "3️⃣  استخدام Ngrok:"
    if [ -f "./ngrok" ]; then
        echo "   ./ngrok http 8080"
    else
        echo "   ngrok http 8080"
    fi
    echo ""
fi

echo "=================================="
echo "🚀 تشغيل تلقائي لـ Serveo:"
echo "=================================="

echo "⏳ جاري إنشاء نفق عام باستخدام Serveo..."
echo "📝 سيتم عرض الرابط العام خلال ثوانٍ..."

# Try to create serveo tunnel
timeout 10 ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -R 80:localhost:8080 serveo.net 2>&1 | grep -o 'https://[^[:space:]]*' | head -1 > serveo_url.txt &

sleep 8

if [ -f "serveo_url.txt" ] && [ -s "serveo_url.txt" ]; then
    PUBLIC_URL=$(cat serveo_url.txt)
    if [ ! -z "$PUBLIC_URL" ]; then
        echo "=================================="
        echo "🎉 تم إنشاء الرابط العام بنجاح!"
        echo "=================================="
        echo "🌐 رابط التطبيق: $PUBLIC_URL"
        echo "🧪 صفحة الاختبار: $PUBLIC_URL/test"
        echo "👤 تسجيل دخول العملاء: $PUBLIC_URL/login"
        echo "👨‍💼 تسجيل دخول المدراء: $PUBLIC_URL/admin/login"
        echo "=================================="
        echo "👤 حساب العميل: customer@test.com / password123"
        echo "👨‍💼 حساب المدير: admin@test.com / admin123"
        echo "=================================="
        echo "⚠️  ملاحظة: الرابط مجاني ومؤقت"
        rm -f serveo_url.txt
        exit 0
    fi
fi

echo "=================================="
echo "⚠️  لم يتم إنشاء رابط تلقائي"
echo "=================================="
echo "🔧 تشغيل يدوي:"
echo ""
echo "1. لإنشاء رابط عام باستخدام Serveo:"
echo "   ssh -R 80:localhost:8080 serveo.net"
echo ""
echo "2. لإنشاء رابط عام باستخدام localhost.run:"
echo "   ssh -R 80:localhost:8080 nokey@localhost.run"
echo ""
echo "3. بعد تشغيل أي من الأوامر أعلاه، ستحصل على رابط عام"
echo "   يمكنك مشاركته مع أي شخص على الإنترنت"
echo ""
echo "=================================="
echo "📱 الخوادم المحلية تعمل على:"
echo "   Frontend: http://localhost:8080"
echo "   Backend: http://localhost:5000"
echo "=================================="

rm -f serveo_url.txt