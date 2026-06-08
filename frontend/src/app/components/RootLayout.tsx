import { Outlet, Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  RefreshCw,
  Package,
  Mail,
  ListChecks,
  Search,
  MessageSquare,
  Settings,
  Mail as MailIcon
} from 'lucide-react';

const navigation = [
  { name: 'Tổng quan', href: '/', icon: LayoutDashboard },
  { name: 'Sync Email', href: '/sync', icon: RefreshCw },
  { name: 'Lô hàng', href: '/shipments', icon: Package },
  { name: 'Email đã xử lý', href: '/emails/1', icon: Mail },
  { name: 'Review Queue', href: '/review', icon: ListChecks },
  { name: 'Tìm kiếm', href: '/search', icon: Search },
  { name: 'Hỏi AI', href: '/ai', icon: MessageSquare },
  { name: 'Cài đặt', href: '/settings', icon: Settings }
];

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <MailIcon className="w-8 h-8 text-sidebar-primary-foreground" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">Agentify</h1>
          </div>
          <p className="text-xs text-sidebar-foreground/70 mt-1">Shipment Data Hub</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60">
            <p>v1.0.0 Prototype</p>
            <p className="mt-1">© 2026 Agentify</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
