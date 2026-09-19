import React from 'react';
import { useApp } from '../context/AppContext';
import { X, MessageSquare, Users, MapPin, Building2, Landmark, BookOpen, CheckCircle2, } from 'lucide-react';
export const StudentProfileModal = () => {
    const { modal, closeModal, students, currentUser, startDirectChatWithStudent, getSharedCommunitiesCount } = useApp();
    if (modal.type !== 'student' || !modal.id)
        return null;
    const student = students.find(s => s.id === modal.id) || (modal.id === currentUser.id ? currentUser : null);
    if (!student)
        return null;
    const isMe = student.id === currentUser.id;
    const sharedCount = getSharedCommunitiesCount(student);
    // Derive shared connections list
    const sharedList = [];
    if (student.state === currentUser.state)
        sharedList.push(`${student.state} State`);
    if (student.studyCentreId === currentUser.studyCentreId)
        sharedList.push(student.studyCentreName);
    if (student.faculty === currentUser.faculty)
        sharedList.push(student.faculty);
    if (student.department === currentUser.department)
        sharedList.push(`Dept of ${student.department}`);
    if (student.programme === currentUser.programme)
        sharedList.push(student.programme);
    if (student.level === currentUser.level)
        sharedList.push(student.level);
    const coordinates = [
        { label: 'State', value: `${student.state} State`, icon: MapPin },
        { label: 'Study centre', value: student.studyCentreName, icon: Building2 },
        { label: 'Faculty', value: student.faculty, icon: Landmark },
        { label: 'Department', value: student.department, icon: BookOpen },
    ];
    return (<div className="modal-overlay animate-fadeIn">
      <div className="modal-panel max-w-lg">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e3e8ef] bg-[#f8fafc] shrink-0">
          <span className="eyebrow">Student profile</span>
          <button onClick={closeModal} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-[#eef2f6] cursor-pointer" aria-label="Close">
            <X size={18}/>
          </button>
        </div>

        {/* Content */}
        <div className="modal-body p-5 sm:p-6 space-y-5 text-left">
          {/* Identity */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img src={student.avatar} alt={student.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#e3e8ef]"/>
              {student.isOnline && (<span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" title="Online now"/>)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900 truncate">
                  {student.name}
                </h3>
                {isMe && (<span className="chip chip-brand">You</span>)}
              </div>
              <p className="text-[13px] font-medium text-emerald-800 mt-0.5">
                {student.programme}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {student.level} · Matric: {student.matricNo || 'Verified student'}
              </p>
            </div>
          </div>

          {/* Shared communities */}
          {!isMe && sharedCount > 0 && (<div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center gap-2 mb-2.5">
                <Users size={13} className="text-emerald-700"/>
                <span className="text-xs font-semibold text-emerald-900">
                  {sharedCount} shared {sharedCount === 1 ? 'community' : 'communities'} with you
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sharedList.map(item => (<span key={item} className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-emerald-800 h-6 px-2.5 rounded-full border border-emerald-100 max-w-full">
                    <CheckCircle2 size={11} className="text-emerald-600 shrink-0"/>
                    <span className="truncate">{item}</span>
                  </span>))}
              </div>
            </div>)}

          {/* Coordinates */}
          <div className="rounded-2xl border border-[#e3e8ef] bg-[#f8fafc] p-4">
            <h4 className="eyebrow mb-3 flex items-center gap-1.5">
              <Building2 size={12} className="text-emerald-700"/>
              Academic coordinates
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {coordinates.map(c => {
            const Icon = c.icon;
            return (<div key={c.label} className="p-2.5 rounded-xl bg-white border border-[#e3e8ef] min-w-0">
                    <span className="text-[11px] text-slate-400 font-medium block">{c.label}</span>
                    <span className="font-medium text-[13px] text-slate-800 flex items-center gap-1.5 mt-0.5 min-w-0" title={c.value}>
                      <Icon size={12} className="text-slate-400 shrink-0"/>
                      <span className="truncate">{c.value}</span>
                    </span>
                  </div>);
        })}
            </div>
          </div>

          {/* Bio */}
          {student.bio && (<div>
              <h4 className="eyebrow mb-1.5">About</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {student.bio}
              </p>
            </div>)}

          {/* Skills & interests */}
          {((student.interests && student.interests.length > 0) || (student.skills && student.skills.length > 0)) && (<div className="space-y-3">
              {student.skills && student.skills.length > 0 && (<div>
                  <h4 className="eyebrow mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map(s => (<span key={s} className="chip chip-brand font-medium">
                        {s}
                      </span>))}
                  </div>
                </div>)}

              {student.interests && student.interests.length > 0 && (<div>
                  <h4 className="eyebrow mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {student.interests.map(i => (<span key={i} className="chip chip-neutral font-medium">
                        {i}
                      </span>))}
                  </div>
                </div>)}
            </div>)}
        </div>

        {/* Footer actions */}
        <div className="px-4 sm:px-6 py-3 bg-[#f8fafc] border-t border-[#e3e8ef] flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-400">
            Enrolled student record
          </span>

          {!isMe ? (<button onClick={() => startDirectChatWithStudent(student)} className="btn btn-primary shrink-0">
              <MessageSquare size={14}/>
              <span>Message</span>
            </button>) : (<button onClick={closeModal} className="btn btn-sm btn-secondary shrink-0">
              Close
            </button>)}
        </div>
      </div>
    </div>);
};
