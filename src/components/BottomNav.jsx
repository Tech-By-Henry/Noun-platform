import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Megaphone, Compass, Users2, MessageSquare, UserCheck, } from 'lucide-react';
export const BottomNav = () => {
    const { activeTab, setActiveTab, announcements, chatThreads } = useApp();
    const unreadAnnouncementsCount = announcements.filter(a => !a.read).length;
    const unreadMessagesCount = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'updates', label: 'Updates', icon: Megaphone, badge: unreadAnnouncementsCount },
        { id: 'explore', label: 'Explore', icon: Compass },
        { id: 'communities', label: 'Community', icon: Users2 },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
        { id: 'profile', label: 'Profile', icon: UserCheck },
    ];
    return (<nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e3e8ef] pb-[max(env(safe-area-inset-bottom),6px)] pt-1.5">
      <div className="grid grid-cols-6 items-center px-1">
        {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 transition-colors duration-150 cursor-pointer ${isActive
                    ? 'text-emerald-800'
                    : 'text-slate-400 hover:text-slate-700'}`}>
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}/>
                {item.badge && item.badge > 0 ? (<span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-700 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>) : null}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>);
        })}
      </div>
    </nav>);
};
