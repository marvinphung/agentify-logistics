import { Link, useLocation } from 'react-router';
import { Database, List, Search } from 'lucide-react';

function navClass(isActive: boolean): string {
  return isActive
    ? 'bg-slate-900 text-white'
    : 'text-slate-600 hover:bg-white hover:text-slate-900';
}

export function TopNav() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f7f7f1]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Agentify</p>
            <p className="text-xs text-slate-500">Tra cứu container cho CS/Ops</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-1">
          <Link
            to="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${navClass(
              location.pathname === '/',
            )}`}
          >
            Tra cứu
          </Link>
          <Link
            to="/setup"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${navClass(
              location.pathname.startsWith('/setup'),
            )}`}
          >
            <Database className="h-4 w-4" />
            Thiết lập dữ liệu
          </Link>
          <Link
            to="/containers"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${navClass(
              location.pathname === '/containers',
            )}`}
          >
            <List className="h-4 w-4" />
            Tất cả container
          </Link>
        </nav>
      </div>
    </header>
  );
}
