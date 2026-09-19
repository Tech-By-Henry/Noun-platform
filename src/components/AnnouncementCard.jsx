import React from 'react';
import { ScopeBadge } from './ScopeBadge';
import { Pin, Bookmark, Paperclip, MessageSquare, Building, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const AnnouncementCard = ({ announcement, compact = false, }) => {
    const { openModal, toggleBookmarkAnnouncement, markAnnouncementAsRead } = useApp();
    const handleCardClick = () => {
        markAnnouncementAsRead(announcement.id);
        openModal('announcement', announcement.id);
    };
    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        toggleBookmarkAnnouncement(announcement.id);
    };
    return (<div onClick={handleCardClick} className={`group relative card card-hover cursor-pointer text-left ${!announcement.read ? 'border-emerald-200 bg-emerald-50/20' : ''} ${compact ? 'p-4' : 'p-4 sm:p-5'}`}>
      {/* Meta row */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <ScopeBadge scope={announcement.scope} label={announcement.scopeTarget}/>
          {announcement.isOfficial && (<span className="chip chip-brand">
              <ShieldCheck size={11}/>
              Official
            </span>)}
          {announcement.isPinned && (<span className="chip chip-amber">
              <Pin size={10} className="rotate-45"/>
              Pinned
            </span>)}
          {!announcement.read && (<span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" title="Unread"/>)}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs text-slate-400">
            {announcement.date}
          </span>
          <button onClick={handleBookmarkClick} className={`p-1.5 rounded-full transition-colors cursor-pointer ${announcement.bookmarked
            ? 'text-amber-600 hover:bg-amber-50'
            : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`} title={announcement.bookmarked ? 'Saved in bookmarks' : 'Bookmark for later'} aria-label="Bookmark announcement">
            <Bookmark size={15} className={announcement.bookmarked ? 'fill-amber-500' : ''}/>
          </button>
        </div>
      </div>

      {/* Publishing authority */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 truncate">
        <Building size={12} className="text-slate-400 shrink-0"/>
        <span className="truncate">{announcement.publishingAuthority}</span>
      </div>

      {/* Title */}
      <h4 className={`font-semibold text-slate-900 leading-snug group-hover:text-emerald-900 transition-colors ${compact ? 'text-sm mb-1.5 line-clamp-2' : 'text-[15px] sm:text-base mb-2 line-clamp-2'}`}>
        {announcement.title}
      </h4>

      {/* Summary */}
      <p className={`text-slate-600 leading-relaxed text-[13px] line-clamp-2 ${compact ? 'mb-3' : 'mb-3.5'}`}>
        {announcement.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#eef2f6] text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {announcement.attachments && announcement.attachments.length > 0 && (<span className="inline-flex items-center gap-1 text-slate-600 font-medium">
              <Paperclip size={12} className="text-slate-400"/>
              {announcement.attachments.length} {announcement.attachments.length === 1 ? 'file' : 'files'}
            </span>)}
          <span className="inline-flex items-center gap-1">
            <MessageSquare size={12} className="text-slate-400"/>
            {announcement.commentCount} replies
          </span>
        </div>

        <span className="text-xs font-semibold text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity">
          Read notice
        </span>
      </div>
    </div>);
};
