import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bell, Sparkles, MapPin, ChevronRight, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, unreadNotifCount, openModal, setActiveTab } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Brand & Concept tag */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                NC
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                    NOUN <span className="text-emerald-700 font-semibold">Connect</span>
                  </span>
                  <span className="hidden xs:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Prototype
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  Student Information & Community Platform
                </span>
              </div>
            </button>
          </div>

          {/* Academic Coordinates Pill (Crucial identity indicator: Where do I belong?) */}
          <button
            onClick={() => setActiveTab('profile')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-xs text-slate-700 transition-colors max-w-md truncate cursor-pointer"
            title="Your current academic position. Click to inspect."
          >
            <MapPin size={13} className="text-emerald-700 shrink-0" />
            <span className="font-medium text-slate-900 truncate">{currentUser.programme}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium shrink-0">{currentUser.level}</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-800 font-semibold truncate shrink-0">
              {currentUser.studyCentreName.replace('Lagos Study Centre — ', '')}
            </span>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
          </button>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => openModal('search')}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2 border border-transparent sm:border-slate-200 transition-colors cursor-pointer"
              title="Search students, announcements, centres, communities"
              aria-label="Global Search"
            >
              <Search size={18} className="text-slate-500" />
              <span className="hidden lg:inline text-xs text-slate-500 font-normal">Search ecosystem...</span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Trigger with unread counter */}
            <button
              onClick={() => openModal('notifications')}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Role Switcher / Onboarding prompt */}
            <button
              onClick={() => openModal('onboarding')}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Change coordinates or role-play another student"
            >
              <Sparkles size={13} className="text-emerald-700" />
              <span>Switch Student</span>
            </button>

            {/* User Avatar */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center p-0.5 rounded-full ring-2 ring-transparent hover:ring-emerald-500 transition-all cursor-pointer ml-1"
              title="Open profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </button>
          </div>
        </div>

        {/* Mobile Academic Coordinates Sub-bar */}
        <div className="md:hidden pb-2.5 pt-0.5 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">{currentUser.programme}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 shrink-0">{currentUser.level}</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-800 font-medium truncate">
              {currentUser.studyCentreName.replace('Lagos Study Centre — ', '')}
            </span>
          </div>
          <button
            onClick={() => openModal('onboarding')}
            className="shrink-0 text-emerald-700 font-semibold pl-2 hover:underline"
          >
            Change
          </button>
        </div>
      </div>
    </header>
  );
};
