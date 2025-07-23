import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Glasses, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function EarningsPage() {
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
                <Link to="/earnings" className="text-blue-600 font-medium">الأرباح</Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">الملف الشخصي</Link>
              </nav>
            </div>
            <Button variant="outline">تسجيل الخروج</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الأرباح والمبيعات</h1>
          <p className="text-gray-600">تتبع أرباحك ومبيعاتك</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250 ر.س</div>
              <p className="text-xs text-muted-foreground">+15% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,500 ر.س</div>
              <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">هذا الشهر</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">320 ر.س</div>
              <p className="text-xs text-muted-foreground">من 8 طلبات</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}