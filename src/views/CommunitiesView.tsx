import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScopeBadge } from '../components/ScopeBadge';
import {
  Users2,
  Plus,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  BookOpen,
  Calendar,
  X,
} from 'lucide-react';

export const CommunitiesView: React.FC = () => {
  const {
    communities,
    groups,
    openModal,
    createGroup,
    currentUser,
    toggleJoinGroup,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'my' | 'official' | 'groups'>('my');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    category: 'Study Group' as const,
    meetingSchedule: 'Saturdays 11:00 AM (Online)',
  });

  const myCommunities = communities.filter(c => c.joined);
  const myGroups = groups.filter(g => g.isMember);

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupData.name.trim()) return;
    createGroup({
      name: newGroupData.name.trim(),
      description: newGroupData.description.trim() || 'Student-led collaboration circle.',
      category: newGroupData.category,
      leader: currentUser.name,
      meetingSchedule: newGroupData.meetingSchedule,
      studyCentreName: currentUser.studyCentreName,
      department: currentUser.department,
      level: currentUser.level,
    });
    setShowCreateGroupModal(false);
    setNewGroupData({
      name: '',
      description: '',
      category: 'Study Group',
      meetingSchedule: 'Saturdays 11:00 AM (Online)',
    });
  };

  return (
    <div className="space-y-5 pb-12 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users2 size={20} className="text-emerald-800" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Communities & Academic Units
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Official institutional branches and student-organized collaborative study circles.
          </p>
        </div>

        <button
          onClick={() => setShowCreateGroupModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={14} />
          <span>Create Study Group</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: 'my', label: `My Memberships (${myCommunities.length + myGroups.length})` },
          { id: 'official', label: `All Academic Bodies (${communities.length})` },
          { id: 'groups', label: `Peer Study Groups (${groups.length})` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id as any)}
            className={`py-2.5 px-3 sm:px-5 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === t.id
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: MY MEMBERSHIPS */}
      {activeSubTab === 'my' && (
        <div className="space-y-6">
          {/* Section: Official Institutional Units */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-700" />
              Your Official Institutional Communities ({myCommunities.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {myCommunities.map(comm => (
                <div
                  key={comm.id}
                  onClick={() => openModal('community', comm.id)}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <ScopeBadge scope={comm.scope} label={comm.category} />
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        <CheckCircle2 size={10} /> Joined
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {comm.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {comm.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{comm.memberCount.toLocaleString()} members</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      Open <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Joined Study Groups */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-700" />
              Active Peer Groups You Joined ({myGroups.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {myGroups.map(grp => (
                <div
                  key={grp.id}
                  onClick={() => openModal('group', grp.id)}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {grp.category}
                      </span>
                      <span className="text-xs text-slate-400">{grp.memberCount} Members</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {grp.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {grp.description}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                      <span className="font-medium text-slate-700">Latest:</span> {grp.recentActivity}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Schedule: {grp.meetingSchedule || 'Flexible'}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      Enter Chat <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ALL ACADEMIC BODIES */}
      {activeSubTab === 'official' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {communities.map(comm => (
            <div
              key={comm.id}
              onClick={() => openModal('community', comm.id)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <ScopeBadge scope={comm.scope} label={comm.category} />
                  {comm.joined ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Member
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">Available</span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {comm.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {comm.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{comm.memberCount.toLocaleString()} members</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  View Community <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: ALL PEER STUDY GROUPS */}
      {activeSubTab === 'groups' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {groups.map(grp => (
            <div
              key={grp.id}
              onClick={() => openModal('group', grp.id)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {grp.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {grp.memberCount} Members
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {grp.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {grp.description}
                </p>
                <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                  <span className="font-medium text-slate-700">Latest:</span> {grp.recentActivity}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Lead: <strong>{grp.leader}</strong>
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  View Group <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Study Group Modal Dialog */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Form a New Student Study Group
              </h3>
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateGroupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. CSC 208 Database Systems Circle"
                  value={newGroupData.name}
                  onChange={e => setNewGroupData({ ...newGroupData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newGroupData.category}
                  onChange={e => setNewGroupData({ ...newGroupData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Study Group">Study Group</option>
                  <option value="Project Team">Project Team</option>
                  <option value="Course Circle">Course Circle</option>
                  <option value="Special Interest">Special Interest</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Meeting Schedule
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saturdays 10:00 AM (VI Centre / Online)"
                  value={newGroupData.meetingSchedule}
                  onChange={e => setNewGroupData({ ...newGroupData, meetingSchedule: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Purpose & Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What will group members work on together?"
                  value={newGroupData.description}
                  onChange={e => setNewGroupData({ ...newGroupData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Launch Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
