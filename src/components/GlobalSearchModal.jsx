import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, User, Megaphone, Building2, Users, ChevronRight, } from 'lucide-react';
import { ScopeBadge } from './ScopeBadge';
import cancelIcon from '../assets/icons/cancel.svg';
export const GlobalSearchModal = () => {
    const { modal, closeModal, students, announcements, studyCentres, communities, groups, openModal, } = useApp();
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const results = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) {
            return {
                students: students.slice(0, 4),
                announcements: announcements.slice(0, 3),
                centres: studyCentres.slice(0, 3),
                communities: communities.slice(0, 3),
                groups: groups.slice(0, 3),
            };
        }
        return {
            students: students.filter(s => s.name.toLowerCase().includes(q) ||
                s.programme.toLowerCase().includes(q) ||
                s.department.toLowerCase().includes(q) ||
                s.studyCentreName.toLowerCase().includes(q) ||
                s.skills.some(sk => sk.toLowerCase().includes(q)) ||
                s.interests.some(inr => inr.toLowerCase().includes(q))),
            announcements: announcements.filter(a => a.title.toLowerCase().includes(q) ||
                a.summary.toLowerCase().includes(q) ||
                a.publishingAuthority.toLowerCase().includes(q) ||
                a.scopeTarget.toLowerCase().includes(q)),
            centres: studyCentres.filter(c => c.name.toLowerCase().includes(q) ||
                c.state.toLowerCase().includes(q) ||
                c.city.toLowerCase().includes(q) ||
                c.code.toLowerCase().includes(q)),
            communities: communities.filter(c => c.name.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q)),
            groups: groups.filter(g => g.name.toLowerCase().includes(q) ||
                g.description.toLowerCase().includes(q) ||
                g.category.toLowerCase().includes(q)),
        };
    }, [query, students, announcements, studyCentres, communities, groups]);
    const totalResults = results.students.length +
        results.announcements.length +
        results.centres.length +
        results.communities.length + results.groups.length;
    if (modal.type !== 'search')
        return null;
    return (<div className="modal-overlay modal-overlay--top animate-fadeIn">
      <div className="modal-panel max-w-2xl" style={{ maxHeight: 'min(85dvh, 85vh)' }}>
        <div className="p-3 sm:p-4 border-b border-[#e3e8ef] flex items-center gap-2.5 bg-white shrink-0">
          <Search size={18} className="text-slate-400 shrink-0"/>
          <input type="text" placeholder="Search students, notices, centres, communities…" value={query} onChange={e => setQuery(e.target.value)} autoFocus className="flex-1 min-w-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"/>
          {query ? (<button onClick={() => setQuery('')} className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-[#eef2f6] cursor-pointer" aria-label="Clear search">
              <img src={cancelIcon} alt="" className="w-4 h-4 opacity-70"/>
            </button>) : null}
          <button onClick={closeModal} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-[#eef2f6] cursor-pointer shrink-0" aria-label="Close search">
            <img src={cancelIcon} alt="" className="w-[18px] h-[18px]"/>
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f8fafc] border-b border-[#e3e8ef] overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'all', label: `All (${totalResults})` },
            { id: 'students', label: `Students (${results.students.length})` },
            { id: 'announcements', label: `Notices (${results.announcements.length})` },
            { id: 'centres', label: `Centres (${results.centres.length})` },
            { id: 'communities', label: `Communities (${results.communities.length})` },
            { id: 'groups', label: `Groups (${results.groups.length})` },
        ].map(f => (<button key={f.id} onClick={() => setFilterType(f.id)} className={`pill-tab shrink-0 ${filterType === f.id ? 'is-active' : ''}`}>
              {f.label}
            </button>))}
        </div>

        <div className="modal-body p-4 space-y-5 text-left">
          {totalResults === 0 ? (<div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-[#eef2f6] flex items-center justify-center mx-auto mb-3">
                <Search size={18} className="text-slate-400"/>
              </div>
              <p className="text-sm font-semibold text-slate-800">No results for “{query}”</p>
              <p className="text-[13px] text-slate-500 mt-1">
                Try “Computer Science”, “Lagos”, “Orientation”, or “Amaka”
              </p>
            </div>) : (<>
              {(filterType === 'all' || filterType === 'students') && results.students.length > 0 && (<div>
                  <h4 className="eyebrow mb-2 flex items-center gap-1.5">
                    <User size={12}/> Students ({results.students.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.students.slice(0, filterType === 'all' ? 4 : 20).map(student => (<div key={student.id} onClick={() => openModal('student', student.id)} className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-[#f8fafc] border border-[#eef2f6] hover:border-[#e3e8ef] transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover border border-[#e3e8ef] shrink-0"/>
                          <div className="min-w-0">
                            <h5 className="text-[13px] font-semibold text-slate-900 truncate">{student.name}</h5>
                            <p className="text-[11px] text-emerald-800 font-medium truncate">
                              {student.programme} · {student.level}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">{student.studyCentreName}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0"/>
                      </div>))}
                  </div>
                </div>)}

              {(filterType === 'all' || filterType === 'announcements') && results.announcements.length > 0 && (<div>
                  <h4 className="eyebrow mb-2 flex items-center gap-1.5">
                    <Megaphone size={12}/> Notices ({results.announcements.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.announcements.slice(0, filterType === 'all' ? 3 : 20).map(ann => (<div key={ann.id} onClick={() => openModal('announcement', ann.id)} className="p-3 rounded-xl hover:bg-[#f8fafc] border border-[#eef2f6] hover:border-[#e3e8ef] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <ScopeBadge scope={ann.scope} label={ann.scopeTarget} size="sm"/>
                          <span className="text-[10px] text-slate-400">{ann.date}</span>
                        </div>
                        <h5 className="text-[13px] font-semibold text-slate-900 line-clamp-1">{ann.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{ann.summary}</p>
                      </div>))}
                  </div>
                </div>)}

              {(filterType === 'all' || filterType === 'centres') && results.centres.length > 0 && (<div>
                  <h4 className="eyebrow mb-2 flex items-center gap-1.5">
                    <Building2 size={12}/> Study centres ({results.centres.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.centres.slice(0, filterType === 'all' ? 3 : 20).map(centre => (<div key={centre.id} onClick={() => openModal('centre', centre.id)} className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-[#f8fafc] border border-[#eef2f6] hover:border-[#e3e8ef] transition-colors cursor-pointer">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="chip chip-brand shrink-0">{centre.code}</span>
                            <h5 className="text-[13px] font-semibold text-slate-900 truncate">{centre.name}</h5>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {centre.address} · {centre.studentCount.toLocaleString()} students
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0"/>
                      </div>))}
                  </div>
                </div>)}

              {(filterType === 'all' || filterType === 'communities') && results.communities.length > 0 && (<div>
                  <h4 className="eyebrow mb-2 flex items-center gap-1.5">
                    <Users size={12}/> Communities ({results.communities.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.communities.slice(0, filterType === 'all' ? 3 : 20).map(comm => (<div key={comm.id} onClick={() => openModal('community', comm.id)} className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-[#f8fafc] border border-[#eef2f6] hover:border-[#e3e8ef] transition-colors cursor-pointer">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="chip chip-neutral shrink-0">{comm.category}</span>
                            <h5 className="text-[13px] font-semibold text-slate-900 truncate">{comm.name}</h5>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {comm.memberCount.toLocaleString()} members
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0"/>
                      </div>))}
                  </div>
                </div>)}

              {(filterType === 'all' || filterType === 'groups') && results.groups.length > 0 && (<div>
                  <h4 className="eyebrow mb-2 flex items-center gap-1.5">
                    <Users size={12}/> Study groups ({results.groups.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.groups.slice(0, filterType === 'all' ? 3 : 20).map(group => (<button key={group.id} onClick={() => openModal('group', group.id)} className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-[#f8fafc] border border-[#eef2f6] hover:border-[#e3e8ef] transition-colors cursor-pointer text-left">
                        <div className="min-w-0">
                          <h5 className="text-[13px] font-semibold text-slate-900 truncate">{group.name}</h5>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{group.category} · {group.memberCount} members</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-400 shrink-0"/>
                      </button>))}
                  </div>
                </div>)}
            </>)}
        </div>
      </div>
    </div>);
};
