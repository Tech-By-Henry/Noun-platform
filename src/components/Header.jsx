import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bell, RefreshCw, MapPin, ChevronRight } from 'lucide-react';
export const Header = () => {
    const { currentUser, unreadNotifCount, openModal, setActiveTab } = useApp();
    return (<header className="sticky top-0 z-30 bg-white border-b border-[#e3e8ef]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button onClick={() => setActiveTab('home')} className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-bold text-sm">
                NC
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px] sm:text-base text-slate-900 tracking-tight leading-none">
                    NOUN <span className="text-emerald-700">Connect</span>
                  </span>
                  <span className="chip chip-amber hidden sm:inline-flex">Prototype</span>
                </div>
                <span className="text-[11px] text-slate-500 hidden sm:block mt-1 leading-none">
                  Student Information & Community Platform
                </span>
              </div>
            </button>
          </div>

          {/* Academic coordinates (desktop) */}
          <button onClick={() => setActiveTab('profile')} className="hidden lg:flex items-center gap-2 h-9 px-4 rounded-full bg-[#eef2f6] hover:bg-[#e3e8ef] text-[13px] text-slate-600 transition-colors max-w-md cursor-pointer" title="Your current academic position. Click to inspect.">
            <MapPin size={14} className="text-emerald-700 shrink-0"/>
            <span className="font-medium text-slate-900 truncate">{currentUser.programme}</span>
            <span className="text-slate-300">·</span>
            <span className="shrink-0">{currentUser.level}</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-800 font-medium truncate shrink-0">
              {currentUser.studyCentreName.replace('Lagos Study Centre — ', '')}
            </span>
            <ChevronRight size={14} className="text-slate-400 shrink-0"/>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => openModal('search')} className="h-9 w-9 sm:w-auto sm:px-4 rounded-full text-slate-500 hover:text-slate-900 hover:bg-[#eef2f6] sm:bg-[#f4f6f8] sm:border sm:border-[#e3e8ef] flex items-center justify-center gap-2 transition-colors cursor-pointer" title="Search students, announcements, centres, communities" aria-label="Global Search">
              <Search size={17}/>
              <span className="hidden lg:inline text-[13px] text-slate-400">Search…</span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-[#e3e8ef]">
                ⌘K
              </kbd>
            </button>

            <button onClick={() => openModal('notifications')} className="relative h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-[#eef2f6] transition-colors cursor-pointer" title="Notifications" aria-label="Notifications">
              <Bell size={18}/>
              {unreadNotifCount > 0 && (<span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotifCount}
                </span>)}
            </button>

            <button onClick={() => openModal('onboarding')} className="btn btn-sm btn-tonal hidden sm:inline-flex" title="Change coordinates or role-play another student">
              <RefreshCw size={13}/>
              <span>Switch student</span>
            </button>

            <button onClick={() => setActiveTab('profile')} className="flex items-center p-0.5 rounded-full ring-2 ring-transparent hover:ring-emerald-600 transition-all cursor-pointer ml-0.5" title="Open profile">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border border-[#e3e8ef]"/>
            </button>
          </div>
        </div>

        {/* Mobile coordinates bar */}
        <div className="lg:hidden pb-2.5 pt-1.5 flex items-center justify-between gap-2 text-xs text-slate-600 border-t border-[#eef2f6]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
            <span className="font-medium text-slate-900 truncate">{currentUser.programme}</span>
            <span className="text-slate-300 shrink-0">·</span>
            <span className="shrink-0">{currentUser.level}</span>
            <span className="text-slate-300 shrink-0 hidden xs:inline">·</span>
            <span className="text-emerald-800 font-medium truncate hidden xs:inline">
              {currentUser.studyCentreName.replace('Lagos Study Centre — ', '')}
            </span>
          </div>
          <button onClick={() => openModal('onboarding')} className="shrink-0 text-emerald-800 font-semibold pl-2 hover:underline cursor-pointer">
            Change
          </button>
        </div>
      </div>
    </header>);
};
