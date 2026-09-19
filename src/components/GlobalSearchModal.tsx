import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  User,
  Megaphone,
  Building2,
  Users,
  Layers,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { ScopeBadge } from './ScopeBadge';

export const GlobalSearchModal: React.FC = () => {
  const {
    modal,
    closeModal,
    students,
    announcements,
    studyCentres,
    communities,
    groups,
    openModal,
  } = useApp();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'students' | 'announcements' | 'centres' | 'communities'>('all');

  if (modal.type !== 'search') return null;

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        students: students.slice(0, 4),
        announcements: announcements.slice(0, 3),
        centres: studyCentres.slice(0, 3),
        communities: communities.slice(0, 3),
      };
    }

    return {
      students: students.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.programme.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.studyCentreName.toLowerCase().includes(q) ||
          s.skills.some(sk => sk.toLowerCase().includes(q)) ||
          s.interests.some(inr => inr.toLowerCase().includes(q))
      ),
      announcements: announcements.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.publishingAuthority.toLowerCase().includes(q) ||
          a.scopeTarget.toLowerCase().includes(q)
      ),
      centres: studyCentres.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)
      ),
      communities: communities.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      ),
    };
  }, [query, students, announcements, studyCentres, communities]);

  const totalResults =
    results.students.length +
    results.announcements.length +
    results.centres.length +
    results.communities.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn pt-10 sm:pt-16">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 flex items-center gap-3 bg-white shrink-0">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search students, announcements, study centres, programmes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={closeModal}
            className="px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-md cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs shrink-0 no-scrollbar">
          {[
            { id: 'all', label: `All (${totalResults})` },
            { id: 'students', label: `Students (${results.students.length})` },
            { id: 'announcements', label: `Notices (${results.announcements.length})` },
            { id: 'centres', label: `Study Centres (${results.centres.length})` },
            { id: 'communities', label: `Communities (${results.communities.length})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === f.id
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="overflow-y-auto p-4 space-y-5 text-left flex-1">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm font-semibold">No results found for “{query}”</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for “Computer Science”, “Lagos”, “Orientation”, or “Amaka”
              </p>
            </div>
          ) : (
            <>
              {/* Students Section */}
              {(filterType === 'all' || filterType === 'students') && results.students.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User size={12} /> Students ({results.students.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.students.slice(0, filterType === 'all' ? 4 : 20).map(student => (
                      <div
                        key={student.id}
                        onClick={() => openModal('student', student.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-slate-900 truncate">
                              {student.name}
                            </h5>
                            <p className="text-[11px] text-emerald-800 font-medium truncate">
                              {student.programme} • {student.level}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {student.studyCentreName}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Announcements Section */}
              {(filterType === 'all' || filterType === 'announcements') && results.announcements.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Megaphone size={12} /> Official Announcements ({results.announcements.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.announcements.slice(0, filterType === 'all' ? 3 : 20).map(ann => (
                      <div
                        key={ann.id}
                        onClick={() => openModal('announcement', ann.id)}
                        className="p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <ScopeBadge scope={ann.scope} label={ann.scopeTarget} size="sm" />
                          <span className="text-[10px] text-slate-400">{ann.date}</span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {ann.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {ann.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Centres Section */}
              {(filterType === 'all' || filterType === 'centres') && results.centres.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 size={12} /> Study Centres ({results.centres.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.centres.slice(0, filterType === 'all' ? 3 : 20).map(centre => (
                      <div
                        key={centre.id}
                        onClick={() => openModal('centre', centre.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                              {centre.code}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 truncate">
                              {centre.name}
                            </h5>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {centre.address} • {centre.studentCount.toLocaleString()} Students
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Communities Section */}
              {(filterType === 'all' || filterType === 'communities') && results.communities.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={12} /> Communities & Academic Units ({results.communities.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.communities.slice(0, filterType === 'all' ? 3 : 20).map(comm => (
                      <div
                        key={comm.id}
                        onClick={() => openModal('community', comm.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                              {comm.category}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 truncate">
                              {comm.name}
                            </h5>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {comm.memberCount.toLocaleString()} Members enrolled
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
