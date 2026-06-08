import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { GmailConnection } from './pages/GmailConnection';
import { EmailSync } from './pages/EmailSync';
import { ShipmentList } from './pages/ShipmentList';
import { ShipmentDetail } from './pages/ShipmentDetail';
import { EmailDetail } from './pages/EmailDetail';
import { ReviewQueue } from './pages/ReviewQueue';
import { AdvancedSearch } from './pages/AdvancedSearch';
import { AIChat } from './pages/AIChat';
import { SyncSettings } from './pages/SyncSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: GmailConnection },
      { path: 'sync', Component: EmailSync },
      { path: 'shipments', Component: ShipmentList },
      { path: 'shipments/:id', Component: ShipmentDetail },
      { path: 'emails/:id', Component: EmailDetail },
      { path: 'review', Component: ReviewQueue },
      { path: 'search', Component: AdvancedSearch },
      { path: 'ai', Component: AIChat },
      { path: 'settings', Component: SyncSettings }
    ]
  }
]);
