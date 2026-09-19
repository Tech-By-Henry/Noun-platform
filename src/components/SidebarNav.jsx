import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Megaphone, Compass, Users2, MessageSquare, UserCheck, RefreshCw, Info, MapPin, GraduationCap, Building2, } from 'lucide-react';
import { DEMO_PERSONAS } from '../data/mockData';
export const SidebarNav = () => {
    const { activeTab, setActiveTab, currentUser, announcements, chatThreads, switchPersona, openModal, } = useApp();
    const unreadAnnouncementsCount = announcements.filter(a => !a.read).length;
    const unreadMessagesCount = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'updates', label: 'Updates & Notices', icon: Megaphone, badge: unreadAnnouncementsCount },
        { id: 'explore', label: 'Explore', icon: Compass },
        { id: 'communities', label: 'Communities & Groups', icon: Users2 },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
        { id: 'profile', label: 'My Profile', icon: UserCheck },
    ];
    return (<aside className="hidden md:flex sticky top-16 h-[calc(100vh-4rem)] flex-col w-72 lg:w-80 border-r border-[#e3e8ef] bg-white px-4 py-5 lg:px-5 shrink-0 select-none overflow-y-auto no-scrollbar">
      {/* Student identity card */}
      <div className="p-4 rounded-2xl bg-[#f4f6f8] border border-[#e3e8ef] mb-5">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-11 h-11 rounded-full object-cover border border-[#e3e8ef]"/>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-slate-900 truncate">
              {currentUser.name}
            </h3>
            <p className="text-xs text-emerald-800 font-medium truncate mt-0.5">
              {currentUser.level}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#e3e8ef] space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <GraduationCap size={14} className="text-slate-400 shrink-0"/>
            <span className="truncate font-medium text-slate-800">
              {currentUser.programme}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-slate-400 shrink-0"/>
            <span className="truncate">{currentUser.studyCentreName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400 shrink-0"/>
            <span className="truncate">{currentUser.state} State, Nigeria</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        <div className="px-3 pb-2 eyebrow">Menu</div>
        {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between h-11 px-3.5 rounded-xl text-left transition-colors duration-150 cursor-pointer ${isActive
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-600 hover:bg-[#eef2f6] hover:text-slate-900'}`}>
              <div className="flex items-center gap-3 min-w-0">
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}/>
                <span className={`text-sm truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (<span className={`ml-2 min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-emerald-700 text-white'}`}>
                  {item.badge}
                </span>) : null}
            </button>);
        })}
      </nav>

      {/* Demo persona switcher */}
      <div className="mt-5 pt-4 border-t border-[#e3e8ef]">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="eyebrow flex items-center gap-1.5">
            <RefreshCw size={11} className="text-emerald-700"/>
            Demo personas
          </span>
          <button onClick={() => openModal('onboarding')} className="text-[11px] text-emerald-800 font-semibold hover:underline cursor-pointer">
            Custom
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {DEMO_PERSONAS.map((persona, idx) => {
            const isCurrent = currentUser.name.includes(persona.name.split(' ')[0]);
            return (<button key={persona.name} onClick={() => switchPersona(idx)} className={`text-left px-2.5 py-2 rounded-xl border text-xs transition-colors cursor-pointer min-w-0 ${isCurrent
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-white hover:bg-[#f4f6f8] border-[#e3e8ef] text-slate-600'}`} title={`Switch role to ${persona.name} (${persona.state}, ${persona.programme})`}>
              <div className={`truncate ${isCurrent ? 'font-semibold' : 'font-medium'}`}>{persona.name.split(' ')[0]}</div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">{persona.state}</div>
            </button>);
          })}
        </div>
      </div>

      {/* Concept disclaimer */}
      <div className="mt-4 p-3 rounded-xl bg-[#fef9ee] border border-[#f3e3bf] text-[11px] text-amber-900 leading-relaxed">
        <div className="flex items-start gap-2">
          <Info size={13} className="text-amber-700 shrink-0 mt-0.5"/>
          <div>
            <span className="font-semibold">Concept prototype.</span> Not an official university release.
          </div>
        </div>
      </div>
    </aside>);
};
