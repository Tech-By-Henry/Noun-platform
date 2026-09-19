import React from 'react';
import { useApp } from '../context/AppContext';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { EventCard } from '../components/EventCard';
import { StudentCard } from '../components/StudentCard';
import { Calendar, Users, ArrowRight, ShieldCheck, ChevronRight, Building2, GraduationCap, MapPin, RefreshCw, } from 'lucide-react';
export const HomeView = () => {
    const { currentUser, announcements, events, communities, students, openModal, setActiveTab, } = useApp();
    const isRelevant = (item) => item.scope === 'NATIONAL' ||
        (item.scope === 'STATE' && item.scopeTarget.includes(currentUser.state)) ||
        (item.scope === 'STUDY_CENTRE' && item.scopeTarget.includes(currentUser.studyCentreName)) ||
        (item.scope === 'FACULTY' && item.scopeTarget.includes(currentUser.faculty)) ||
        (item.scope === 'DEPARTMENT' && item.scopeTarget.includes(currentUser.department)) ||
        (item.scope === 'PROGRAMME' && item.scopeTarget.includes(currentUser.programme)) ||
        (item.scope === 'LEVEL' && item.scopeTarget.includes(currentUser.level));
    const importantNotices = announcements.filter(isRelevant).sort((a, b) => Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned))).slice(0, 3);
    const upcomingEvents = events.filter(isRelevant).slice(0, 3);
    // Communities user belongs to
    const myCommunities = communities.filter(c => c.joined);
    // People you may know (share study centre OR department OR level)
    const peopleYouMayKnow = students
        .filter(s => s.id !== currentUser.id)
        .filter(s => s.studyCentreId === currentUser.studyCentreId ||
        s.department === currentUser.department ||
        s.level === currentUser.level)
        .slice(0, 4);
    const SectionHeader = ({ icon: Icon, title, action, actionLabel, meta }) => (<div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon size={16} className="text-emerald-800 shrink-0"/>}
          <h2 className="section-title truncate">{title}</h2>
        </div>
        {action ? (<button onClick={action} className="text-[13px] font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer shrink-0">
            <span>{actionLabel}</span>
            <ArrowRight size={13}/>
          </button>) : meta ? (<span className="text-xs text-slate-400 shrink-0">{meta}</span>) : null}
      </div>);
    return (<div className="space-y-7 pb-10 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* 1. Welcome + academic coordinates */}
      <section className="bg-[#123f33] rounded-2xl p-5 sm:p-7 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-emerald-300/90 mb-1">
              Your university workspace
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Good day, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-[13px] text-emerald-100/80 mt-1">
              Here is what matters in your university ecosystem right now.
            </p>
          </div>

          <button onClick={() => openModal('onboarding')} className="btn btn-sm bg-white/10 hover:bg-white/20 text-white border border-white/15 shrink-0" title="Update your student profile or switch demo role">
            <RefreshCw size={13}/>
            <span>Switch student</span>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
              <GraduationCap size={15}/>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-emerald-300/70 block">Programme & level</span>
              <span className="font-semibold text-white truncate block mt-0.5">
                {currentUser.programme} · {currentUser.level}
              </span>
            </div>
          </div>

          <button onClick={() => openModal('centre', currentUser.studyCentreId)} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
              <Building2 size={15}/>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] text-emerald-300/70 block">Study centre</span>
              <span className="font-semibold text-white truncate block mt-0.5 group-hover:text-emerald-200">
                {currentUser.studyCentreName.replace('Lagos Study Centre — ', '')}
              </span>
            </div>
            <ChevronRight size={14} className="text-emerald-300/40 group-hover:text-white shrink-0"/>
          </button>

          <button onClick={() => setActiveTab('explore')} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
              <MapPin size={15}/>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] text-emerald-300/70 block">State</span>
              <span className="font-semibold text-white truncate block mt-0.5 group-hover:text-emerald-200">
                {currentUser.state} State, Nigeria
              </span>
            </div>
            <ChevronRight size={14} className="text-emerald-300/40 group-hover:text-white shrink-0"/>
          </button>
        </div>
      </section>

      {/* 2. Important for you */}
      <section className="space-y-3">
        <SectionHeader icon={ShieldCheck} title="Important for you" action={() => setActiveTab('updates')} actionLabel="All updates"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {importantNotices.map(notice => (<AnnouncementCard key={notice.id} announcement={notice} compact/>))}
        </div>
      </section>

      {/* 3. Upcoming events */}
      <section className="space-y-3">
        <SectionHeader icon={Calendar} title="Upcoming schedule" meta="Next 14 days"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {upcomingEvents.map(event => (<EventCard key={event.id} event={event} compact/>))}
        </div>
      </section>

      {/* 4. Your communities */}
      <section className="space-y-3">
        <SectionHeader icon={Users} title="Your communities" action={() => setActiveTab('communities')} actionLabel="Explore all"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {myCommunities.map(comm => (<button key={comm.id} onClick={() => openModal('community', comm.id)} className="card card-hover p-3 text-left flex flex-col justify-between group cursor-pointer min-w-0">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wide block truncate">
                  {comm.category}
                </span>
                <h4 className="font-semibold text-xs text-slate-900 group-hover:text-emerald-900 line-clamp-2 mt-1 leading-snug">
                  {comm.name}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-[#eef2f6] flex items-center justify-between text-[11px] text-slate-500">
                <span>{comm.memberCount > 999 ? `${(comm.memberCount / 1000).toFixed(0)}k` : comm.memberCount} members</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-emerald-700"/>
              </div>
            </button>))}
        </div>
      </section>

      {/* 5. People you may know */}
      <section className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <SectionHeader icon={Users} title="Coursemates around you"/>
            <p className="text-[13px] text-slate-500 mt-1">
              Students sharing your study centre, department, or academic level.
            </p>
          </div>
          <button onClick={() => setActiveTab('explore')} className="text-[13px] font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer shrink-0 mt-0.5">
            <span>Directory</span>
            <ArrowRight size={13}/>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {peopleYouMayKnow.map(student => (<StudentCard key={student.id} student={student}/>))}
        </div>
      </section>
    </div>);
};
