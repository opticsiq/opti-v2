# دليل الإعداد السريع - Opti

## الإعداد السريع (5 دقائق)

### 1. تثبيت التبعيات
```bash
# تثبيت تبعيات Frontend
npm install

# تثبيت تبعيات Backend
cd server
npm install
cd ..
```

### 2. إعداد قاعدة البيانات
```bash
cd server
node setup-db.js
cd ..
```

### 3. تشغيل التطبيق
```bash
# تشغيل الخادم (في terminal منفصل)
cd server
npm run dev

# تشغيل Frontend (في terminal منفصل)
npm run dev
```

### 4. الوصول للتطبيق
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## حسابات الاختبار

### حساب العميل:
- **البريد:** customer@test.com
- **كلمة المرور:** password123

### حساب المدير:
- **البريد:** admin@test.com
- **كلمة المرور:** admin123

## استكشاف الأخطاء

### إذا لم يعمل الخادم:
```bash
cd server
node index-sqlite.js
```

### إذا لم يعمل Frontend:
```bash
npm run build
npm run preview
```

### إذا كانت هناك مشاكل في قاعدة البيانات:
```bash
cd server
node create-database.js
```

## الملفات المهمة

- `src/App.tsx` - التطبيق الرئيسي
- `server/index-sqlite.js` - الخادم
- `server/opticlinic.db` - قاعدة البيانات
- `src/components/` - مكونات React
- `src/pages/` - صفحات التطبيق

## المساعدة

إذا واجهت أي مشاكل، راجع:
1. ملف `README.md` للدليل الكامل
2. ملفات السجلات في console
3. تأكد من تشغيل الخادم قبل Frontend 