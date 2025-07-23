import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Glasses, ShoppingBag, Plus, Eye, Calendar, Package, Loader2 } from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Order {
  id: number;
  created_at: string;
  product_name: string;
  product_type: string;
  status: string;
  total_price: number;
  profit: number;
  customer_name: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const data = await ordersAPI.getOrders();
        setOrders(data);
      } catch (error: any) {
        console.error('Error loading orders:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          toast.error('حدث خطأ في تحميل الطلبات');
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'processing':
        return 'قيد التجهيز';
      case 'pending':
        return 'في الانتظار';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
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
              <Button variant="outline" onClick={handleLogout}>تسجيل الخروج</Button>
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
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">إجمالي الطلبات</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {orders.length > 0 ? Math.round((orders.filter(order => order.status === 'completed').length / orders.length) * 100) : 0}% معدل الإنجاز
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد المعالجة</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.status === 'processing' || order.status === 'pending').length}
              </div>
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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin ml-2" />
                <span>جاري تحميل الطلبات...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد طلبات حالياً</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Glasses className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{order.product_name}</h3>
                      <p className="text-sm text-gray-600">العميل: {order.customer_name}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-medium">{order.total_price} ر.س</p>
                      <p className="text-sm text-green-600">ربح: {order.profit} ر.س</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
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