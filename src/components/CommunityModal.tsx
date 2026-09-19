import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScopeBadge } from './ScopeBadge';
import {
  X,
  Users,
  Megaphone,
  MessageSquare,
  Calendar,
  Layers,
  CheckCircle2,
  Plus,
  Send,
} from 'lucide-react';
import { AnnouncementCard } from './AnnouncementCard';
import { StudentCard } from './StudentCard';
import { EventCard } from './EventCard';

export const CommunityModal: React.FC = () => {
  const {
    modal,
    closeModal,
    communities,
    announcements,
    students,
    events,
    groups,
    toggleJoinCommunity,
    currentUser,
    openModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'members' | 'discussion' | 'groups'>('overview');
  const [discussionPosts, setDiscussionPosts] = useState([
    {
      id: 'd-1',
      author: 'Amaka Williams',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      subtitle: 'B.Sc. Computer Science • 200L',
      text: 'Reminder to all enrolled colleagues: The TMA 1 practice questions are now accessible. Let’s share notes on Chapter 3 algorithms.',
      timestamp: 'Yesterday at 2:15 PM',
      likes: 8,
    },
    {
      id: 'd-2',
      author: 'Daniel Okoro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      subtitle: 'B.Sc. Computer Science • 200L',
      text: 'Anyone facing syntax issues in the Moodle virtual compiler? We found that running standard Python 3.11 locally solves the test cases.',
      timestamp: 'Today at 9:30 AM',
      likes: 5,
    },
  ]);
  const [postText, setPostText] = useState('');

  if (modal.type !== 'community' || !modal.id) return null;

  const community = communities.find(c => c.id === modal.id);
  if (!community) return null;

  // Filter announcements for this community
  const communityAnnouncements = announcements.filter(a => {
    if (community.type === 'FACULTY' && (a.scope === 'FACULTY' || a.scopeTarget.includes(community.name))) return true;
    if (community.type === 'DEPARTMENT' && (a.scope === 'DEPARTMENT' || a.scopeTarget.includes(community.name))) return true;
    if (community.type === 'PROGRAMME' && (a.scope === 'PROGRAMME' || a.scopeTarget.includes(community.name))) return true;
    if (community.type === 'LEVEL' && (a.scope === 'LEVEL' || a.scopeTarget.includes(community.name))) return true;
    if (community.type === 'STATE' && (a.scope === 'STATE' || a.scopeTarget.includes(community.state || ''))) return true;
    if (community.type === 'CENTRE' && (a.scope === 'STUDY_CENTRE')) return true;
    return false;
  });

  // Filter members
  const communityMembers = students.filter(s => {
    if (community.type === 'FACULTY' && s.faculty === community.faculty) return true;
    if (community.type === 'DEPARTMENT' && s.department === community.department) return true;
    if (community.type === 'PROGRAMME' && s.programme === community.programme) return true;
    if (community.type === 'LEVEL' && s.level === community.level) return true;
    if (community.type === 'STATE' && s.state === community.state) return true;
    if (community.type === 'CENTRE' && s.studyCentreId === community.centreId) return true;
    return true; // Default fallback to show diverse students
  });

  // Filter groups
  const communityGroups = groups.filter(g => g.communityId === community.id);

  const handleSendDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;
    setDiscussionPosts(prev => [
      {
        id: `d-${Date.now()}`,
        author: currentUser.name,
        avatar: currentUser.avatar,
        subtitle: `${currentUser.programme} • ${currentUser.level}`,
        text: postText.trim(),
        timestamp: 'Just now',
        likes: 0,
      },
      ...prev,
    ]);
    setPostText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white shrink-0 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ScopeBadge scope={community.scope} label={community.category} />
                {community.isOfficial && (
                  <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
                    Official University Unit
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {community.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {community.description}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">
              {community.memberCount.toLocaleString()} Members enrolled
            </span>

            <button
              onClick={() => toggleJoinCommunity(community.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                community.joined
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {community.joined ? (
                <>
                  <CheckCircle2 size={13} />
                  <span>Joined Community</span>
                </>
              ) : (
                <>
                  <Plus size={13} />
                  <span>Join Community</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'announcements', label: `Announcements (${communityAnnouncements.length})` },
            { id: 'members', label: `Members (${communityMembers.length})` },
            { id: 'discussion', label: `Forum (${discussionPosts.length})` },
            { id: 'groups', label: `Groups (${communityGroups.length})` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3 px-3 sm:px-4 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === t.id
                  ? 'border-emerald-700 text-emerald-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 text-left">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  About This Community
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {community.description}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/70 text-xs text-slate-500 flex flex-wrap gap-4">
                  <div>
                    <span className="font-semibold text-slate-700">Type:</span> {community.type}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Access:</span> Open to all affiliated scholars
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Moderation:</span> Academic Facilitator & Liaison
                  </div>
                </div>
              </div>

              {communityAnnouncements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Recent Official Announcement
                  </h4>
                  <AnnouncementCard announcement={communityAnnouncements[0]} compact />
                </div>
              )}
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="space-y-3">
              {communityAnnouncements.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No specific announcements published for this community yet.
                </div>
              ) : (
                communityAnnouncements.map(ann => (
                  <AnnouncementCard key={ann.id} announcement={ann} />
                ))
              )}
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="mb-3 text-xs text-slate-500">
                Connected students affiliated with <strong>{community.name}</strong>.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {communityMembers.map(member => (
                  <StudentCard key={member.id} student={member} compact />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-4">
              {/* Post form */}
              <form onSubmit={handleSendDiscussion} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <textarea
                  rows={2}
                  placeholder={`Share an academic inquiry or update in ${community.name}...`}
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[11px] text-slate-400">
                    Posting as {currentUser.name}
                  </span>
                  <button
                    type="submit"
                    disabled={!postText.trim()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Send size={12} />
                    <span>Post to Community</span>
                  </button>
                </div>
              </form>

              {/* Discussion posts */}
              <div className="space-y-3">
                {discussionPosts.map(post => (
                  <div key={post.id} className="p-3.5 rounded-xl bg-white border border-slate-200 text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-full object-cover border" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 mr-2">{post.author}</span>
                          <span className="text-[10px] text-slate-500">{post.subtitle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-9">
                      {post.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-3">
              {communityGroups.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No specific peer groups attached under this community category.
                </div>
              ) : (
                communityGroups.map(grp => (
                  <div
                    key={grp.id}
                    onClick={() => openModal('group', grp.id)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {grp.category}
                      </span>
                      <span className="text-xs text-slate-500">{grp.memberCount} Members</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{grp.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{grp.description}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Official NOUN Community Hub</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
