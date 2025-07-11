// components/DashboardBI.tsx
'use client';

import { useReportData } from '../lib/useReportData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Box, DollarSign, Warehouse } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DashboardBI() {
  const { data, isLoading, error } = useReportData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-1/4 mb-6" />
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Business Intelligence Dashboard</h1>

      <Tabs defaultValue={data.reports[0].id} className="space-y-4">
        <TabsList className='text-gray-700'>
          {data.reports.map((report) => (
            <TabsTrigger key={report.id} value={report.id} className='text-gray-700'>
              {report.id === 'sales' ? (
                <DollarSign className="h-4 w-4 mr-2" />
              ) : (
                <Warehouse className="h-4 w-4 mr-2" />
              )}
             {report.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {data.reports.map((report) => (
         <TabsContent key={report.id} value={report.id} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Total {report.id === 'sales' ? 'Sales' : 'Inventory'}
                  </CardTitle>
                  {report.id === 'sales' ? (
                    <DollarSign className="h-4 w-4 text-muted-foreground text-gray-700" />
                  ) : (
                    <Box className="h-4 w-4 text-muted-foreground text-gray-700" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-700">
                    {report.id === 'sales' 
                      ? formatCurrency(report.cards.total) 
                      : formatNumber(report.cards.total)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Daily Average
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-700">
                    {report.id === 'sales' 
                      ? formatCurrency(report.cards.average) 
                      : formatNumber(report.cards.average)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className='text-gray-700'>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={report.line}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => report.id === 'sales' 
                          ? [formatCurrency(Number(value)), 'Value'] 
                          : [value, 'Value']}
                        labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='text-gray-700'>
                    {report.id === 'sales' ? 'Regional Sales' : 'Warehouse Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={report.bar}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => report.id === 'sales' 
                          ? [formatCurrency(Number(value)), 'Value'] 
                          : [value, 'Value']}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#8884d8" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}