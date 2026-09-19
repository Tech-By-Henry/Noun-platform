import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { Megaphone, Search, Bookmark, ShieldCheck, Building2, BookOpen, GraduationCap, Layers, } from 'lucide-react';
export const UpdatesView = () => {
    const { announcements, currentUser } = useApp();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const filterTabs = [
        { id: 'all', label: 'All notices', icon: Megaphone },
        { id: 'important', label: 'Official / urgent', icon: ShieldCheck },
        { id: 'centre', label: 'My study centre', icon: Building2 },
        { id: 'department', label: 'My department', icon: BookOpen },
        { id: 'programme', label: 'My programme', icon: GraduationCap },
        { id: 'level', label: 'My level', icon: Layers },
        { id: 'bookmarked', label: 'Saved', icon: Bookmark },
    ];
    const filteredAnnouncements = useMemo(() => {
        return announcements.filter(a => {
            // Tab filter
            if (filter === 'important' && !a.isPinned && a.scope !== 'NATIONAL')
                return false;
            if (filter === 'centre' && (a.scope !== 'STUDY_CENTRE' || !a.scopeTarget.includes(currentUser.studyCentreName)))
                return false;
            if (filter === 'department' && (a.scope !== 'DEPARTMENT' || !a.scopeTarget.includes(currentUser.department)))
                return false;
            if (filter === 'programme' && (a.scope !== 'PROGRAMME' || !a.scopeTarget.includes(currentUser.programme)))
                return false;
            if (filter === 'level' && (a.scope !== 'LEVEL' || !a.scopeTarget.includes(currentUser.level)))
                return false;
            if (filter === 'bookmarked' && !a.bookmarked)
                return false;
            // Search query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                return (a.title.toLowerCase().includes(q) ||
                    a.summary.toLowerCase().includes(q) ||
                    a.publishingAuthority.toLowerCase().includes(q) ||
                    a.scopeTarget.toLowerCase().includes(q));
            }
            return true;
        });
    }, [announcements, filter, searchQuery, currentUser]);
    return (<div className="space-y-5 pb-10 max-w-4xl mx-auto text-left animate-fadeIn">
      {/* Page header */}
      <div>
        <h1 className="page-title">Updates & Notices</h1>
        <p className="page-subtitle">
          Official university circulars filtered to your academic coordinates.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
        <input type="text" placeholder="Search by keyword, authority, or course…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="input pl-11"/>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        {filterTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = filter === tab.id;
            return (<button key={tab.id} onClick={() => setFilter(tab.id)} className={`pill-tab shrink-0 ${isActive ? 'is-active' : ''}`}>
              <Icon size={13} className={isActive ? 'text-white/80' : 'text-slate-400'}/>
              <span>{tab.label}</span>
            </button>);
        })}
      </div>

      {/* Feed */}
      <div className="space-y-3.5">
        {filteredAnnouncements.length === 0 ? (<div className="card text-center py-14 px-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#eef2f6] flex items-center justify-center mx-auto">
              <Megaphone size={20} className="text-slate-400"/>
            </div>
            <h3 className="text-sm font-semibold text-slate-800 pt-1">No announcements match this filter</h3>
            <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
              Try switching back to “All notices” or clearing your search term.
            </p>
            <button onClick={() => {
                setFilter('all');
                setSearchQuery('');
            }} className="btn btn-sm btn-secondary mt-2">
              Show all announcements
            </button>
          </div>) : (filteredAnnouncements.map(announcement => (<AnnouncementCard key={announcement.id} announcement={announcement}/>)))}
      </div>
    </div>);
};
