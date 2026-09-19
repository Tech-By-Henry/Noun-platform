import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ChevronLeft, Users } from 'lucide-react';
import sendIcon from '../assets/icons/send.svg';
import chatIcon from '../assets/icons/chat.svg';

export const MessagesView = () => {
    const { chatThreads, messages, activeChatId, setActiveChatId, sendMessage, openModal } = useApp();
    const [inputText, setInputText] = useState('');
    const [threadSearch, setThreadSearch] = useState('');
    const [attachHint, setAttachHint] = useState(false);
    const attachTimer = useRef(null);
    const scrollRef = useRef(null);

    const filteredThreads = chatThreads.filter(
        (t) =>
            t.name.toLowerCase().includes(threadSearch.toLowerCase()) ||
            t.subtitle.toLowerCase().includes(threadSearch.toLowerCase())
    );
    const currentThread = chatThreads.find((t) => t.id === activeChatId) || chatThreads[0];
    const currentMessages = currentThread ? messages[currentThread.id] || [] : [];
    const inConversation = Boolean(activeChatId);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentMessages.length, currentThread?.id]);

    useEffect(() => () => clearTimeout(attachTimer.current), []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !currentThread) return;
        sendMessage(currentThread.id, inputText);
        setInputText('');
    };

    const handleAttach = () => {
        setAttachHint(true);
        clearTimeout(attachTimer.current);
        attachTimer.current = setTimeout(() => setAttachHint(false), 2600);
    };

    return (
        <div
            className={`text-left animate-fadeIn
        max-md:fixed max-md:left-0 max-md:right-0 max-md:top-0 max-md:z-40 max-md:bg-white max-md:flex max-md:flex-col
        ${inConversation ? 'max-md:bottom-0' : 'max-md:bottom-[calc(56px+env(safe-area-inset-bottom))]'}
        md:relative md:pb-10 md:max-w-5xl md:mx-auto`}
        >
            {/* Desktop page header / mobile inbox title (hidden when in a chat) */}
            <div
                className={`shrink-0 px-4 pt-[max(env(safe-area-inset-top),12px)] pb-3 border-b border-[#e3e8ef] md:border-0 md:px-0 md:pt-0 md:pb-0 md:mb-4 ${
                    inConversation ? 'hidden md:block' : ''
                }`}
            >
                <h1 className="page-title">Messages</h1>
                <p className="page-subtitle hidden md:block">
                    Direct messaging and group discussions with your coursemates.
                </p>
            </div>

            {/* Messaging shell — full screen on mobile, card on desktop */}
            <div
                className={`flex flex-col md:flex-row min-h-0 flex-1
        max-md:bg-white
        md:card md:overflow-hidden md:h-[calc(100dvh-16rem)] md:min-h-[480px] md:max-h-[760px]`}
            >
                {/* Threads list */}
                <div
                    className={`w-full md:w-80 lg:w-96 md:border-r border-[#e3e8ef] flex-col shrink-0 min-h-0 ${
                        inConversation ? 'hidden md:flex' : 'flex flex-1'
                    }`}
                >
                    <div className="p-3 border-b border-[#eef2f6] shrink-0">
                        <div className="relative">
                            <Search
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search conversations…"
                                value={threadSearch}
                                onChange={(e) => setThreadSearch(e.target.value)}
                                className="w-full h-10 pl-9.5 pr-3 rounded-full bg-[#f2f4f7] border-0 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 min-h-0 md:pb-0">
                        {filteredThreads.length === 0 ? (
                            <div className="text-center py-12 px-6 text-[13px] text-slate-500">
                                No conversations match your search.
                            </div>
                        ) : (
                            filteredThreads.map((thread) => {
                                const isSelected = currentThread?.id === thread.id;
                                return (
                                    <button
                                        key={thread.id}
                                        onClick={() => setActiveChatId(thread.id)}
                                        className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors cursor-pointer border-l-2 ${
                                            isSelected
                                                ? 'bg-emerald-50/60 border-emerald-700'
                                                : 'border-transparent hover:bg-[#f8fafc]'
                                        }`}
                                    >
                                        <div className="relative shrink-0">
                                            {thread.isGroup ? (
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                                                    <Users size={17} />
                                                </div>
                                            ) : (
                                                <img
                                                    src={thread.avatar}
                                                    alt={thread.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-[#e3e8ef]"
                                                />
                                            )}
                                            {thread.isOnline && (
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-semibold text-[13px] text-slate-900 truncate">
                                                    {thread.name}
                                                </h4>
                                                <span className="text-[11px] text-slate-400 shrink-0">
                                                    {thread.lastMessageTime}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                                {thread.subtitle}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs text-slate-600 truncate">
                                                    {thread.lastMessage}
                                                </p>
                                                {thread.unreadCount > 0 && (
                                                    <span className="ml-2 min-w-4.5 h-4.5 px-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                                        {thread.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Active chat — full screen on mobile */}
                <div
                    className={`flex-1 min-w-0 flex-col bg-[#fafbfc] min-h-0 ${
                        inConversation ? 'flex' : 'hidden md:flex'
                    }`}
                >
                    {currentThread ? (
                        <>
                            <div className="px-3 sm:px-4 py-3 border-b border-[#e3e8ef] bg-white flex items-center justify-between gap-2 shrink-0 pt-[max(env(safe-area-inset-top),12px)] md:pt-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <button
                                        onClick={() => setActiveChatId(null)}
                                        className="md:hidden p-1.5 -ml-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-[#eef2f6] cursor-pointer"
                                        aria-label="Back to conversations"
                                    >
                                        <ChevronLeft size={22} />
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
                                                className="w-9 h-9 rounded-full object-cover border border-[#e3e8ef]"
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm text-slate-900 truncate">
                                            {currentThread.name}
                                        </h3>
                                        <p className="text-[11px] text-slate-500 truncate">
                                            {currentThread.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {currentThread.participantId && (
                                    <button
                                        onClick={() =>
                                            openModal('student', currentThread.participantId)
                                        }
                                        className="btn btn-sm btn-ghost shrink-0"
                                    >
                                        Profile
                                    </button>
                                )}
                            </div>

                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
                            >
                                {currentMessages.length === 0 ? (
                                    <div className="text-center py-20 text-slate-400 text-[13px]">
                                        Start of this conversation.
                                    </div>
                                ) : (
                                    currentMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex gap-2.5 max-w-[85%] sm:max-w-md ${
                                                msg.isMine
                                                    ? 'ml-auto flex-row-reverse'
                                                    : 'mr-auto'
                                            }`}
                                        >
                                            <img
                                                src={msg.senderAvatar}
                                                alt={msg.senderName}
                                                className="w-7 h-7 rounded-full object-cover border border-[#e3e8ef] shrink-0 mt-0.5"
                                            />
                                            <div
                                                className={`min-w-0 ${
                                                    msg.isMine ? 'text-right' : 'text-left'
                                                }`}
                                            >
                                                <div
                                                    className={`flex items-center gap-1.5 mb-1 ${
                                                        msg.isMine ? 'justify-end' : ''
                                                    }`}
                                                >
                                                    <span className="text-[11px] font-semibold text-slate-700">
                                                        {msg.senderName}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {msg.timestamp}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`inline-block px-4 py-2.5 text-[13px] leading-relaxed text-left break-words max-w-full ${
                                                        msg.isMine
                                                            ? 'bg-emerald-800 text-white rounded-2xl rounded-tr-sm'
                                                            : 'bg-white border border-[#e3e8ef] text-slate-800 rounded-2xl rounded-tl-sm'
                                                    }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="bg-white border-t border-[#e3e8ef] shrink-0 pb-[max(env(safe-area-inset-bottom),8px)]">
                                {attachHint && (
                                    <div className="px-4 pt-2.5 text-xs text-slate-500 animate-fadeIn">
                                        Attachments aren’t available in this prototype yet.
                                    </div>
                                )}
                                <form
                                    onSubmit={handleSend}
                                    className="p-3 flex items-center gap-2"
                                >
                                    <button
                                        type="button"
                                        onClick={handleAttach}
                                        className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-[#eef2f6] cursor-pointer transition-colors"
                                        title="Attach a document"
                                        aria-label="Attach"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                        </svg>
                                    </button>

                                    <input
                                        type="text"
                                        placeholder="Type a message…"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        className="flex-1 min-w-0 h-10 px-4 rounded-full bg-[#f2f4f7] border-0 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                                    />

                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="w-10 h-10 shrink-0 rounded-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                                        title="Send message"
                                        aria-label="Send"
                                    >
                                        <img
                                            src={sendIcon}
                                            alt=""
                                            className="w-[18px] h-[18px] brightness-0 invert"
                                        />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <div className="w-14 h-14 rounded-full bg-[#eef2f6] flex items-center justify-center mb-3">
                                <img src={chatIcon} alt="" className="w-7 h-7 opacity-50" />
                            </div>
                            <h4 className="text-sm font-semibold text-slate-800">
                                Select a conversation
                            </h4>
                            <p className="text-[13px] text-slate-500 max-w-xs mt-1">
                                Choose a coursemate or study group to review messages and
                                collaborate.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
