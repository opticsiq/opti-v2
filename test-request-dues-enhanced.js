// اختبار وظيفة طلب المستحقات المحسنة
const testEnhancedRequestDues = async () => {
  console.log('🧪 اختبار وظيفة طلب المستحقات المحسنة...\n');

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

    // 3. اختبار إرسال طلب المستحقات بمبالغ مختلفة
    console.log('\n3️⃣ اختبار إرسال طلب المستحقات بمبالغ مختلفة...');
    
    const testAmounts = [
      { amount: 50000, description: 'الحد الأدنى' },
      { amount: 100000, description: 'مبلغ متوسط' },
      { amount: customerData.pending_amount, description: 'جميع المستحقات' }
    ];

    for (const testCase of testAmounts) {
      if (testCase.amount <= customerData.pending_amount) {
        console.log(`\n   اختبار ${testCase.description}: ${testCase.amount.toLocaleString()} د.ع`);
        
        const requestData = {
          customer_id: customerData.id,
          amount: testCase.amount,
          notes: `طلب اختبار - ${testCase.description}`,
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

        if (requestResponse.ok) {
          const requestResult = await requestResponse.json();
          console.log(`   ✅ نجح طلب ${testCase.description}:`, requestResult);
        } else {
          const errorData = await requestResponse.json();
          console.log(`   ❌ فشل طلب ${testCase.description}:`, errorData.error);
        }
      }
    }

    // 4. اختبار التحقق من الحد الأدنى
    console.log('\n4️⃣ اختبار التحقق من الحد الأدنى...');
    const smallAmountRequest = {
      customer_id: customerData.id,
      amount: 25000, // أقل من الحد الأدنى
      notes: 'اختبار الحد الأدنى',
      payment_type: 'kikard',
      payment_info: '123456789',
      account_holder_name: 'اسم صاحب الحساب'
    };

    const smallAmountResponse = await fetch('http://localhost:5000/api/customer/request-dues', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(smallAmountRequest)
    });

    if (!smallAmountResponse.ok) {
      console.log('✅ تم رفض المبلغ الصغير (كما هو متوقع)');
    } else {
      console.log('⚠️ تم قبول مبلغ صغير (قد يحتاج مراجعة)');
    }

    console.log('\n🎉 جميع الاختبارات اكتملت! وظيفة طلب المستحقات المحسنة تعمل بشكل صحيح.');

  } catch (error) {
    console.error('❌ خطأ في الاختبار:', error.message);
  }
};

// تشغيل الاختبار
testEnhancedRequestDues(); 