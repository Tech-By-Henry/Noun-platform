import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Send, CheckCircle2, Plus, Shield, } from 'lucide-react';
export const GroupModal = () => {
    const { modal, closeModal, groups, toggleJoinGroup, currentUser } = useApp();
    const [groupMessages, setGroupMessages] = useState([
        {
            id: 'gm-1',
            sender: 'Amaka Williams',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
            text: 'Good day colleagues! For the weekend session, please remember to clone the starter project repository.',
            time: 'Yesterday 4:00 PM',
            isMe: false,
        },
        {
            id: 'gm-2',
            sender: 'Daniel Okoro',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            text: 'I have compiled the practice questions for the polymorphism chapter into a shared doc.',
            time: 'Today 8:45 AM',
            isMe: false,
        },
    ]);
    const [inputText, setInputText] = useState('');
    if (modal.type !== 'group' || !modal.id)
        return null;
    const group = groups.find(g => g.id === modal.id);
    if (!group)
        return null;
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim())
            return;
        setGroupMessages(prev => [
            ...prev,
            {
                id: `gm-${Date.now()}`,
                sender: currentUser.name,
                avatar: currentUser.avatar,
                text: inputText.trim(),
                time: 'Just now',
                isMe: true,
            },
        ]);
        setInputText('');
    };
    return (<div className="modal-overlay animate-fadeIn">
      <div className="modal-panel max-w-2xl">
        <div className="p-4 sm:p-5 border-b border-[#e3e8ef] bg-[#f8fafc] flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="chip chip-brand">{group.category}</span>
              <span className="text-xs text-slate-500">
                {group.memberCount} members
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {group.name}
            </h2>
            <p className="text-[13px] text-slate-500 mt-1 max-w-lg leading-relaxed">
              {group.description}
            </p>
          </div>

          <button onClick={closeModal} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-[#eef2f6] cursor-pointer shrink-0" aria-label="Close">
            <X size={18}/>
          </button>
        </div>

        <div className="px-4 sm:px-5 py-2.5 bg-white border-b border-[#e3e8ef] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-3 flex-wrap min-w-0">
            <span className="flex items-center gap-1.5 font-medium">
              <Shield size={13} className="text-emerald-700 shrink-0"/>
              Lead: <strong className="text-slate-800">{group.leader}</strong>
            </span>
            {group.meetingSchedule && (<span className="flex items-center gap-1.5 text-slate-500">
                <Clock size={13} className="text-slate-400 shrink-0"/>
                {group.meetingSchedule}
              </span>)}
          </div>

          <button onClick={() => toggleJoinGroup(group.id)} className={`btn btn-sm ${group.isMember ? 'btn-primary' : 'btn-secondary'}`}>
            {group.isMember ? (<>
                <CheckCircle2 size={12}/>
                <span>Joined</span>
              </>) : (<>
                <Plus size={12}/>
                <span>Join group</span>
              </>)}
          </button>
        </div>

        <div className="modal-body p-4 space-y-3 text-left bg-[#fafbfc]">
          <div className="px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 text-center">
            Recent activity: {group.recentActivity}
          </div>

          {groupMessages.map(msg => (<div key={msg.id} className={`flex gap-2.5 max-w-[85%] sm:max-w-md ${msg.isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              <img src={msg.avatar} alt={msg.sender} className="w-7 h-7 rounded-full object-cover border border-[#e3e8ef] shrink-0 mt-0.5"/>
              <div className={`min-w-0 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-1.5 mb-1 ${msg.isMe ? 'justify-end' : ''}`}>
                  <span className="text-[11px] font-semibold text-slate-700">
                    {msg.sender}
                  </span>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <div className={`inline-block px-4 py-2.5 text-[13px] leading-relaxed text-left break-words max-w-full ${msg.isMe
                ? 'bg-emerald-800 text-white rounded-2xl rounded-tr-sm'
                : 'bg-white border border-[#e3e8ef] text-slate-800 rounded-2xl rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            </div>))}
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#e3e8ef] flex items-center gap-2 shrink-0">
          <input type="text" placeholder={group.isMember
            ? 'Type a message to the group…'
            : 'Join this group to post…'} disabled={!group.isMember} value={inputText} onChange={e => setInputText(e.target.value)} className="flex-1 min-w-0 h-10 px-4 rounded-full bg-[#f2f4f7] border-0 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 disabled:opacity-60"/>
          <button type="submit" disabled={!group.isMember || !inputText.trim()} className="w-10 h-10 shrink-0 rounded-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer">
            <Send size={15}/>
          </button>
        </form>
      </div>
    </div>);
};
