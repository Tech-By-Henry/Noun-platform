import React from 'react';
import { Student } from '../types';
import { useApp } from '../context/AppContext';
import { MessageSquare, MapPin, Sparkles, Building2, ChevronRight } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  compact?: boolean;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  compact = false,
}) => {
  const { openModal, startDirectChatWithStudent, getSharedCommunitiesCount, currentUser } = useApp();

  const sharedCount = getSharedCommunitiesCount(student);
  const isMe = student.id === currentUser.id;

  const handleCardClick = () => {
    openModal('student', student.id);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startDirectChatWithStudent(student);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-xl border border-slate-200/90 hover:border-emerald-300 transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-md text-left flex flex-col justify-between ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <div>
        {/* Top: Avatar, Name & Online dot */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-2xs"
            />
            {student.isOnline && (
              <span
                className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"
                title="Active now"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-emerald-800 transition-colors">
                {student.name}
              </h4>
              {isMe && (
                <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  You
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-emerald-800 truncate">
              {student.programme}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {student.level}
            </p>
          </div>
        </div>

        {/* Study Centre location */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
          <Building2 size={13} className="text-slate-400 shrink-0" />
          <span className="truncate">
            {student.studyCentreName.replace('Lagos Study Centre — ', '')}
          </span>
        </div>

        {/* Shared Communities Badge */}
        {!isMe && sharedCount > 0 && (
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
            <Sparkles size={11} className="text-emerald-600 shrink-0" />
            <span>{sharedCount} shared {sharedCount === 1 ? 'connection' : 'connections'} with you</span>
          </div>
        )}

        {/* Interests preview (if not compact) */}
        {!compact && student.interests && student.interests.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {student.interests.slice(0, 3).map(interest => (
              <span
                key={interest}
                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
              >
                {interest}
              </span>
            ))}
            {student.interests.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{student.interests.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 group-hover:text-emerald-700 transition-colors flex items-center gap-0.5 font-medium">
          View Profile <ChevronRight size={12} />
        </span>

        {!isMe && (
          <button
            onClick={handleMessageClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs"
            title={`Start message with ${student.name}`}
          >
            <MessageSquare size={13} />
            <span>Message</span>
          </button>
        )}
      </div>
    </div>
  );
};
