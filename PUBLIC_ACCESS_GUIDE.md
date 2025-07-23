# دليل الوصول العام لمنصة Opti

## 🌐 كيفية الحصول على رابط عام للتطبيق

حالياً التطبيق يعمل على `localhost` فقط. لجعله متاحاً على الإنترنت، يمكنك استخدام إحدى الطرق التالية:

## 🚀 الطرق المتاحة

### 1. **Serveo.net (مجاني ومؤقت)**
```bash
# تأكد من تشغيل الخوادم أولاً
./run-servers.sh

# في terminal جديد، شغل:
ssh -R 80:localhost:8080 serveo.net
```
**النتيجة:** ستحصل على رابط مثل `https://abc123.serveo.net`

### 2. **localhost.run (مجاني ومؤقت)**
```bash
# تأكد من تشغيل الخوادم أولاً
./run-servers.sh

# في terminal جديد، شغل:
ssh -R 80:localhost:8080 nokey@localhost.run
```
**النتيجة:** ستحصل على رابط مثل `https://abc123.localhost.run`

### 3. **Ngrok (مجاني مع حدود)**
```bash
# تحميل وتثبيت ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar xzf ngrok-v3-stable-linux-amd64.tgz
chmod +x ngrok

# تشغيل النفق
./ngrok http 8080
```

### 4. **VS Code Port Forwarding (إذا كنت تستخدم VS Code)**
1. افتح VS Code
2. اذهب إلى تبويب "PORTS"
3. اضغط "Forward a Port"
4. أدخل `8080`
5. اختر "Public" للوصول العام

## 📱 الاستخدام بعد الحصول على الرابط

بمجرد حصولك على رابط عام (مثل `https://abc123.serveo.net`):

### للعملاء:
- **الصفحة الرئيسية:** `https://abc123.serveo.net`
- **تسجيل الدخول:** `https://abc123.serveo.net/login`
- **البريد:** customer@test.com
- **كلمة المرور:** password123

### للمدراء:
- **تسجيل الدخول:** `https://abc123.serveo.net/admin/login`
- **البريد:** admin@test.com
- **كلمة المرور:** admin123

### للاختبار:
- **صفحة الاختبار:** `https://abc123.serveo.net/test`

## ⚠️ ملاحظات مهمة

### الأمان:
- الروابط المجانية مؤقتة وغير آمنة للاستخدام الإنتاجي
- لا تستخدمها لبيانات حساسة حقيقية
- الروابط تنتهي عند إغلاق البرنامج

### الأداء:
- قد تكون السرعة أبطأ من الاستخدام المحلي
- بعض الخدمات لها حدود على عدد الطلبات

## 🔧 استكشاف الأخطاء

### إذا لم يعمل SSH:
```bash
# تأكد من وجود SSH
which ssh

# إذا لم يكن موجوداً، ثبته:
sudo apt update && sudo apt install openssh-client
```

### إذا لم تحصل على رابط:
1. تأكد من تشغيل الخوادم المحلية
2. تحقق من الاتصال بالإنترنت
3. جرب خدمة أخرى

### إذا ظهر خطأ "Connection refused":
1. تأكد من أن المنفذ 8080 يعمل: `curl http://localhost:8080`
2. أعد تشغيل الخوادم: `./run-servers.sh`

## 🚀 سكريبت سريع

استخدم هذا السكريبت لإعداد كل شيء تلقائياً:
```bash
./create-public-link.sh
```

## 📞 للدعم

إذا واجهت مشاكل:
1. تأكد من تشغيل `./run-servers.sh` أولاً
2. استخدم صفحة الاختبار: `http://localhost:8080/test`
3. راجع رسائل الخطأ في terminal

---

**نصيحة:** للاستخدام الدائم، فكر في نشر التطبيق على خدمة سحابية مثل Heroku أو Vercel.