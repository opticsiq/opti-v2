import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Glasses, Plus } from 'lucide-react';

export default function NewOrderPage() {
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
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">الملف الشخصي</Link>
              </nav>
            </div>
            <Button variant="outline">تسجيل الخروج</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">طلب جديد</h1>
          <p className="text-gray-600">إضافة طلب جديد للنظارات أو العدسات</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                إنشاء طلب جديد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Glasses className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">قريباً</h3>
                <p className="text-gray-600">نعمل على تطوير نموذج الطلب الجديد</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}