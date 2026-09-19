import React from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_PERSONAS } from '../data/mockData';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { MapPin, Bookmark, RefreshCw, Edit3, Building2, Landmark, BookOpen, GraduationCap, Layers, Globe, CheckCircle2, } from 'lucide-react';
export const ProfileView = () => {
    const { currentUser, switchPersona, openModal, announcements, } = useApp();
    const savedAnnouncements = announcements.filter(a => a.bookmarked);
    const placementTiers = [
        { label: 'National', value: 'Nigeria (NOUN)', icon: Globe },
        { label: 'State', value: `${currentUser.state} State`, icon: MapPin },
        { label: 'Study centre', value: currentUser.studyCentreName, icon: Building2 },
        { label: 'Faculty', value: currentUser.faculty, icon: Landmark },
        { label: 'Department', value: currentUser.department, icon: BookOpen },
        { label: 'Programme', value: currentUser.programme, icon: GraduationCap },
        { label: 'Level', value: currentUser.level, icon: Layers },
    ];
    return (<div className="space-y-5 pb-10 max-w-4xl mx-auto text-left animate-fadeIn">
      {/* Page header */}
      <div>
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">
          Your enrolment standing and position within the National Open University system.
        </p>
      </div>

      {/* Identity card */}
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#e3e8ef]"/>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"/>
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 break-words">
                  {currentUser.name}
                </h2>
                <span className="chip chip-brand shrink-0">Enrolled student</span>
              </div>
              <p className="text-[13px] font-medium text-emerald-800 mt-1 break-words">
                {currentUser.programme} · {currentUser.level}
              </p>
              <p className="text-xs text-slate-500 mt-1 break-words">
                Matric: {currentUser.matricNo}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 break-words" title={currentUser.studyCentreName}>
                {currentUser.studyCentreName}
              </p>
            </div>
          </div>

          <button onClick={() => openModal('onboarding')} className="btn btn-secondary self-start sm:self-auto shrink-0">
            <Edit3 size={13}/>
            <span>Edit details</span>
          </button>
        </div>

        {currentUser.bio && (<div className="mt-4 pt-4 border-t border-[#eef2f6] text-[13px] sm:text-sm text-slate-600 leading-relaxed">
            {currentUser.bio}
          </div>)}
      </div>

      {/* Placement */}
      <div className="card p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="eyebrow">Institutional placement</span>
            <h3 className="section-title mt-1">Where you stand in NOUN</h3>
          </div>
          <span className="chip chip-brand shrink-0">
            <CheckCircle2 size={11}/>
            Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {placementTiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (<div key={tier.label} className="p-3 rounded-xl bg-[#f4f6f8] border border-[#e3e8ef] min-w-0">
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <Icon size={12} className="text-emerald-700 shrink-0"/>
                  {idx + 1}. {tier.label}
                </span>
                <span className="font-semibold text-[13px] text-slate-900 mt-1 block break-words" title={tier.value}>
                  {tier.value}
                </span>
              </div>);
        })}
        </div>
      </div>

      {/* Demo persona switcher */}
      <div className="card p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <RefreshCw size={15} className="text-emerald-800"/>
            <h3 className="section-title">Switch demo persona</h3>
          </div>
          <span className="text-xs text-slate-400 shrink-0">Prototype feature</span>
        </div>

        <p className="text-[13px] text-slate-500 leading-relaxed">
          Switching personas reconfigures feeds, notifications, the study-centre hub, and community
          memberships to show how NOUN Connect adapts to different students across Nigeria.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {DEMO_PERSONAS.map((p, idx) => {
            const isCurrent = currentUser.name.startsWith(p.name.split(' (')[0]);
            return (<button key={p.name} onClick={() => switchPersona(idx)} className={`p-3.5 rounded-xl border text-left transition-colors duration-150 cursor-pointer flex items-center gap-3 min-w-0 ${isCurrent
                    ? 'border-emerald-300 bg-emerald-50/60'
                    : 'border-[#e3e8ef] hover:border-[#c6d0dc] bg-white hover:bg-[#f8fafc]'}`}>
                <img src={p.avatar} alt={p.name} className="w-11 h-11 rounded-xl object-cover border border-[#e3e8ef] shrink-0"/>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[13px] font-semibold text-slate-900 truncate">
                      {p.name}
                    </h4>
                    {isCurrent && (<span className="chip chip-brand shrink-0">Active</span>)}
                  </div>
                  <p className="text-xs text-emerald-800 font-medium truncate mt-0.5">
                    {p.programme} · {p.level}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {p.studyCentreName} ({p.state})
                  </p>
                </div>
              </button>);
        })}
        </div>
      </div>

      {/* Bookmarked notices */}
      <div className="card p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Bookmark size={15} className="text-emerald-800"/>
          <h3 className="section-title">Bookmarked notices ({savedAnnouncements.length})</h3>
        </div>

        {savedAnnouncements.length === 0 ? (<div className="text-center py-8">
            <div className="w-11 h-11 rounded-full bg-[#eef2f6] flex items-center justify-center mx-auto mb-2.5">
              <Bookmark size={17} className="text-slate-400"/>
            </div>
            <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
              You haven’t bookmarked any notices yet. Tap the bookmark icon on any announcement to
              save it here for quick reference.
            </p>
          </div>) : (<div className="space-y-3">
            {savedAnnouncements.map(a => (<AnnouncementCard key={a.id} announcement={a} compact/>))}
          </div>)}
      </div>
    </div>);
};
