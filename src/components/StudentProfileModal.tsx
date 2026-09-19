import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MessageSquare,
  Sparkles,
  MapPin,
  GraduationCap,
  Building2,
  Landmark,
  BookOpen,
  Layers,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const StudentProfileModal: React.FC = () => {
  const { modal, closeModal, students, currentUser, startDirectChatWithStudent, getSharedCommunitiesCount } = useApp();

  if (modal.type !== 'student' || !modal.id) return null;

  const student = students.find(s => s.id === modal.id) || (modal.id === currentUser.id ? currentUser : null);
  if (!student) return null;

  const isMe = student.id === currentUser.id;
  const sharedCount = getSharedCommunitiesCount(student);

  // Derive shared connections list
  const sharedList: string[] = [];
  if (student.state === currentUser.state) sharedList.push(`${student.state} State`);
  if (student.studyCentreId === currentUser.studyCentreId) sharedList.push(student.studyCentreName);
  if (student.faculty === currentUser.faculty) sharedList.push(student.faculty);
  if (student.department === currentUser.department) sharedList.push(`Dept of ${student.department}`);
  if (student.programme === currentUser.programme) sharedList.push(student.programme);
  if (student.level === currentUser.level) sharedList.push(student.level);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Student Profile & Academic Coordinates
          </span>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1 text-left">
          {/* Main Identity */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md"
              />
              {student.isOnline && (
                <span
                  className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white"
                  title="Online now"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 truncate">
                  {student.name}
                </h3>
                {isMe && (
                  <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    You
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                {student.programme}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {student.level} • Matric: {student.matricNo || 'Verified Student'}
              </p>
            </div>
          </div>

          {/* SHARED COMMUNITIES WITH CURRENT USER */}
          {!isMe && sharedCount > 0 && (
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-emerald-700" />
                <span className="text-xs font-bold text-emerald-900">
                  {sharedCount} Shared Communities With You
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sharedList.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 shadow-2xs"
                  >
                    <CheckCircle2 size={11} className="text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Academic Coordinates Hierarchy Section (Where does this student belong?) */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Building2 size={13} className="text-emerald-700" />
              Academic & Institutional Coordinates
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">State</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-slate-400" />
                  {student.state} State
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Study Centre</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate" title={student.studyCentreName}>
                  <Building2 size={12} className="text-slate-400 shrink-0" />
                  <span className="truncate">{student.studyCentreName}</span>
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Faculty</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                  <Landmark size={12} className="text-slate-400 shrink-0" />
                  <span className="truncate">{student.faculty}</span>
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Department</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                  <BookOpen size={12} className="text-slate-400 shrink-0" />
                  <span className="truncate">{student.department}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Student Bio */}
          {student.bio && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                About & Academic Focus
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                {student.bio}
              </p>
            </div>
          )}

          {/* Interests & Skills */}
          {((student.interests && student.interests.length > 0) || (student.skills && student.skills.length > 0)) && (
            <div className="space-y-2.5">
              {student.skills && student.skills.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Skills & Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map(s => (
                      <span
                        key={s}
                        className="text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {student.interests && student.interests.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Academic Interests & Domains
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {student.interests.map(i => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Enrolled Student Record
          </span>

          {!isMe ? (
            <button
              onClick={() => startDirectChatWithStudent(student)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>Direct Message {student.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={closeModal}
              className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
