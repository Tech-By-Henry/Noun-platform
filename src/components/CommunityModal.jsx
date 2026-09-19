import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScopeBadge } from './ScopeBadge';
import { X, CheckCircle2, Plus, Send, } from 'lucide-react';
import { AnnouncementCard } from './AnnouncementCard';
import { StudentCard } from './StudentCard';
export const CommunityModal = () => {
    const { modal, closeModal, communities, announcements, students, groups, toggleJoinCommunity, currentUser, openModal, } = useApp();
    const [activeTab, setActiveTab] = useState('overview');
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
    if (modal.type !== 'community' || !modal.id)
        return null;
    const community = communities.find(c => c.id === modal.id);
    if (!community)
        return null;
    const communityAnnouncements = announcements.filter(a => {
        if (community.type === 'FACULTY' && (a.scope === 'FACULTY' || a.scopeTarget.includes(community.name)))
            return true;
        if (community.type === 'DEPARTMENT' && (a.scope === 'DEPARTMENT' || a.scopeTarget.includes(community.name)))
            return true;
        if (community.type === 'PROGRAMME' && (a.scope === 'PROGRAMME' || a.scopeTarget.includes(community.name)))
            return true;
        if (community.type === 'LEVEL' && (a.scope === 'LEVEL' || a.scopeTarget.includes(community.name)))
            return true;
        if (community.type === 'STATE' && (a.scope === 'STATE' || a.scopeTarget.includes(community.state || '')))
            return true;
        if (community.type === 'CENTRE' && (a.scope === 'STUDY_CENTRE'))
            return true;
        return false;
    });
    const communityMembers = students.filter(s => {
        if (community.type === 'FACULTY' && s.faculty === community.faculty)
            return true;
        if (community.type === 'DEPARTMENT' && s.department === community.department)
            return true;
        if (community.type === 'PROGRAMME' && s.programme === community.programme)
            return true;
        if (community.type === 'LEVEL' && s.level === community.level)
            return true;
        if (community.type === 'STATE' && s.state === community.state)
            return true;
        if (community.type === 'CENTRE' && s.studyCentreId === community.centreId)
            return true;
        return true;
    });
    const communityGroups = groups.filter(g => g.communityId === community.id);
    const handleSendDiscussion = (e) => {
        e.preventDefault();
        if (!postText.trim())
            return;
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
    const EmptyTab = ({ children }) => (<div className="text-center py-12 text-slate-500 text-[13px]">{children}</div>);
    return (<div className="modal-overlay animate-fadeIn">
      <div className="modal-panel max-w-3xl">
        <div className="p-5 sm:p-6 bg-[#123f33] text-white shrink-0 relative">
          <button onClick={closeModal} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer" aria-label="Close">
            <X size={18}/>
          </button>

          <div className="pr-10">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <ScopeBadge scope={community.scope} label={community.category}/>
              {community.isOfficial && (<span className="chip bg-white/10 text-emerald-100">Official unit</span>)}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {community.name}
            </h2>
            <p className="text-xs text-emerald-100/80 mt-1.5 max-w-xl leading-relaxed">
              {community.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
            <span className="text-emerald-100/80 font-medium">
              {community.memberCount.toLocaleString()} members
            </span>

            <button onClick={() => toggleJoinCommunity(community.id)} className={`btn btn-sm ${community.joined ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-slate-900 hover:bg-slate-100'}`}>
              {community.joined ? (<>
                  <CheckCircle2 size={13}/>
                  <span>Joined</span>
                </>) : (<>
                  <Plus size={13}/>
                  <span>Join</span>
                </>)}
            </button>
          </div>
        </div>

        <div className="flex gap-5 border-b border-[#e3e8ef] bg-white px-4 sm:px-6 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'announcements', label: 'Announcements', count: communityAnnouncements.length },
            { id: 'members', label: 'Members', count: communityMembers.length },
            { id: 'discussion', label: 'Forum', count: discussionPosts.length },
            { id: 'groups', label: 'Groups', count: communityGroups.length },
        ].map(t => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`tab-underline shrink-0 text-[13px] ${activeTab === t.id ? 'is-active' : ''}`}>
              <span>{t.label}</span>
              {typeof t.count === 'number' && (<span className="text-xs text-slate-400">({t.count})</span>)}
            </button>))}
        </div>

        <div className="modal-body p-4 sm:p-6 text-left bg-[#fafbfc]">
          {activeTab === 'overview' && (<div className="space-y-4">
              <div className="card p-4">
                <h4 className="eyebrow mb-2">About this community</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {community.description}
                </p>
                <div className="mt-3 pt-3 border-t border-[#eef2f6] text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                  <div><span className="font-semibold text-slate-700">Type:</span> {community.type}</div>
                  <div><span className="font-semibold text-slate-700">Access:</span> Affiliated scholars</div>
                  <div><span className="font-semibold text-slate-700">Moderation:</span> Academic facilitator</div>
                </div>
              </div>

              {communityAnnouncements.length > 0 && (<div>
                  <h4 className="eyebrow mb-2">Recent announcement</h4>
                  <AnnouncementCard announcement={communityAnnouncements[0]} compact/>
                </div>)}
            </div>)}

          {activeTab === 'announcements' && (<div className="space-y-3">
              {communityAnnouncements.length === 0 ? (<EmptyTab>No announcements for this community yet.</EmptyTab>) : (communityAnnouncements.map(ann => (<AnnouncementCard key={ann.id} announcement={ann}/>)))}
            </div>)}

          {activeTab === 'members' && (<div>
              <div className="mb-3 text-[13px] text-slate-500">
                Students affiliated with <strong className="text-slate-700">{community.name}</strong>.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {communityMembers.map(member => (<StudentCard key={member.id} student={member} compact/>))}
              </div>
            </div>)}

          {activeTab === 'discussion' && (<div className="space-y-4">
              <form onSubmit={handleSendDiscussion} className="card p-3.5">
                <textarea rows={2} placeholder={`Share an update in ${community.name}…`} value={postText} onChange={e => setPostText(e.target.value)} className="input"/>
                <div className="flex justify-between items-center mt-2.5 gap-2">
                  <span className="text-[11px] text-slate-400 truncate">
                    Posting as {currentUser.name}
                  </span>
                  <button type="submit" disabled={!postText.trim()} className="btn btn-sm btn-primary shrink-0">
                    <Send size={12}/>
                    <span>Post</span>
                  </button>
                </div>
              </form>

              <div className="space-y-2.5">
                {discussionPosts.map(post => (<div key={post.id} className="card p-3.5 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-full object-cover border border-[#e3e8ef] shrink-0"/>
                        <div className="min-w-0 truncate">
                          <span className="text-xs font-semibold text-slate-900 mr-2">{post.author}</span>
                          <span className="text-[11px] text-slate-400">{post.subtitle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{post.timestamp}</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-relaxed pl-9 mt-1.5">
                      {post.text}
                    </p>
                  </div>))}
              </div>
            </div>)}

          {activeTab === 'groups' && (<div className="space-y-3">
              {communityGroups.length === 0 ? (<EmptyTab>No peer groups attached under this community yet.</EmptyTab>) : (communityGroups.map(grp => (<div key={grp.id} onClick={() => openModal('group', grp.id)} className="card card-hover p-4 cursor-pointer text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="chip chip-brand">{grp.category}</span>
                      <span className="text-xs text-slate-400">{grp.memberCount} members</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mt-2">{grp.name}</h4>
                    <p className="text-[13px] text-slate-500 mt-1 line-clamp-2">{grp.description}</p>
                  </div>)))}
            </div>)}
        </div>

        <div className="px-4 sm:px-6 py-3 bg-white border-t border-[#e3e8ef] flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-400">NOUN community hub</span>
          <button onClick={closeModal} className="btn btn-sm btn-secondary">Close</button>
        </div>
      </div>
    </div>);
};
