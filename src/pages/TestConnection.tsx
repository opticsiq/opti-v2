import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Glasses, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { healthAPI, authAPI } from '@/lib/api';

export default function TestConnection() {
  const [tests, setTests] = useState({
    health: { status: 'idle', message: '', data: null },
    login: { status: 'idle', message: '', data: null },
  });
  const [loading, setLoading] = useState(false);

  const runHealthTest = async () => {
    setTests(prev => ({ ...prev, health: { status: 'loading', message: 'جاري الاختبار...', data: null } }));
    
    try {
      const result = await healthAPI.check();
      setTests(prev => ({ 
        ...prev, 
        health: { 
          status: 'success', 
          message: 'الخادم يعمل بشكل صحيح', 
          data: result 
        } 
      }));
    } catch (error: any) {
      setTests(prev => ({ 
        ...prev, 
        health: { 
          status: 'error', 
          message: `خطأ في الاتصال: ${error.message}`, 
          data: error.response?.data || null 
        } 
      }));
    }
  };

  const runLoginTest = async () => {
    setTests(prev => ({ ...prev, login: { status: 'loading', message: 'جاري اختبار تسجيل الدخول...', data: null } }));
    
    try {
      const result = await authAPI.login('customer@test.com', 'password123');
      setTests(prev => ({ 
        ...prev, 
        login: { 
          status: 'success', 
          message: 'تسجيل الدخول نجح', 
          data: result 
        } 
      }));
    } catch (error: any) {
      setTests(prev => ({ 
        ...prev, 
        login: { 
          status: 'error', 
          message: `خطأ في تسجيل الدخول: ${error.message}`, 
          data: error.response?.data || null 
        } 
      }));
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    await runHealthTest();
    await runLoginTest();
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'loading':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Glasses className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Opti - اختبار الاتصال</h1>
          </div>
          <p className="text-gray-600">اختبار الاتصال مع خادم التطبيق</p>
        </div>

        <div className="mb-6 text-center">
          <Button onClick={runAllTests} disabled={loading} size="lg">
            <RefreshCw className={`h-4 w-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'جاري تشغيل الاختبارات...' : 'تشغيل جميع الاختبارات'}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Health Check Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(tests.health.status)}
                اختبار حالة الخادم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الحالة:</span>
                <Badge className={getStatusColor(tests.health.status)}>
                  {tests.health.status === 'idle' ? 'لم يتم الاختبار' : 
                   tests.health.status === 'loading' ? 'جاري الاختبار' :
                   tests.health.status === 'success' ? 'نجح' : 'فشل'}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">الرسالة:</p>
                <p className="text-sm bg-gray-50 p-2 rounded">{tests.health.message || 'لا توجد رسالة'}</p>
              </div>

              {tests.health.data && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">البيانات:</p>
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
                    {JSON.stringify(tests.health.data, null, 2)}
                  </pre>
                </div>
              )}

              <Button onClick={runHealthTest} disabled={tests.health.status === 'loading'} size="sm" className="w-full">
                اختبار الخادم
              </Button>
            </CardContent>
          </Card>

          {/* Login Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(tests.login.status)}
                اختبار تسجيل الدخول
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الحالة:</span>
                <Badge className={getStatusColor(tests.login.status)}>
                  {tests.login.status === 'idle' ? 'لم يتم الاختبار' : 
                   tests.login.status === 'loading' ? 'جاري الاختبار' :
                   tests.login.status === 'success' ? 'نجح' : 'فشل'}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">الرسالة:</p>
                <p className="text-sm bg-gray-50 p-2 rounded">{tests.login.message || 'لا توجد رسالة'}</p>
              </div>

              {tests.login.data && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">البيانات:</p>
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(tests.login.data, null, 2)}
                  </pre>
                </div>
              )}

              <Button onClick={runLoginTest} disabled={tests.login.status === 'loading'} size="sm" className="w-full">
                اختبار تسجيل الدخول
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Connection Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>معلومات الاتصال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Frontend URL:</strong> http://localhost:8080</p>
                <p><strong>Backend URL:</strong> http://localhost:5000</p>
                <p><strong>API Base:</strong> /api</p>
              </div>
              <div>
                <p><strong>حساب العميل:</strong> customer@test.com</p>
                <p><strong>كلمة المرور:</strong> password123</p>
                <p><strong>حساب المدير:</strong> admin@test.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-600 hover:underline">العودة للصفحة الرئيسية</a>
        </div>
      </div>
    </div>
  );
}