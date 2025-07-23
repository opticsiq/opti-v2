import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Glasses, User, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Glasses className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Opti</h1>
              </Link>
              <nav className="flex items-center gap-4">
                <Link to="/orders" className="text-gray-600 hover:text-gray-900">الطلبات</Link>
                <Link to="/earnings" className="text-gray-600 hover:text-gray-900">الأرباح</Link>
                <Link to="/profile" className="text-blue-600 font-medium">الملف الشخصي</Link>
              </nav>
            </div>
            <Button variant="outline">تسجيل الخروج</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
          <p className="text-gray-600">إدارة بيانات حسابك</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">أحمد محمد العلي</p>
                  <p className="text-sm text-gray-600">اسم العميل</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">customer@test.com</p>
                  <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">+966 50 123 4567</p>
                  <p className="text-sm text-gray-600">رقم الهاتف</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">الرياض، المملكة العربية السعودية</p>
                  <p className="text-sm text-gray-600">العنوان</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">تعديل البيانات</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}