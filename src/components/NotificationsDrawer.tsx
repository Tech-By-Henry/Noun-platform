import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  ShieldCheck,
  MessageSquare,
  Users,
  Calendar,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const {
    modal,
    closeModal,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    openModal,
    setActiveTab,
    setActiveChatId,
  } = useApp();

  const [filter, setFilter] = useState<'ALL' | 'OFFICIAL' | 'MESSAGE' | 'COMMUNITY'>('ALL');

  if (modal.type !== 'notifications') return null;

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'ALL') return true;
    return n.type === filter;
  });

  const handleNotificationClick = (item: (typeof notifications)[0]) => {
    markNotificationRead(item.id);
    closeModal();

    if (item.targetType === 'announcement' && item.targetId) {
      openModal('announcement', item.targetId);
    } else if (item.targetType === 'message' && item.targetId) {
      setActiveChatId(item.targetId);
      setActiveTab('messages');
    } else if (item.targetType === 'group' && item.targetId) {
      openModal('group', item.targetId);
    } else if (item.targetType === 'community' && item.targetId) {
      openModal('community', item.targetId);
    }
  };

  const getTypeIcon = (type: (typeof notifications)[0]['type']) => {
    switch (type) {
      case 'OFFICIAL':
        return <ShieldCheck size={14} className="text-emerald-700" />;
      case 'MESSAGE':
        return <MessageSquare size={14} className="text-blue-600" />;
      case 'COMMUNITY':
        return <Users size={14} className="text-purple-600" />;
      case 'EVENT':
        return <Calendar size={14} className="text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-emerald-800" />
            <h3 className="font-bold text-slate-900 text-base">Notifications</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-emerald-800 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
              title="Mark all as read"
            >
              <CheckCheck size={14} />
              <span>Mark all read</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 p-3 border-b border-slate-200 bg-white shrink-0 overflow-x-auto text-xs font-semibold no-scrollbar">
          {[
            { id: 'ALL', label: 'All Alerts' },
            { id: 'OFFICIAL', label: 'Official Notices' },
            { id: 'MESSAGE', label: 'Messages' },
            { id: 'COMMUNITY', label: 'Communities' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto flex-1 p-3 space-y-2 text-left">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No notifications under this category.
            </div>
          ) : (
            filteredNotifs.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                  n.unread
                    ? 'bg-emerald-50/30 border-emerald-200/80 shadow-2xs hover:border-emerald-400'
                    : 'bg-white border-slate-200/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-slate-100">{getTypeIcon(n.type)}</span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">
                      {n.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 pl-6">{n.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
