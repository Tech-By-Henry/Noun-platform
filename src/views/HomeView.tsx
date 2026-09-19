import React from 'react';
import { useApp } from '../context/AppContext';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { EventCard } from '../components/EventCard';
import { StudentCard } from '../components/StudentCard';
import { ScopeBadge } from '../components/ScopeBadge';
import {
  Bell,
  Calendar,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Layers,
  Building2,
  GraduationCap,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    currentUser,
    announcements,
    events,
    communities,
    students,
    openModal,
    setActiveTab,
  } = useApp();

  // Urgent/Important announcements targeting current user's scope
  const importantNotices = announcements.filter(
    a => a.isPinned || a.scope === 'STUDY_CENTRE' || a.scope === 'NATIONAL'
  ).slice(0, 3);

  // Upcoming 3 events
  const upcomingEvents = events.slice(0, 3);

  // Communities user belongs to
  const myCommunities = communities.filter(c => c.joined);

  // People you may know (share study centre OR department OR level)
  const peopleYouMayKnow = students
    .filter(s => s.id !== currentUser.id)
    .filter(
      s =>
        s.studyCentreId === currentUser.studyCentreId ||
        s.department === currentUser.department ||
        s.level === currentUser.level
    )
    .slice(0, 4);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* 1. Personalized Academic Opening Section */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Academic Workspace Active
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good day, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
              Here is what matters in your university ecosystem right now.
            </p>
          </div>

          <button
            onClick={() => openModal('onboarding')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-colors cursor-pointer shrink-0"
            title="Update your student profile or switch demo role"
          >
            <Sparkles size={13} className="text-emerald-300" />
            <span>Switch Student</span>
          </button>
        </div>

        {/* Academic Coordinates Banner */}
        <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <GraduationCap size={16} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-emerald-300/80 block uppercase font-semibold">Degree & Level</span>
              <span className="font-bold text-white truncate block">
                {currentUser.programme} • {currentUser.level}
              </span>
            </div>
          </div>

          <div
            onClick={() => openModal('centre', currentUser.studyCentreId)}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Building2 size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-emerald-300/80 block uppercase font-semibold">Study Centre Hub</span>
              <span className="font-bold text-white truncate block group-hover:text-emerald-200">
                {currentUser.studyCentreName.replace('Lagos Study Centre — ', '')}
              </span>
            </div>
            <ChevronRight size={14} className="text-emerald-300/50 group-hover:text-white shrink-0" />
          </div>

          <div
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Compass size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-emerald-300/80 block uppercase font-semibold">Geographic State</span>
              <span className="font-bold text-white truncate block group-hover:text-emerald-200">
                {currentUser.state} State, Nigeria
              </span>
            </div>
            <ChevronRight size={14} className="text-emerald-300/50 group-hover:text-white shrink-0" />
          </div>
        </div>
      </section>

      {/* 2. IMPORTANT FOR YOU (High-priority updates matching student scope) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Important For You
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('updates')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>All Updates</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {importantNotices.map(notice => (
            <AnnouncementCard key={notice.id} announcement={notice} compact />
          ))}
        </div>
      </section>

      {/* 3. UPCOMING SCHEDULED EVENTS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-emerald-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Upcoming Academic Schedule
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Next 14 Days
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} compact />
          ))}
        </div>
      </section>

      {/* 4. YOUR OFFICIAL COMMUNITIES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-emerald-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Your Communities & Academic Bodies
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('communities')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {myCommunities.map(comm => (
            <button
              key={comm.id}
              onClick={() => openModal('community', comm.id)}
              className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-sm transition-all duration-150 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tight block truncate">
                  {comm.category}
                </span>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 line-clamp-2 mt-1">
                  {comm.name}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{comm.memberCount > 999 ? `${(comm.memberCount / 1000).toFixed(0)}k` : comm.memberCount} members</span>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-emerald-600" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. COURSEMATES & PEOPLE YOU MAY KNOW */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles size={17} className="text-emerald-800" />
              Coursemates Around You
            </h2>
            <p className="text-xs text-slate-500">
              Students sharing your study centre, department, or academic level.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Student Directory</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {peopleYouMayKnow.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </section>
    </div>
  );
};
