import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { SearchHome } from './pages/SearchHome';
import { Setup } from './pages/Setup';
import { ContainerDirectory } from './pages/ContainerDirectory';
import { ShipmentDetail } from './pages/ShipmentDetail';
import { EmailDetail } from './pages/EmailDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: SearchHome },
      { path: 'setup', Component: Setup },
      { path: 'containers', Component: ContainerDirectory },
      { path: 'containers/:containerNo', Component: ShipmentDetail },
      { path: 'emails/:id', Component: EmailDetail },
    ]
  }
]);
