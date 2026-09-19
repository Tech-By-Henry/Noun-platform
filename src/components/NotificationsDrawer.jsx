import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, ShieldCheck, MessageSquare, Users, Calendar, CheckCheck, } from 'lucide-react';
export const NotificationsDrawer = () => {
    const { modal, closeModal, notifications, markNotificationRead, markAllNotificationsRead, openModal, setActiveTab, setActiveChatId, } = useApp();
    const [filter, setFilter] = useState('ALL');
    if (modal.type !== 'notifications')
        return null;
    const filteredNotifs = notifications.filter(n => {
        if (filter === 'ALL')
            return true;
        return n.type === filter;
    });
    const handleNotificationClick = (item) => {
        markNotificationRead(item.id);
        closeModal();
        if (item.targetType === 'announcement' && item.targetId) {
            openModal('announcement', item.targetId);
        }
        else if (item.targetType === 'message' && item.targetId) {
            setActiveChatId(item.targetId);
            setActiveTab('messages');
        }
        else if (item.targetType === 'group' && item.targetId) {
            openModal('group', item.targetId);
        }
        else if (item.targetType === 'community' && item.targetId) {
            openModal('community', item.targetId);
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'OFFICIAL':
                return <ShieldCheck size={14} className="text-emerald-700"/>;
            case 'MESSAGE':
                return <MessageSquare size={14} className="text-sky-600"/>;
            case 'COMMUNITY':
                return <Users size={14} className="text-violet-600"/>;
            case 'EVENT':
                return <Calendar size={14} className="text-amber-600"/>;
            default:
                return <Bell size={14} className="text-slate-500"/>;
        }
    };
    return (<div className="modal-overlay modal-overlay--end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full max-h-none shadow-2xl flex flex-col border-l border-[#e3e8ef] rounded-none">
        <div className="p-4 border-b border-[#e3e8ef] flex items-center justify-between gap-2 shrink-0 bg-[#f8fafc]">
          <div className="flex items-center gap-2 min-w-0">
            <Bell size={17} className="text-emerald-800 shrink-0"/>
            <h3 className="font-bold text-slate-900 text-base">Notifications</h3>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={markAllNotificationsRead} className="text-xs text-emerald-800 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full hover:bg-emerald-50" title="Mark all as read">
              <CheckCheck size={14}/>
              <span className="hidden xs:inline">Mark all read</span>
            </button>
            <button onClick={closeModal} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-[#eef2f6] cursor-pointer" aria-label="Close">
              <X size={18}/>
            </button>
          </div>
        </div>

        <div className="flex gap-2 p-3 border-b border-[#e3e8ef] bg-white shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'OFFICIAL', label: 'Official' },
            { id: 'MESSAGE', label: 'Messages' },
            { id: 'COMMUNITY', label: 'Communities' },
        ].map(f => (<button key={f.id} onClick={() => setFilter(f.id)} className={`pill-tab shrink-0 ${filter === f.id ? 'is-active' : ''}`}>
              {f.label}
            </button>))}
        </div>

        <div className="modal-body p-3 space-y-2 text-left bg-[#fafbfc]">
          {filteredNotifs.length === 0 ? (<div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-[#eef2f6] flex items-center justify-center mx-auto mb-3">
                <Bell size={18} className="text-slate-400"/>
              </div>
              <p className="text-[13px] text-slate-500">No notifications in this category.</p>
            </div>) : (filteredNotifs.map(n => (<div key={n.id} onClick={() => handleNotificationClick(n)} className={`p-3.5 rounded-xl border transition-colors cursor-pointer text-left ${n.unread
                ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                : 'bg-white border-[#e3e8ef] hover:border-[#c6d0dc]'}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-[#eef2f6] flex items-center justify-center shrink-0">{getTypeIcon(n.type)}</span>
                    <span className="text-[13px] font-semibold text-slate-900 line-clamp-1">
                      {n.title}
                    </span>
                    {n.unread && (<span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"/>)}
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-[13px] text-slate-600 line-clamp-2 pl-9 leading-relaxed">{n.body}</p>
              </div>)))}
        </div>
      </div>
    </div>);
};
