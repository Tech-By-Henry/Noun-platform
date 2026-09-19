import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AnnouncementCard } from '../components/AnnouncementCard';
import {
  Megaphone,
  Search,
  Filter,
  Bookmark,
  ShieldCheck,
  Building2,
  BookOpen,
  GraduationCap,
  Layers,
} from 'lucide-react';

type UpdateFilter = 'all' | 'important' | 'centre' | 'department' | 'programme' | 'level' | 'bookmarked';

export const UpdatesView: React.FC = () => {
  const { announcements, currentUser } = useApp();
  const [filter, setFilter] = useState<UpdateFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: UpdateFilter; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'all', label: 'All Notices', icon: Megaphone },
    { id: 'important', label: 'Official / Urgent', icon: ShieldCheck },
    { id: 'centre', label: 'My Study Centre', icon: Building2 },
    { id: 'department', label: 'My Department', icon: BookOpen },
    { id: 'programme', label: 'My Programme', icon: GraduationCap },
    { id: 'level', label: 'My Level', icon: Layers },
    { id: 'bookmarked', label: 'Saved Bookmarks', icon: Bookmark },
  ];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(a => {
      // Tab filter
      if (filter === 'important' && !a.isPinned && a.scope !== 'NATIONAL') return false;
      if (filter === 'centre' && (a.scope !== 'STUDY_CENTRE' || !a.scopeTarget.includes('Victoria Island'))) return false;
      if (filter === 'department' && (a.scope !== 'DEPARTMENT' || !a.scopeTarget.includes('Computer Science'))) return false;
      if (filter === 'programme' && (a.scope !== 'PROGRAMME' || !a.scopeTarget.includes('Computer Science'))) return false;
      if (filter === 'level' && (a.scope !== 'LEVEL' || !a.scopeTarget.includes('200 Level'))) return false;
      if (filter === 'bookmarked' && !a.bookmarked) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.publishingAuthority.toLowerCase().includes(q) ||
          a.scopeTarget.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [announcements, filter, searchQuery, currentUser]);

  return (
    <div className="space-y-5 pb-12 max-w-4xl mx-auto text-left animate-fadeIn">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Megaphone size={20} className="text-emerald-800" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Official Notices & Academic Updates
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Structured university circulars filtered according to your institutional coordinates.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter announcements by keyword, authority, or course..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </div>

      {/* Filter Tabs Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {filterTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon size={13} className={isActive ? 'text-white' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Announcements Feed */}
      <div className="space-y-3.5">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-2">
            <Megaphone size={28} className="mx-auto text-slate-300" />
            <h3 className="text-sm font-bold text-slate-700">No announcements match this filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try switching back to "All Notices" or clearing your search term to see broader updates.
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 inline-flex items-center text-xs font-semibold text-emerald-700 hover:underline"
            >
              Show all announcements
            </button>
          </div>
        ) : (
          filteredAnnouncements.map(announcement => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        )}
      </div>
    </div>
  );
};
