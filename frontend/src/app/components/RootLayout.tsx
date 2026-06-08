import { Outlet } from 'react-router';
import { TopNav } from './layout/TopNav';

export function RootLayout() {
  return (
    <div className="min-h-[100dvh] bg-[#f7f7f1] text-slate-900">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
