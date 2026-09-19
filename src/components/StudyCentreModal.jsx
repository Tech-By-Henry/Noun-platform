import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Building2, MapPin, Phone, Mail, ChevronRight, } from 'lucide-react';
import { AnnouncementCard } from './AnnouncementCard';
import { EventCard } from './EventCard';
import { StudentCard } from './StudentCard';
export const StudyCentreModal = () => {
    const { modal, closeModal, studyCentres, announcements, events, groups, students, openModal, } = useApp();
    const [activeTab, setActiveTab] = useState('overview');
    if (modal.type !== 'centre' || !modal.id)
        return null;
    const centre = studyCentres.find(c => c.id === modal.id);
    if (!centre)
        return null;
    // Filter announcements for this centre
    const centreAnnouncements = announcements.filter(a => a.scope === 'STUDY_CENTRE' && (a.scopeTarget.includes(centre.name) || a.scopeTarget.includes(centre.city)));
    // Filter events for this centre
    const centreEvents = events.filter(e => e.scope === 'STUDY_CENTRE' && (e.scopeTarget.includes(centre.name) || e.location.includes(centre.name) || e.location.includes(centre.city)));
    // Filter groups in this centre
    const centreGroups = groups.filter(g => g.studyCentreName && g.studyCentreName.includes(centre.name));
    // Filter students enrolled in this centre
    const centreStudents = students.filter(s => s.studyCentreId === centre.id);
    const EmptyTab = ({ children }) => (<div className="text-center py-12 text-slate-500 text-[13px]">{children}</div>);
    return (<div className="modal-overlay animate-fadeIn">
      <div className="modal-panel max-w-3xl">
        {/* Header */}
        <div className="bg-[#123f33] text-white p-5 sm:p-6 shrink-0 relative">
          <button onClick={closeModal} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer" aria-label="Close">
            <X size={18}/>
          </button>

          <div className="flex items-start gap-3.5 pr-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-200">
              <Building2 size={22}/>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="chip bg-white/10 text-emerald-100">{centre.code}</span>
                <span className="text-xs text-emerald-200/80">
                  {centre.state} State
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {centre.name}
              </h2>
              <p className="text-xs text-emerald-100/80 mt-1.5 flex items-center gap-1.5 min-w-0">
                <MapPin size={12} className="shrink-0"/>
                <span className="truncate">{centre.address}</span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center">
            {[
            { value: centre.studentCount.toLocaleString(), label: 'Students' },
            { value: centre.activeGroupsCount, label: 'Study groups' },
            { value: centre.announcementsCount, label: 'Notices' },
        ].map(stat => (<div key={stat.label} className="py-2.5 rounded-xl bg-white/5">
                <div className="text-base font-bold text-white">{stat.value}</div>
                <div className="text-[11px] text-emerald-200/80 mt-0.5">{stat.label}</div>
              </div>))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-5 border-b border-[#e3e8ef] bg-white px-4 sm:px-6 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'announcements', label: 'Notices', count: centreAnnouncements.length },
            { id: 'students', label: 'Students', count: centreStudents.length },
            { id: 'events', label: 'Events', count: centreEvents.length },
            { id: 'groups', label: 'Groups', count: centreGroups.length },
        ].map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-underline shrink-0 text-[13px] ${activeTab === tab.id ? 'is-active' : ''}`}>
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (<span className="text-xs text-slate-400">({tab.count})</span>)}
            </button>))}
        </div>

        {/* Tab content */}
        <div className="modal-body p-4 sm:p-6 text-left bg-[#fafbfc]">
          {activeTab === 'overview' && (<div className="space-y-4">
              <div className="card p-4">
                <h4 className="eyebrow mb-2">About this study centre</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {centre.description}
                </p>
              </div>

              {/* Contacts */}
              <div className="card p-4">
                <h4 className="eyebrow mb-3 flex items-center gap-1.5">
                  <Building2 size={12} className="text-emerald-700"/>
                  Administration & contacts
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Centre coordinator</span>
                    <span className="font-semibold text-slate-900">{centre.coordinator}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Established</span>
                    <span className="text-slate-700">{centre.established}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 min-w-0">
                    <Mail size={13} className="text-slate-400 shrink-0"/>
                    <span className="truncate">{centre.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={13} className="text-slate-400 shrink-0"/>
                    <span>{centre.phone}</span>
                  </div>
                </div>
              </div>

              {/* Latest notice */}
              {centreAnnouncements.length > 0 && (<div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="eyebrow">Latest centre notice</h4>
                    <button onClick={() => setActiveTab('announcements')} className="text-xs text-emerald-800 font-semibold hover:underline cursor-pointer">
                      View all
                    </button>
                  </div>
                  <AnnouncementCard announcement={centreAnnouncements[0]} compact/>
                </div>)}
            </div>)}

          {activeTab === 'announcements' && (<div className="space-y-3">
              {centreAnnouncements.length === 0 ? (<EmptyTab>No centre announcements published at this moment.</EmptyTab>) : (centreAnnouncements.map(ann => (<AnnouncementCard key={ann.id} announcement={ann}/>)))}
            </div>)}

          {activeTab === 'students' && (<div>
              <div className="mb-3 text-[13px] text-slate-500">
                Students registered at <strong className="text-slate-700">{centre.name}</strong>.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {centreStudents.length === 0 ? (<div className="col-span-2"><EmptyTab>No demo students mapped to this centre yet.</EmptyTab></div>) : (centreStudents.map(student => (<StudentCard key={student.id} student={student} compact/>)))}
              </div>
            </div>)}

          {activeTab === 'events' && (<div className="space-y-3">
              {centreEvents.length === 0 ? (<EmptyTab>No upcoming events at this centre right now.</EmptyTab>) : (centreEvents.map(event => (<EventCard key={event.id} event={event}/>)))}
            </div>)}

          {activeTab === 'groups' && (<div className="space-y-3">
              {centreGroups.length === 0 ? (<EmptyTab>No study groups tied to this study centre yet.</EmptyTab>) : (centreGroups.map(grp => (<div key={grp.id} onClick={() => openModal('group', grp.id)} className="card card-hover p-4 cursor-pointer text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="chip chip-brand">{grp.category}</span>
                      <span className="text-xs text-slate-400">{grp.memberCount} members</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mt-2">
                      {grp.name}
                    </h4>
                    <p className="text-[13px] text-slate-500 mt-1 line-clamp-2">
                      {grp.description}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[#eef2f6] flex items-center justify-between text-xs text-slate-500 gap-2">
                      <span className="truncate">Schedule: {grp.meetingSchedule || 'Flexible'}</span>
                      <span className="font-semibold text-emerald-800 flex items-center gap-0.5 shrink-0">
                        Open group <ChevronRight size={13}/>
                      </span>
                    </div>
                  </div>)))}
            </div>)}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-[#e3e8ef] flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-400">
            NOUN study centre profile
          </span>
          <button onClick={closeModal} className="btn btn-sm btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>);
};
