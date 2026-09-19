import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  Home,
  Megaphone,
  Compass,
  Users2,
  MessageSquare,
  UserCheck,
  Sparkles,
  Info,
  MapPin,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { DEMO_PERSONAS } from '../data/mockData';

export const SidebarNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    announcements,
    chatThreads,
    switchPersona,
    openModal,
  } = useApp();

  const unreadAnnouncementsCount = announcements.filter(a => !a.read).length;
  const unreadMessagesCount = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const navItems: {
    id: ActiveTab;
    label: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: number;
  }[] = [
    {
      id: 'home',
      label: 'Home',
      description: 'What matters to me right now',
      icon: Home,
    },
    {
      id: 'updates',
      label: 'Updates & Notices',
      description: 'Official announcements by scope',
      icon: Megaphone,
      badge: unreadAnnouncementsCount,
    },
    {
      id: 'explore',
      label: 'Explore Ecosystem',
      description: 'States, centres & faculties directory',
      icon: Compass,
    },
    {
      id: 'communities',
      label: 'Communities & Groups',
      description: 'Academic units & peer study circles',
      icon: Users2,
    },
    {
      id: 'messages',
      label: 'Direct & Group Chat',
      description: 'Peer coordination and inquiries',
      icon: MessageSquare,
      badge: unreadMessagesCount,
    },
    {
      id: 'profile',
      label: 'Student Identity',
      description: 'Academic coordinates & records',
      icon: UserCheck,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4 shrink-0 select-none">
      {/* Student Identity Card */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/20"
          />
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-slate-900 truncate">
              {currentUser.name}
            </h3>
            <p className="text-xs text-emerald-700 font-semibold truncate">
              {currentUser.level}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <GraduationCap size={13} className="text-slate-400 shrink-0" />
            <span className="truncate font-medium text-slate-800">
              {currentUser.programme}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{currentUser.studyCentreName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{currentUser.state} State, Nigeria</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1 flex-1">
        <div className="px-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          University Navigation
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/80 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  size={19}
                  className={`shrink-0 ${
                    isActive ? 'text-emerald-700 stroke-[2.2]' : 'text-slate-500'
                  }`}
                />
                <div className="truncate">
                  <div className="text-sm truncate">{item.label}</div>
                  <div className="text-[11px] text-slate-500 truncate font-normal">
                    {item.description}
                  </div>
                </div>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shrink-0">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Demo Persona Switcher */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={12} className="text-amber-500" />
            Demo Personas
          </span>
          <button
            onClick={() => openModal('onboarding')}
            className="text-[11px] text-emerald-700 font-medium hover:underline cursor-pointer"
          >
            Custom
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {DEMO_PERSONAS.map((persona, idx) => (
            <button
              key={persona.name}
              onClick={() => switchPersona(idx)}
              className={`text-left p-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer truncate ${
                currentUser.name.includes(persona.name.split(' ')[0])
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
              title={`Switch role to ${persona.name} (${persona.state}, ${persona.programme})`}
            >
              <div className="truncate font-medium">{persona.name.split(' ')[0]}</div>
              <div className="text-[10px] text-slate-400 truncate">{persona.state}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Concept Disclaimer Footer */}
      <div className="mt-4 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
        <div className="flex items-start gap-1.5">
          <Info size={14} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Concept Prototype:</span> NOUN Connect validates decentralized student belonging and information architecture. Not an official university release.
          </div>
        </div>
      </div>
    </aside>
  );
};
