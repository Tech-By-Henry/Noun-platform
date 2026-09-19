import React from 'react';
import { Announcement } from '../types';
import { ScopeBadge } from './ScopeBadge';
import { Pin, Bookmark, Paperclip, MessageSquare, Building, ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AnnouncementCardProps {
  announcement: Announcement;
  compact?: boolean;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  compact = false,
}) => {
  const { openModal, toggleBookmarkAnnouncement, markAnnouncementAsRead } = useApp();

  const handleCardClick = () => {
    markAnnouncementAsRead(announcement.id);
    openModal('announcement', announcement.id);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmarkAnnouncement(announcement.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-white rounded-xl border transition-all duration-200 cursor-pointer text-left shadow-2xs hover:shadow-md ${
        announcement.isPinned
          ? 'border-emerald-200/90 bg-gradient-to-b from-emerald-50/20 to-white'
          : !announcement.read
          ? 'border-emerald-300 ring-1 ring-emerald-400/20 bg-emerald-50/10'
          : 'border-slate-200/90 hover:border-slate-300'
      } ${compact ? 'p-3.5' : 'p-4 sm:p-5'}`}
    >
      {/* Top Meta: Scope Badge + Authority + Date */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <ScopeBadge scope={announcement.scope} label={announcement.scopeTarget} />
          {announcement.isOfficial && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
              <ShieldCheck size={11} className="text-emerald-700" />
              Official
            </span>
          )}
          {announcement.isPinned && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
              <Pin size={10} className="text-amber-700 rotate-45" />
              Pinned
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-slate-400 font-medium">
            {announcement.date}
          </span>
          <button
            onClick={handleBookmarkClick}
            className={`p-1 rounded-md transition-colors ${
              announcement.bookmarked
                ? 'text-amber-600 hover:text-amber-700'
                : 'text-slate-300 hover:text-slate-500'
            }`}
            title={announcement.bookmarked ? 'Saved in bookmarks' : 'Bookmark for later'}
            aria-label="Bookmark announcement"
          >
            <Bookmark
              size={15}
              className={announcement.bookmarked ? 'fill-amber-500' : ''}
            />
          </button>
        </div>
      </div>

      {/* Publishing Authority */}
      <div className="flex items-center gap-1 text-xs text-slate-500 mb-2 font-medium truncate">
        <Building size={12} className="text-slate-400 shrink-0" />
        <span className="truncate text-slate-700 font-medium">
          {announcement.publishingAuthority}
        </span>
      </div>

      {/* Title */}
      <h4
        className={`font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors ${
          compact ? 'text-sm mb-1.5 line-clamp-2' : 'text-base sm:text-lg mb-2 line-clamp-2'
        }`}
      >
        {announcement.title}
      </h4>

      {/* Summary */}
      <p
        className={`text-slate-600 leading-relaxed text-xs sm:text-sm line-clamp-2 ${
          compact ? 'mb-2' : 'mb-3'
        }`}
      >
        {announcement.summary}
      </p>

      {/* Card Footer: Attachments & Comments */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {announcement.attachments && announcement.attachments.length > 0 && (
            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
              <Paperclip size={12} />
              {announcement.attachments.length} {announcement.attachments.length === 1 ? 'Doc' : 'Docs'}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-slate-500 text-[11px]">
            <MessageSquare size={12} />
            {announcement.commentCount} discussions
          </span>
        </div>

        <div className="inline-flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
          <span>Read Notice</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};
