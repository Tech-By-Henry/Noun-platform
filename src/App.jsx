/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from 'react';
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
const AppContent = () => {
    const { activeTab, modal, activeChatId } = useApp();
    const mobileChatOpen = activeTab === 'messages' && Boolean(activeChatId);
    const mobileMessages = activeTab === 'messages';
    // Lock page scroll while any modal/drawer is open
    useEffect(() => {
        const open = Boolean(modal?.type);
        document.body.classList.toggle('modal-open', open);
        return () => document.body.classList.remove('modal-open');
    }, [modal?.type]);
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
    return (<div className="min-h-screen bg-[#f4f6f8] text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Application Header — hidden on mobile while Messages is open (full-screen chat) */}
      <div className={mobileMessages ? 'hidden md:block' : undefined}>
        <Header />
      </div>

      {/* Main Structural Layout */}
      <div className="flex w-full max-w-[90rem] mx-auto">
        {/* Desktop Sidebar Navigation */}
        <SidebarNav />

        {/* Dynamic Center Scrollable View Area */}
        <main className={`flex-1 min-w-0 ${mobileMessages
            ? 'p-0 md:px-6 md:py-6 lg:px-10 lg:py-8 md:pb-10'
            : 'px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8 pb-24 md:pb-10'}`}>
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation — hidden while inside a conversation */}
      {!mobileChatOpen && <BottomNav />}

      {/* Modals & Drawers */}
      <AnnouncementModal />
      <StudentProfileModal />
      <StudyCentreModal />
      <CommunityModal />
      <GroupModal />
      <GlobalSearchModal />
      <NotificationsDrawer />
      <OnboardingModal />
    </div>);
};
export default function App() {
    return (<AppProvider>
      <AppContent />
    </AppProvider>);
}
