import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Users, Building2 } from 'lucide-react';
export const StudentCard = ({ student, compact = false, }) => {
    const { openModal, startDirectChatWithStudent, getSharedCommunitiesCount, currentUser } = useApp();
    const sharedCount = getSharedCommunitiesCount(student);
    const isMe = student.id === currentUser.id;
    const handleCardClick = () => {
        openModal('student', student.id);
    };
    const handleMessageClick = (e) => {
        e.stopPropagation();
        startDirectChatWithStudent(student);
    };
    return (<div onClick={handleCardClick} className={`group card card-hover cursor-pointer text-left flex flex-col justify-between ${compact ? 'p-3.5' : 'p-4'}`}>
      <div>
        {/* Identity */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <img src={student.avatar} alt={student.name} className="w-11 h-11 rounded-full object-cover border border-[#e3e8ef]"/>
            {student.isOnline && (<span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" title="Active now"/>)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-slate-900 text-sm truncate group-hover:text-emerald-900 transition-colors">
                {student.name}
              </h4>
              {isMe && (<span className="chip chip-neutral shrink-0">You</span>)}
            </div>

            <p className="text-xs font-medium text-emerald-800 truncate mt-0.5">
              {student.programme}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {student.level}
            </p>
          </div>
        </div>

        {/* Study centre */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
          <Building2 size={13} className="text-slate-400 shrink-0"/>
          <span className="truncate">
            {student.studyCentreName.replace('Lagos Study Centre — ', '')}
          </span>
        </div>

        {/* Shared communities */}
        {!isMe && sharedCount > 0 && (<div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800">
            <Users size={11} className="shrink-0"/>
            <span>{sharedCount} shared {sharedCount === 1 ? 'community' : 'communities'} with you</span>
          </div>)}

        {/* Interests */}
        {!compact && student.interests && student.interests.length > 0 && (<div className="mt-2.5 flex flex-wrap gap-1.5">
            {student.interests.slice(0, 3).map(interest => (<span key={interest} className="chip chip-neutral font-medium">
                {interest}
              </span>))}
            {student.interests.length > 3 && (<span className="text-[11px] text-slate-400 self-center">
                +{student.interests.length - 3}
              </span>)}
          </div>)}
      </div>

      {/* Actions */}
      <div className="mt-3 pt-3 border-t border-[#eef2f6] flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400 group-hover:text-emerald-800 transition-colors font-medium">
          View profile
        </span>

        {!isMe && (<button onClick={handleMessageClick} className="btn btn-sm btn-tonal" title={`Start message with ${student.name}`}>
            <MessageSquare size={13}/>
            <span>Message</span>
          </button>)}
      </div>
    </div>);
};
