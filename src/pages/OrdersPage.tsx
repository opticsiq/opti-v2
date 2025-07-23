import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Glasses, ShoppingBag, Plus, Eye, Calendar, Package } from 'lucide-react';

const mockOrders = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'نظارة طبية',
    status: 'مكتمل',
    price: 250,
    profit: 50,
    customer: 'أحمد محمد'
  },
  {
    id: 2,
    date: '2024-01-12',
    type: 'عدسات لاصقة',
    status: 'قيد التجهيز',
    price: 120,
    profit: 30,
    customer: 'فاطمة علي'
  },
  {
    id: 3,
    date: '2024-01-10',
    type: 'نظارة شمسية',
    status: 'مكتمل',
    price: 180,
    profit: 40,
    customer: 'محمد خالد'
  }
];

export default function OrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'قيد التجهيز':
        return 'bg-yellow-100 text-yellow-800';
      case 'ملغي':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Glasses className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Opti</h1>
              </Link>
              <nav className="flex items-center gap-4">
                <Link to="/orders" className="text-blue-600 font-medium">الطلبات</Link>
                <Link to="/earnings" className="text-gray-600 hover:text-gray-900">الأرباح</Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">الملف الشخصي</Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/new-order">
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  طلب جديد
                </Button>
              </Link>
              <Button variant="outline">تسجيل الخروج</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الطلبات</h1>
          <p className="text-gray-600">تصفح وإدارة جميع طلباتك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">66.7% معدل الإنجاز</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد التجهيز</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">يحتاج متابعة</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>الطلبات الأخيرة</CardTitle>
            <CardDescription>قائمة بآخر الطلبات المسجلة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Glasses className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{order.type}</h3>
                      <p className="text-sm text-gray-600">العميل: {order.customer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-medium">{order.price} ر.س</p>
                      <p className="text-sm text-green-600">ربح: {order.profit} ر.س</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline">عرض المزيد</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}