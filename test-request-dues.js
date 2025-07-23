// اختبار وظيفة طلب المستحقات
const testRequestDues = async () => {
  console.log('🧪 اختبار وظيفة طلب المستحقات...\n');

  try {
    // 1. اختبار تسجيل الدخول
    console.log('1️⃣ اختبار تسجيل الدخول...');
    const loginResponse = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'customer@test.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error('فشل في تسجيل الدخول');
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ تم تسجيل الدخول بنجاح');

    // 2. اختبار جلب معلومات العميل
    console.log('\n2️⃣ اختبار جلب معلومات العميل...');
    const customerResponse = await fetch('http://localhost:5000/api/customer/accounting', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!customerResponse.ok) {
      throw new Error('فشل في جلب معلومات العميل');
    }

    const customerData = await customerResponse.json();
    console.log('✅ تم جلب معلومات العميل:', {
      id: customerData.id,
      name: customerData.name,
      pending_amount: customerData.pending_amount
    });

    // 3. اختبار إرسال طلب المستحقات
    console.log('\n3️⃣ اختبار إرسال طلب المستحقات...');
    const requestData = {
      customer_id: customerData.id,
      amount: 50000, // 50,000 دينار
      notes: 'طلب اختبار للمستحقات',
      payment_type: 'kikard',
      payment_info: '123456789',
      account_holder_name: 'اسم صاحب الحساب'
    };

    const requestResponse = await fetch('http://localhost:5000/api/customer/request-dues', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!requestResponse.ok) {
      const errorData = await requestResponse.json();
      throw new Error(`فشل في إرسال الطلب: ${errorData.error || 'خطأ غير معروف'}`);
    }

    const requestResult = await requestResponse.json();
    console.log('✅ تم إرسال طلب المستحقات بنجاح:', requestResult);

    console.log('\n🎉 جميع الاختبارات نجحت! وظيفة طلب المستحقات تعمل بشكل صحيح.');

  } catch (error) {
    console.error('❌ خطأ في الاختبار:', error.message);
  }
};

// تشغيل الاختبار
testRequestDues(); 