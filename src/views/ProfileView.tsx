import React from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_PERSONAS } from '../data/mockData';
import { AnnouncementCard } from '../components/AnnouncementCard';
import {
  User,
  GraduationCap,
  Building2,
  MapPin,
  Landmark,
  BookOpen,
  Layers,
  Sparkles,
  Bookmark,
  CheckCircle2,
  RefreshCw,
  Edit3,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    switchPersona,
    openModal,
    announcements,
  } = useApp();

  const savedAnnouncements = announcements.filter(a => a.bookmarked);

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto text-left animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <User size={20} className="text-emerald-800" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Identity & Academic Placement
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Your validated enrolment standing and position within the National Open University system.
        </p>
      </div>

      {/* Main Student Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {currentUser.name}
                </h2>
                <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Enrolled Student
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5">
                {currentUser.programme} • {currentUser.level}
              </p>
              <p className="text-xs text-slate-500">
                Matriculation: {currentUser.matricNo} • {currentUser.studyCentreName}
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal('onboarding')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Edit3 size={13} />
            <span>Edit Coordinates</span>
          </button>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentUser.bio}
          </div>
        )}
      </div>

      {/* "WHERE I STAND" VISUAL HIERARCHY TREE */}
      <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              Institutional Taxonomy
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Where You Stand in NOUN
            </h3>
          </div>
          <span className="text-xs text-slate-400">7-Tier Placement</span>
        </div>

        {/* Step-by-step Visual Pathway */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">1. National Tier</span>
            <span className="font-bold text-white mt-1 block">Nigeria (NOUN Headquarters)</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">2. State Tier</span>
            <span className="font-bold text-white mt-1 block flex items-center gap-1">
              <MapPin size={12} className="text-emerald-400" />
              {currentUser.state} State
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">3. Study Centre</span>
            <span className="font-bold text-emerald-200 mt-1 block truncate" title={currentUser.studyCentreName}>
              {currentUser.studyCentreName}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">4. Faculty</span>
            <span className="font-bold text-white mt-1 block truncate">
              {currentUser.faculty}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">5. Department</span>
            <span className="font-bold text-white mt-1 block truncate">
              {currentUser.department}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">6. Degree Programme</span>
            <span className="font-bold text-white mt-1 block truncate">
              {currentUser.programme}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">7. Academic Level</span>
            <span className="font-bold text-emerald-300 mt-1 block">
              {currentUser.level}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-800/40 border border-emerald-500/30 flex items-center justify-center text-center">
            <span className="text-xs font-bold text-emerald-200">
              ✓ Fully Verified Coordinates
            </span>
          </div>
        </div>
      </div>

      {/* DEMO PERSONA SWITCHER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw size={17} className="text-emerald-800" />
            <h3 className="text-base font-bold text-slate-900">
              Switch Student Persona (Prototype Demonstration)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Try Different Profiles</span>
        </div>

        <p className="text-xs text-slate-500">
          Switching personas immediately reconfigures the platform's feeds, notifications, study centre hub, and community memberships to show how NOUN Connect customizes information for diverse students across Nigeria.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {DEMO_PERSONAS.map((p, idx) => {
            const isCurrent = currentUser.name.startsWith(p.name.split(' (')[0]);
            return (
              <button
                key={p.name}
                onClick={() => switchPersona(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center gap-3 ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-11 h-11 rounded-xl object-cover border shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {p.name}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium truncate">
                    {p.programme} • {p.level}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {p.studyCentreName} ({p.state})
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SAVED BOOKMARKS / CIRCULARS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Bookmark size={17} className="text-emerald-800" />
          <h3 className="text-base font-bold text-slate-900">
            Bookmarked Notices ({savedAnnouncements.length})
          </h3>
        </div>

        {savedAnnouncements.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            You haven’t bookmarked any notices yet. Tap the bookmark icon on any announcement to save it here for quick reference.
          </p>
        ) : (
          <div className="space-y-3">
            {savedAnnouncements.map(a => (
              <AnnouncementCard key={a.id} announcement={a} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
