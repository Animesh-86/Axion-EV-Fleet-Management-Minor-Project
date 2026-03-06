import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { FleetPage } from './pages/FleetPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { OTACampaignsPage } from './pages/OTACampaignsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: 'fleet',
        Component: FleetPage,
      },
      {
        path: 'digital-twin/:vehicleId?',
        Component: DigitalTwinPage,
      },
      {
        path: 'ota-campaigns',
        Component: OTACampaignsPage,
      },
      {
        path: 'analytics',
        Component: AnalyticsPage,
      },
      {
        path: 'simulator',
        Component: SimulatorPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);