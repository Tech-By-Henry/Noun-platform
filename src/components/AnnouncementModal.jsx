import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScopeBadge } from './ScopeBadge';
import { X, Bookmark, Paperclip, Download, Building, ShieldCheck, Send, MessageSquare, Calendar, Check, } from 'lucide-react';
export const AnnouncementModal = () => {
    const { modal, closeModal, announcements, events, comments, addAnnouncementComment, toggleBookmarkAnnouncement, } = useApp();
    const [commentText, setCommentText] = useState('');
    const [downloadedFiles, setDownloadedFiles] = useState({});
    if (modal.type !== 'announcement' || !modal.id)
        return null;
    const announcement = announcements.find(a => a.id === modal.id);
    if (!announcement)
        return null;
    const relatedEvent = announcement.relatedEventId
        ? events.find(e => e.id === announcement.relatedEventId)
        : null;
    const announcementComments = comments[announcement.id] || [];
    const handleSendComment = (e) => {
        e.preventDefault();
        if (!commentText.trim())
            return;
        addAnnouncementComment(announcement.id, commentText);
        setCommentText('');
    };
    const handleDownload = (name) => {
        setDownloadedFiles(prev => ({ ...prev, [name]: true }));
    };
    return (<div className="modal-overlay animate-fadeIn">
      <div className="modal-panel max-w-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 border-b border-[#e3e8ef] bg-[#f8fafc] shrink-0">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <ScopeBadge scope={announcement.scope} label={announcement.scopeTarget} size="md"/>
            {announcement.isOfficial && (<span className="chip chip-brand">
                <ShieldCheck size={11}/>
                Verified notice
              </span>)}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => toggleBookmarkAnnouncement(announcement.id)} className={`p-2 rounded-full transition-colors cursor-pointer ${announcement.bookmarked
            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
            : 'text-slate-400 hover:text-slate-600 hover:bg-[#eef2f6]'}`} title={announcement.bookmarked ? 'Saved in bookmarks' : 'Bookmark'}>
              <Bookmark size={16} className={announcement.bookmarked ? 'fill-amber-500' : ''}/>
            </button>
            <button onClick={closeModal} className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-[#eef2f6] transition-colors cursor-pointer" title="Close" aria-label="Close">
              <X size={18}/>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="modal-body p-4 sm:p-6 space-y-6">
          {/* Header meta */}
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2.5">
              <span className="font-medium text-slate-700 flex items-center gap-1.5">
                <Building size={13} className="text-slate-400"/>
                {announcement.publishingAuthority}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-800">{announcement.authorityRole}</span>
              <span className="text-slate-300">·</span>
              <span>{announcement.date}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">{announcement.timestamp}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {announcement.title}
            </h2>
          </div>

          {/* Official content */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] border border-[#e3e8ef]">
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#e3e8ef]">
              <span className="eyebrow text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-700"/>
                Official publication
              </span>
              <span className="text-[11px] text-slate-400">
                Scope: {announcement.scope.replace('_', ' ').toLowerCase()}
              </span>
            </div>

            <div className="text-sm leading-relaxed whitespace-pre-line text-slate-700">
              {announcement.content}
            </div>

            {/* Attachments */}
            {announcement.attachments && announcement.attachments.length > 0 && (<div className="mt-5 pt-4 border-t border-[#e3e8ef]">
                <h4 className="eyebrow mb-2.5 flex items-center gap-1.5">
                  <Paperclip size={12} className="text-emerald-700"/>
                  Attachments ({announcement.attachments.length})
                </h4>
                <div className="space-y-2">
                  {announcement.attachments.map(att => (<div key={att.name} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-[#e3e8ef]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 uppercase">
                          {att.type}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-slate-900 truncate">
                            {att.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{att.size}</p>
                        </div>
                      </div>
                      {downloadedFiles[att.name] ? (<span className="chip chip-brand shrink-0">
                          <Check size={11}/>
                          Saved
                        </span>) : (<button onClick={() => handleDownload(att.name)} className="btn btn-sm btn-tonal shrink-0">
                          <Download size={13}/>
                          <span>Download</span>
                        </button>)}
                    </div>))}
                </div>
              </div>)}
          </div>

          {/* Related event */}
          {relatedEvent && (<div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="eyebrow text-emerald-800 flex items-center gap-1.5">
                  <Calendar size={12}/> Linked event
                </span>
                <span className="text-xs font-medium text-emerald-800 shrink-0">{relatedEvent.date}</span>
              </div>
              <h4 className="font-semibold text-sm text-slate-900">{relatedEvent.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{relatedEvent.time} · {relatedEvent.location}</p>
            </div>)}

          {/* Student discussion */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={15} className="text-slate-500"/>
                <h3 className="section-title text-sm">
                  Student questions & clarifications
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {announcementComments.length} {announcementComments.length === 1 ? 'response' : 'responses'}
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              {announcementComments.length === 0 ? (<p className="text-[13px] text-slate-500 p-4 bg-[#f8fafc] border border-[#eef2f6] rounded-xl text-center">
                  No peer questions yet. Ask a question or share a clarification below.
                </p>) : (announcementComments.map(comment => (<div key={comment.id} className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#eef2f6] text-left">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={comment.authorAvatar} alt={comment.authorName} className="w-6 h-6 rounded-full object-cover border border-[#e3e8ef] shrink-0"/>
                        <div className="min-w-0 truncate">
                          <span className="text-xs font-semibold text-slate-900 mr-2">
                            {comment.authorName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {comment.authorSubtitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{comment.timestamp}</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-relaxed pl-8 mt-1.5">
                      {comment.text}
                    </p>
                  </div>)))}
            </div>

            <form onSubmit={handleSendComment} className="flex gap-2">
              <input type="text" placeholder="Ask a question or reply to this announcement…" value={commentText} onChange={e => setCommentText(e.target.value)} className="input input-sm flex-1"/>
              <button type="submit" disabled={!commentText.trim()} className="btn btn-primary shrink-0" style={{ height: 38 }}>
                <Send size={13}/>
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#f8fafc] border-t border-[#e3e8ef] flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-400">Official university notice (prototype)</span>
          <button onClick={closeModal} className="btn btn-sm btn-secondary">
            Done reading
          </button>
        </div>
      </div>
    </div>);
};
