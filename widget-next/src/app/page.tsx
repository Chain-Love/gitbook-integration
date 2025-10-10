'use client';

import Dashboard from '@/components/dashboard';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardFooter from '@/components/dashboard/dashboard-footer';

export default function Page() {
  return (
    <div className='rounded-2xl border border-gray-6 px-4 py-6'>
      <DashboardHeader />
      <div className='relative min-h-[60vh]'>
        <Dashboard />
      </div>
      <DashboardFooter />
    </div>
  );
}
