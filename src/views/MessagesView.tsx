import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Smile,
  ChevronLeft,
  Users,
  CheckCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const {
    chatThreads,
    messages,
    activeChatId,
    setActiveChatId,
    sendMessage,
    currentUser,
    students,
    openModal,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [threadSearch, setThreadSearch] = useState('');

  const filteredThreads = chatThreads.filter(t =>
    t.name.toLowerCase().includes(threadSearch.toLowerCase()) ||
    t.subtitle.toLowerCase().includes(threadSearch.toLowerCase())
  );

  const currentThread = chatThreads.find(t => t.id === activeChatId) || chatThreads[0];
  const currentMessages = currentThread ? messages[currentThread.id] || [] : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentThread) return;
    sendMessage(currentThread.id, inputText);
    setInputText('');
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto text-left animate-fadeIn">
      {/* Messages Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare size={20} className="text-emerald-800" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Peer Communication & Coordination
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Direct messaging and group discussions to support your academic coursework.
        </p>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[72vh] min-h-[500px]">
        {/* THREADS LIST (Visible on desktop or when no chat is active on mobile) */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col shrink-0 ${
            activeChatId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={threadSearch}
                onChange={e => setThreadSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Threads Scrollable */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredThreads.map(thread => {
              const isSelected = currentThread?.id === thread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveChatId(thread.id)}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    {thread.isGroup ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        <Users size={18} />
                      </div>
                    ) : (
                      <img
                        src={thread.avatar}
                        alt={thread.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    )}
                    {thread.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {thread.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {thread.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate mb-1">
                      {thread.subtitle}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-600 truncate line-clamp-1">
                        {thread.lastMessage}
                      </p>
                      {thread.unreadCount > 0 && (
                        <span className="ml-2 w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE CHAT SCREEN */}
        <div
          className={`flex-1 flex flex-col bg-slate-50/30 ${
            activeChatId ? 'flex' : 'hidden md:flex'
          }`}
        >
          {currentThread ? (
            <>
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setActiveChatId(null)}
                    className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="relative shrink-0">
                    {currentThread.isGroup ? (
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Users size={16} />
                      </div>
                    ) : (
                      <img
                        src={currentThread.avatar}
                        alt={currentThread.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {currentThread.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {currentThread.subtitle}
                    </p>
                  </div>
                </div>

                {/* Inspect participant profile if direct chat */}
                {currentThread.participantId && (
                  <button
                    onClick={() => openModal('student', currentThread.participantId)}
                    className="text-xs font-semibold text-emerald-700 hover:underline px-2 py-1 cursor-pointer shrink-0"
                  >
                    View Coordinates
                  </button>
                )}
              </div>

              {/* Chat Message Bubbles */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {currentMessages.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 text-xs">
                    Start of this academic conversation thread.
                  </div>
                ) : (
                  currentMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 max-w-sm sm:max-w-md ${
                        msg.isMine ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'
                      }`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-bold text-slate-800">
                            {msg.senderName}
                          </span>
                          <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
                        </div>
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.isMine
                              ? 'bg-emerald-700 text-white rounded-tr-xs shadow-2xs'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Composer */}
              <form
                onSubmit={handleSend}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => alert('Attachment simulation: Select lecture note or assignment snippet.')}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  title="Attach academic note or document"
                >
                  <Paperclip size={18} />
                </button>

                <input
                  type="text"
                  placeholder="Type an academic message or question..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
                  title="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <MessageSquare size={36} className="text-slate-300 mb-2" />
              <h4 className="text-sm font-bold text-slate-700">Select a Conversation</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Choose a coursemate or study group on the left to review messages and collaborate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
