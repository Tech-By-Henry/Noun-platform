import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Megaphone,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AnnouncementCard } from './AnnouncementCard';
import { EventCard } from './EventCard';
import { StudentCard } from './StudentCard';

export const StudyCentreModal: React.FC = () => {
  const {
    modal,
    closeModal,
    studyCentres,
    announcements,
    events,
    groups,
    students,
    openModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'students' | 'events' | 'groups'>('overview');

  if (modal.type !== 'centre' || !modal.id) return null;

  const centre = studyCentres.find(c => c.id === modal.id);
  if (!centre) return null;

  // Filter announcements for this centre
  const centreAnnouncements = announcements.filter(
    a => a.scope === 'STUDY_CENTRE' && (a.scopeTarget.includes(centre.name) || a.scopeTarget.includes(centre.city))
  );

  // Filter events for this centre
  const centreEvents = events.filter(
    e => e.scope === 'STUDY_CENTRE' && (e.scopeTarget.includes(centre.name) || e.location.includes(centre.name) || e.location.includes(centre.city))
  );

  // Filter groups in this centre
  const centreGroups = groups.filter(
    g => g.studyCentreName && g.studyCentreName.includes(centre.name)
  );

  // Filter students enrolled in this centre
  const centreStudents = students.filter(s => s.studyCentreId === centre.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 text-white">
              <Building2 size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-700/80 px-2 py-0.5 rounded text-emerald-100 border border-emerald-600/50">
                  {centre.code}
                </span>
                <span className="text-xs text-emerald-200 font-medium">
                  {centre.state} State Zonal Hub
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                {centre.name}
              </h2>
              <p className="text-xs text-emerald-100/90 mt-1 flex items-center gap-1.5">
                <MapPin size={13} className="shrink-0" />
                <span className="truncate">{centre.address}</span>
              </p>
            </div>
          </div>

          {/* Quick Centre Stats Row */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/15 text-center">
            <div className="p-2 rounded-lg bg-white/10">
              <div className="text-base sm:text-lg font-extrabold text-white">
                {centre.studentCount.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs text-emerald-200 uppercase tracking-tight">
                Active Students
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/10">
              <div className="text-base sm:text-lg font-extrabold text-white">
                {centre.activeGroupsCount}
              </div>
              <div className="text-[10px] sm:text-xs text-emerald-200 uppercase tracking-tight">
                Study Groups
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/10">
              <div className="text-base sm:text-lg font-extrabold text-white">
                {centre.announcementsCount}
              </div>
              <div className="text-[10px] sm:text-xs text-emerald-200 uppercase tracking-tight">
                Notices
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'announcements', label: `Notices (${centreAnnouncements.length})` },
            { id: 'students', label: `Directory (${centreStudents.length})` },
            { id: 'events', label: `Events (${centreEvents.length})` },
            { id: 'groups', label: `Study Groups (${centreGroups.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 sm:px-4 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-700 text-emerald-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Tab Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 text-left">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  About This Study Centre
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {centre.description}
                </p>
              </div>

              {/* Coordinator & Contact Details */}
              <div className="rounded-xl border border-slate-200 p-4 bg-white">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building2 size={14} className="text-emerald-700" />
                  Administration & Direct Contacts
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Centre Director / Coordinator</span>
                    <span className="font-bold text-slate-900 text-sm">{centre.coordinator}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Centre Established</span>
                    <span className="font-medium text-slate-700">{centre.established} (Accredited Hub)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={13} className="text-slate-400" />
                    <span>{centre.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={13} className="text-slate-400" />
                    <span>{centre.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Sample Notices */}
              {centreAnnouncements.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Latest Centre Notice
                    </h4>
                    <button
                      onClick={() => setActiveTab('announcements')}
                      className="text-xs text-emerald-700 font-semibold hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <AnnouncementCard announcement={centreAnnouncements[0]} compact />
                </div>
              )}
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="space-y-3">
              {centreAnnouncements.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No direct centre announcements published at this moment.
                </div>
              ) : (
                centreAnnouncements.map(ann => (
                  <AnnouncementCard key={ann.id} announcement={ann} />
                ))
              )}
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <div className="mb-3 text-xs text-slate-500">
                Displaying students officially registered at <strong>{centre.name}</strong>.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {centreStudents.length === 0 ? (
                  <div className="col-span-2 text-center py-8 text-slate-500 text-xs">
                    No demo students mapped directly to this centre.
                  </div>
                ) : (
                  centreStudents.map(student => (
                    <StudentCard key={student.id} student={student} compact />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-3">
              {centreEvents.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No upcoming scheduled in-person events at this centre right now.
                </div>
              ) : (
                centreEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-3">
              {centreGroups.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No study groups tied exclusively to this study centre.
                </div>
              ) : (
                centreGroups.map(grp => (
                  <div
                    key={grp.id}
                    onClick={() => openModal('group', grp.id)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white transition-all cursor-pointer text-left shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {grp.category}
                      </span>
                      <span className="text-xs text-slate-500">{grp.memberCount} Members</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1.5">
                      {grp.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {grp.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Schedule: {grp.meetingSchedule || 'Flexible'}</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                        Open Group <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            NOUN Study Centre Directory Profile
          </span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
