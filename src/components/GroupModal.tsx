import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Users,
  Calendar,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  Plus,
  MessageSquare,
  Shield,
  FileText,
} from 'lucide-react';

export const GroupModal: React.FC = () => {
  const { modal, closeModal, groups, toggleJoinGroup, currentUser, students, setActiveTab, openModal } = useApp();
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

  if (modal.type !== 'group' || !modal.id) return null;

  const group = groups.find(g => g.id === modal.id);
  if (!group) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                {group.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {group.memberCount} Members
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {group.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-lg">
              {group.description}
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Group Meta Strip */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <Shield size={13} className="text-emerald-700" />
              Lead: <strong>{group.leader}</strong>
            </span>
            {group.meetingSchedule && (
              <span className="flex items-center gap-1 text-slate-500">
                <Clock size={13} className="text-slate-400" />
                {group.meetingSchedule}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleJoinGroup(group.id)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 ${
              group.isMember
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {group.isMember ? (
              <>
                <CheckCircle2 size={12} />
                <span>Joined Group</span>
              </>
            ) : (
              <>
                <Plus size={12} />
                <span>Join Group</span>
              </>
            )}
          </button>
        </div>

        {/* Active Group Discussion / Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-left">
          <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 text-center">
            Recent activity: {group.recentActivity}
          </div>

          {groupMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-md ${
                msg.isMe ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'
              }`}
            >
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
              />
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[11px] font-bold text-slate-900">
                    {msg.sender}
                  </span>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.isMe
                      ? 'bg-emerald-700 text-white rounded-tr-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder={
              group.isMember
                ? 'Type message to group members...'
                : 'Join group to post in discussion...'
            }
            disabled={!group.isMember}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
          />
          <button
            type="submit"
            disabled={!group.isMember || !inputText.trim()}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
