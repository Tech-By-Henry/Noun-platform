import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ScopeBadge } from '../components/ScopeBadge';
import { Plus, ChevronRight, ShieldCheck, CheckCircle2, Users2, X, } from 'lucide-react';
export const CommunitiesView = () => {
    const { communities, groups, openModal, createGroup, currentUser, } = useApp();
    const [activeSubTab, setActiveSubTab] = useState('my');
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [newGroupData, setNewGroupData] = useState({
        name: '',
        description: '',
        category: 'Study Group',
        meetingSchedule: 'Saturdays 11:00 AM (Online)',
    });
    useEffect(() => {
        document.body.classList.toggle('modal-open', showCreateGroupModal);
        return () => document.body.classList.remove('modal-open');
    }, [showCreateGroupModal]);
    const myCommunities = communities.filter(c => c.joined);
    const myGroups = groups.filter(g => g.isMember);
    const handleCreateGroupSubmit = (e) => {
        e.preventDefault();
        if (!newGroupData.name.trim())
            return;
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
    const CommunityCard = ({ comm, showJoined }) => (<div onClick={() => openModal('community', comm.id)} className="card card-hover p-4 cursor-pointer text-left flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <ScopeBadge scope={comm.scope} label={comm.category}/>
            {comm.joined ? (<span className="chip chip-brand shrink-0">
                <CheckCircle2 size={11}/> Joined
              </span>) : showJoined ? (<span className="text-[11px] text-slate-400 shrink-0">Available</span>) : null}
          </div>
          <h4 className="font-semibold text-slate-900 text-sm sm:text-[15px] leading-snug group-hover:text-emerald-900">
            {comm.name}
          </h4>
          <p className="text-[13px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {comm.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-[#eef2f6] flex items-center justify-between text-xs text-slate-500">
          <span>{comm.memberCount.toLocaleString()} members</span>
          <span className="text-emerald-800 font-semibold flex items-center gap-0.5">
            Open <ChevronRight size={13}/>
          </span>
        </div>
      </div>);
    const GroupCard = ({ grp, footer }) => (<div onClick={() => openModal('group', grp.id)} className="card card-hover p-4 cursor-pointer text-left flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="chip chip-brand">{grp.category}</span>
            <span className="text-xs text-slate-400 shrink-0">{grp.memberCount} members</span>
          </div>
          <h4 className="font-semibold text-slate-900 text-sm sm:text-[15px] group-hover:text-emerald-900">
            {grp.name}
          </h4>
          <p className="text-[13px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {grp.description}
          </p>
          <div className="mt-2.5 text-xs text-slate-500 bg-[#f4f6f8] px-3 py-2 rounded-lg">
            <span className="font-medium text-slate-700">Latest:</span> {grp.recentActivity}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#eef2f6] flex items-center justify-between text-xs text-slate-500 gap-2">
          <span className="truncate">{footer}</span>
          <span className="text-emerald-800 font-semibold flex items-center gap-0.5 shrink-0">
            {grp.isMember ? 'Enter chat' : 'View group'} <ChevronRight size={13}/>
          </span>
        </div>
      </div>);
    return (<div className="space-y-5 pb-10 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Communities & Groups</h1>
          <p className="page-subtitle">
            Official institutional bodies and student-organized study circles.
          </p>
        </div>

        <button onClick={() => setShowCreateGroupModal(true)} className="btn btn-primary self-start sm:self-auto shrink-0">
          <Plus size={15}/>
          <span>Create study group</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-6 border-b border-[#e3e8ef] overflow-x-auto no-scrollbar">
        {[
            { id: 'my', label: 'My memberships', count: myCommunities.length + myGroups.length },
            { id: 'official', label: 'Academic bodies', count: communities.length },
            { id: 'groups', label: 'Peer study groups', count: groups.length },
        ].map(t => (<button key={t.id} onClick={() => setActiveSubTab(t.id)} className={`tab-underline shrink-0 ${activeSubTab === t.id ? 'is-active' : ''}`}>
            <span>{t.label}</span>
            <span className="text-xs text-slate-400">({t.count})</span>
          </button>))}
      </div>

      {/* SUBTAB 1: MY MEMBERSHIPS */}
      {activeSubTab === 'my' && (<div className="space-y-7">
          <div>
            <h3 className="eyebrow mb-3 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-700"/>
              Official communities ({myCommunities.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {myCommunities.map(comm => (<CommunityCard key={comm.id} comm={comm}/>))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-3 flex items-center gap-1.5">
              <Users2 size={13} className="text-emerald-700"/>
              Peer groups you joined ({myGroups.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {myGroups.map(grp => (<GroupCard key={grp.id} grp={grp} footer={`Schedule: ${grp.meetingSchedule || 'Flexible'}`}/>))}
            </div>
          </div>
        </div>)}

      {/* SUBTAB 2: ALL ACADEMIC BODIES */}
      {activeSubTab === 'official' && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {communities.map(comm => (<CommunityCard key={comm.id} comm={comm} showJoined/>))}
        </div>)}

      {/* SUBTAB 3: ALL PEER STUDY GROUPS */}
      {activeSubTab === 'groups' && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {groups.map(grp => (<GroupCard key={grp.id} grp={grp} footer={<>Lead: <strong className="font-semibold text-slate-700">{grp.leader}</strong></>}/>))}
        </div>)}

      {/* Create study group modal */}
      {showCreateGroupModal && (<div className="modal-overlay animate-fadeIn">
          <div className="modal-panel max-w-md">
            <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4 border-b border-[#eef2f6] shrink-0">
              <h3 className="text-base font-bold text-slate-900">
                Create a study group
              </h3>
              <button onClick={() => setShowCreateGroupModal(false)} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-[#eef2f6] cursor-pointer" aria-label="Close">
                <X size={18}/>
              </button>
            </div>

            <form onSubmit={handleCreateGroupSubmit} className="modal-body p-5 sm:p-6 space-y-4">
              <div>
                <label className="field-label">Group name</label>
                <input type="text" placeholder="e.g. CSC 208 Database Systems Circle" value={newGroupData.name} onChange={e => setNewGroupData({ ...newGroupData, name: e.target.value })} required className="input"/>
              </div>

              <div>
                <label className="field-label">Category</label>
                <select value={newGroupData.category} onChange={e => setNewGroupData({ ...newGroupData, category: e.target.value })} className="input">
                  <option value="Study Group">Study Group</option>
                  <option value="Project Team">Project Team</option>
                  <option value="Course Circle">Course Circle</option>
                  <option value="Special Interest">Special Interest</option>
                </select>
              </div>

              <div>
                <label className="field-label">Meeting schedule</label>
                <input type="text" placeholder="e.g. Saturdays 10:00 AM (VI Centre / Online)" value={newGroupData.meetingSchedule} onChange={e => setNewGroupData({ ...newGroupData, meetingSchedule: e.target.value })} className="input"/>
              </div>

              <div>
                <label className="field-label">Purpose & description</label>
                <textarea rows={2} placeholder="What will group members work on together?" value={newGroupData.description} onChange={e => setNewGroupData({ ...newGroupData, description: e.target.value })} className="input"/>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateGroupModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Launch group
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
