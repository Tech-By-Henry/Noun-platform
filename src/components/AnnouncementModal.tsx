import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScopeBadge } from './ScopeBadge';
import {
  X,
  Bookmark,
  Paperclip,
  Download,
  Building,
  ShieldCheck,
  Send,
  MessageSquare,
  ThumbsUp,
  Calendar,
  Share2,
} from 'lucide-react';

export const AnnouncementModal: React.FC = () => {
  const {
    modal,
    closeModal,
    announcements,
    events,
    comments,
    addAnnouncementComment,
    toggleBookmarkAnnouncement,
    openModal,
  } = useApp();

  const [commentText, setCommentText] = useState('');

  if (modal.type !== 'announcement' || !modal.id) return null;

  const announcement = announcements.find(a => a.id === modal.id);
  if (!announcement) return null;

  const relatedEvent = announcement.relatedEventId
    ? events.find(e => e.id === announcement.relatedEventId)
    : null;

  const announcementComments = comments[announcement.id] || [];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addAnnouncementComment(announcement.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <ScopeBadge scope={announcement.scope} label={announcement.scopeTarget} size="md" />
            {announcement.isOfficial && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                <ShieldCheck size={12} className="text-emerald-700" />
                Verified University Notice
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleBookmarkAnnouncement(announcement.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                announcement.bookmarked
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={announcement.bookmarked ? 'Saved in bookmarks' : 'Bookmark'}
            >
              <Bookmark size={17} className={announcement.bookmarked ? 'fill-amber-500' : ''} />
            </button>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Header Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Building size={13} className="text-slate-400" />
                {announcement.publishingAuthority}
              </span>
              <span>•</span>
              <span className="text-emerald-800 font-medium">{announcement.authorityRole}</span>
              <span>•</span>
              <span>{announcement.date}</span>
              <span>•</span>
              <span className="text-slate-400">{announcement.timestamp}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {announcement.title}
            </h2>
          </div>

          {/* OFFICIAL INFORMATION BANNER (Explicitly distinguishing official info from student chat) */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/70">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-700" />
                Official Publication Content
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Scope: {announcement.scope}
              </span>
            </div>

            <div className="text-sm leading-relaxed whitespace-pre-line text-slate-700 font-normal">
              {announcement.content}
            </div>

            {/* Official Attachments */}
            {announcement.attachments && announcement.attachments.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-200/70">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Paperclip size={13} className="text-emerald-700" />
                  Official Circulars & Attachments ({announcement.attachments.length})
                </h4>
                <div className="space-y-2">
                  {announcement.attachments.map(att => (
                    <div
                      key={att.name}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 uppercase border border-emerald-100">
                          {att.type}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {att.name}
                          </p>
                          <p className="text-[10px] text-slate-500">{att.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading "${att.name}" for demonstration.`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Event Card (if attached) */}
          {relatedEvent && (
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={13} /> Linked Scheduled Event
                </span>
                <span className="text-xs font-semibold text-indigo-700">{relatedEvent.date}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{relatedEvent.title}</h4>
              <p className="text-xs text-slate-600 mt-1">{relatedEvent.time} • {relatedEvent.location}</p>
            </div>
          )}

          {/* STUDENT DISCUSSION SECTION (Visually separated from official information) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-slate-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  Student Questions & Peer Clarifications
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {announcementComments.length} {announcementComments.length === 1 ? 'response' : 'responses'}
              </span>
            </div>

            {/* Comments List */}
            <div className="space-y-3 mb-4">
              {announcementComments.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg text-center">
                  No peer inquiries yet. Ask a question or share a clarification below.
                </p>
              ) : (
                announcementComments.map(comment => (
                  <div
                    key={comment.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-left space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 mr-2">
                            {comment.authorName}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {comment.authorSubtitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-8">
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask a question or reply to this announcement..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-900 bg-white"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                <Send size={13} />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Official University Concept Notice</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-semibold text-slate-700 cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
