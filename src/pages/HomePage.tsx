import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Glasses, ShoppingBag, TrendingUp, Users, Eye, Award } from 'lucide-react';

export default function HomePage() {
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
              <Link to="/login">
                <Button variant="outline">تسجيل الدخول</Button>
              </Link>
              <Link to="/admin/login">
                <Button>لوحة الإدارة</Button>
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
                <Button size="lg" className="px-8 py-3">
                  <Users className="ml-2 h-5 w-5" />
                  دخول العملاء
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  <Award className="ml-2 h-5 w-5" />
                  دخول المدراء
                </Button>
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>إدارة الطلبات</CardTitle>
                <CardDescription>
                  تصفح المنتجات وإدارة الطلبات بسهولة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• تصفح النظارات والعدسات</li>
                  <li>• متابعة حالة الطلبات</li>
                  <li>• تاريخ الطلبات الكامل</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>حساب الأرباح</CardTitle>
                <CardDescription>
                  تتبع أرباحك ومبيعاتك بدقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• حساب الأرباح التلقائي</li>
                  <li>• تقارير مفصلة</li>
                  <li>• طلب المبالغ المستحقة</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Eye className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>واجهة حديثة</CardTitle>
                <CardDescription>
                  تصميم عصري وسهل الاستخدام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• دعم كامل للغة العربية</li>
                  <li>• تصميم متجاوب</li>
                  <li>• تجربة مستخدم ممتازة</li>
                </ul>
              </CardContent>
            </Card>

            {/* Admin Features */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>إدارة العملاء</CardTitle>
                <CardDescription>
                  لوحة تحكم شاملة للمدراء
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• إدارة بيانات العملاء</li>
                  <li>• متابعة النشاط</li>
                  <li>• إدارة الصلاحيات</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>نظام محاسبة</CardTitle>
                <CardDescription>
                  محاسبة دقيقة ومتكاملة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• تتبع المبيعات</li>
                  <li>• إدارة المدفوعات</li>
                  <li>• تقارير مالية شاملة</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Glasses className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>إدارة المنتجات</CardTitle>
                <CardDescription>
                  إدارة شاملة للمخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• إضافة وتعديل المنتجات</li>
                  <li>• إدارة المخزون</li>
                  <li>• تصنيف المنتجات</li>
                </ul>
              </CardContent>
            </Card>
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