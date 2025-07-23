import { Link } from 'react-router-dom';
import { Glasses, ShoppingBag, TrendingUp, Users, Eye, Award } from 'lucide-react';

export default function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Glasses className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Opti</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/test">
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">اختبار الاتصال</button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">تسجيل الدخول</button>
              </Link>
              <Link to="/admin/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">لوحة الإدارة</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              منصة <span className="text-blue-600">Opti</span> للنظارات الطبية
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              منصة متكاملة لإدارة بيع النظارات الطبية والعدسات اللاصقة
              مع واجهة حديثة وسهلة الاستخدام
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Users className="ml-2 h-5 w-5" />
                  دخول العملاء
                </button>
              </Link>
              <Link to="/admin/login">
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2">
                  <Award className="ml-2 h-5 w-5" />
                  دخول المدراء
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              المميزات الرئيسية
            </h2>
            <p className="text-lg text-gray-600">
              كل ما تحتاجه لإدارة أعمال النظارات الطبية بكفاءة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customer Features */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <ShoppingBag className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">إدارة الطلبات</h3>
              <p className="text-gray-600 mb-4">تصفح المنتجات وإدارة الطلبات بسهولة</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• تصفح النظارات والعدسات</li>
                <li>• متابعة حالة الطلبات</li>
                <li>• تاريخ الطلبات الكامل</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">حساب الأرباح</h3>
              <p className="text-gray-600 mb-4">تتبع أرباحك ومبيعاتك بدقة</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• حساب الأرباح التلقائي</li>
                <li>• تقارير مفصلة</li>
                <li>• طلب المبالغ المستحقة</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <Eye className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">واجهة حديثة</h3>
              <p className="text-gray-600 mb-4">تصميم عصري وسهل الاستخدام</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• دعم كامل للغة العربية</li>
                <li>• تصميم متجاوب</li>
                <li>• تجربة مستخدم ممتازة</li>
              </ul>
            </div>

            {/* Admin Features */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">إدارة العملاء</h3>
              <p className="text-gray-600 mb-4">لوحة تحكم شاملة للمدراء</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• إدارة بيانات العملاء</li>
                <li>• متابعة النشاط</li>
                <li>• إدارة الصلاحيات</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <Award className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">نظام محاسبة</h3>
              <p className="text-gray-600 mb-4">محاسبة دقيقة ومتكاملة</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• تتبع المبيعات</li>
                <li>• إدارة المدفوعات</li>
                <li>• تقارير مالية شاملة</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <Glasses className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">إدارة المنتجات</h3>
              <p className="text-gray-600 mb-4">إدارة شاملة للمخزون</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• إضافة وتعديل المنتجات</li>
                <li>• إدارة المخزون</li>
                <li>• تصنيف المنتجات</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">حالة النظام</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium">الواجهة الأمامية</p>
              <p className="text-sm text-gray-600">متصل</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium">الخادم الخلفي</p>
              <p className="text-sm text-gray-600">متصل</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium">قاعدة البيانات</p>
              <p className="text-sm text-gray-600">جاهز</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Glasses className="h-6 w-6" />
              <span className="text-lg font-bold">Opti</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 Opti. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}