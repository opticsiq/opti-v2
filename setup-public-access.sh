#!/bin/bash

echo "🌐 إعداد الوصول العام لمنصة Opti"
echo "=================================="

# Function to install ngrok
install_ngrok() {
    echo "📦 تثبيت Ngrok..."
    
    # Download ngrok
    if ! command -v wget &> /dev/null; then
        echo "❌ wget غير متوفر. يرجى تثبيته أولاً"
        return 1
    fi
    
    # Download ngrok for Linux
    wget -q https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
    
    if [ $? -eq 0 ]; then
        tar xzf ngrok-v3-stable-linux-amd64.tgz
        chmod +x ngrok
        rm ngrok-v3-stable-linux-amd64.tgz
        echo "✅ تم تثبيت Ngrok بنجاح"
        return 0
    else
        echo "❌ فشل في تحميل Ngrok"
        return 1
    fi
}

# Check if ngrok exists
if ! command -v ./ngrok &> /dev/null && ! command -v ngrok &> /dev/null; then
    echo "⚠️  Ngrok غير مثبت. جاري التثبيت..."
    install_ngrok
    if [ $? -ne 0 ]; then
        echo "❌ فشل في تثبيت Ngrok"
        exit 1
    fi
    NGROK_CMD="./ngrok"
else
    if command -v ngrok &> /dev/null; then
        NGROK_CMD="ngrok"
    else
        NGROK_CMD="./ngrok"
    fi
    echo "✅ Ngrok متوفر"
fi

# Function to check if servers are running
check_servers() {
    echo "🔍 فحص حالة الخوادم..."
    
    # Check backend
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        echo "✅ الخادم الخلفي يعمل (المنفذ 5000)"
        BACKEND_RUNNING=true
    else
        echo "❌ الخادم الخلفي لا يعمل"
        BACKEND_RUNNING=false
    fi
    
    # Check frontend
    if curl -s http://localhost:8080 > /dev/null 2>&1; then
        echo "✅ الخادم الأمامي يعمل (المنفذ 8080)"
        FRONTEND_RUNNING=true
    else
        echo "❌ الخادم الأمامي لا يعمل"
        FRONTEND_RUNNING=false
    fi
}

# Start servers if not running
start_servers_if_needed() {
    if [ "$BACKEND_RUNNING" = false ] || [ "$FRONTEND_RUNNING" = false ]; then
        echo "🚀 تشغيل الخوادم..."
        
        # Kill any existing processes
        pkill -f "vite" > /dev/null 2>&1
        pkill -f "node.*index.js" > /dev/null 2>&1
        sleep 2
        
        # Start backend
        echo "🔗 تشغيل الخادم الخلفي..."
        cd server
        node index.js > /dev/null 2>&1 &
        BACKEND_PID=$!
        cd ..
        sleep 3
        
        # Start frontend
        echo "🎨 تشغيل الخادم الأمامي..."
        npm run dev > /dev/null 2>&1 &
        FRONTEND_PID=$!
        sleep 5
        
        # Verify servers started
        check_servers
        
        if [ "$BACKEND_RUNNING" = false ] || [ "$FRONTEND_RUNNING" = false ]; then
            echo "❌ فشل في تشغيل الخوادم"
            exit 1
        fi
    fi
}

# Main execution
check_servers
start_servers_if_needed

echo "=================================="
echo "🌐 إنشاء أنفاق الإنترنت العامة..."
echo "=================================="

# Create ngrok config
cat > ngrok.yml << EOF
version: "2"
tunnels:
  frontend:
    addr: 8080
    proto: http
  backend:
    addr: 5000
    proto: http
EOF

echo "📝 تم إنشاء ملف إعداد Ngrok"

# Start ngrok tunnels
echo "🚀 بدء تشغيل أنفاق Ngrok..."
echo "⏳ جاري الإعداد... (قد يستغرق بضع ثوانٍ)"

$NGROK_CMD start --all --config=ngrok.yml > /dev/null 2>&1 &
NGROK_PID=$!
sleep 5

# Get tunnel URLs
echo "🔗 جاري الحصول على الروابط العامة..."
TUNNELS=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null)

if [ $? -eq 0 ] && [ ! -z "$TUNNELS" ]; then
    echo "=================================="
    echo "🎉 تم إنشاء الروابط العامة بنجاح!"
    echo "=================================="
    
    # Extract URLs (basic parsing)
    FRONTEND_URL=$(echo "$TUNNELS" | grep -o 'https://[^"]*\.ngrok-free\.app' | head -1)
    BACKEND_URL=$(echo "$TUNNELS" | grep -o 'https://[^"]*\.ngrok-free\.app' | tail -1)
    
    if [ ! -z "$FRONTEND_URL" ] && [ ! -z "$BACKEND_URL" ]; then
        echo "🌐 رابط التطبيق: $FRONTEND_URL"
        echo "🔗 رابط API: $BACKEND_URL"
        echo "🧪 صفحة الاختبار: $FRONTEND_URL/test"
        echo "=================================="
        echo "👤 حساب العميل: customer@test.com / password123"
        echo "👨‍💼 حساب المدير: admin@test.com / admin123"
        echo "=================================="
        echo "📊 لوحة تحكم Ngrok: http://localhost:4040"
        echo "=================================="
        echo "⚠️  ملاحظة: الروابط مجانية وتنتهي عند إغلاق البرنامج"
        echo "⚠️  اضغط Ctrl+C لإيقاف جميع الخدمات"
    else
        echo "❌ فشل في الحصول على الروابط"
        echo "🔍 تحقق من لوحة تحكم Ngrok: http://localhost:4040"
    fi
else
    echo "❌ فشل في الاتصال بـ Ngrok"
    echo "🔍 تحقق من لوحة تحكم Ngrok: http://localhost:4040"
fi

# Keep running
trap "kill $NGROK_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait