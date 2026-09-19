/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { BottomNav } from './components/BottomNav';

// Views
import { HomeView } from './views/HomeView';
import { UpdatesView } from './views/UpdatesView';
import { ExploreView } from './views/ExploreView';
import { CommunitiesView } from './views/CommunitiesView';
import { MessagesView } from './views/MessagesView';
import { ProfileView } from './views/ProfileView';

// Modals
import { AnnouncementModal } from './components/AnnouncementModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { StudyCentreModal } from './components/StudyCentreModal';
import { CommunityModal } from './components/CommunityModal';
import { GroupModal } from './components/GroupModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { OnboardingModal } from './components/OnboardingModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'updates':
        return <UpdatesView />;
      case 'explore':
        return <ExploreView />;
      case 'communities':
        return <CommunitiesView />;
      case 'messages':
        return <MessagesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Application Header */}
      <Header />

      {/* Main Structural Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar Navigation */}
        <SidebarNav />

        {/* Dynamic Center Scrollable View Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Modals & Drawers */}
      <AnnouncementModal />
      <StudentProfileModal />
      <StudyCentreModal />
      <CommunityModal />
      <GroupModal />
      <GlobalSearchModal />
      <NotificationsDrawer />
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
