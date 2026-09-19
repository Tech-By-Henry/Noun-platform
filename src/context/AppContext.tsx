import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Announcement,
  EventItem,
  Community,
  GroupItem,
  ChatThread,
  MessageItem,
  NotificationItem,
  StudyCentre,
  CommentItem,
} from '../types';
import {
  INITIAL_USER,
  STUDENTS_DIRECTORY,
  STUDY_CENTRES,
  ANNOUNCEMENTS,
  EVENTS,
  COMMUNITIES,
  GROUPS,
  CHAT_THREADS,
  INITIAL_MESSAGES,
  NOTIFICATIONS,
  ANNOUNCEMENT_COMMENTS,
  DEMO_PERSONAS,
} from '../data/mockData';

export type ActiveTab = 'home' | 'updates' | 'explore' | 'communities' | 'messages' | 'profile';

export type ModalState = {
  type: 'announcement' | 'student' | 'centre' | 'community' | 'group' | 'search' | 'notifications' | 'onboarding' | null;
  id?: string;
};

interface AppContextType {
  currentUser: Student;
  updateUserCoordinates: (updates: Partial<Student>) => void;
  switchPersona: (index: number) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // Data items
  students: Student[];
  studyCentres: StudyCentre[];
  announcements: Announcement[];
  events: EventItem[];
  communities: Community[];
  groups: GroupItem[];
  notifications: NotificationItem[];
  chatThreads: ChatThread[];
  messages: Record<string, MessageItem[]>;
  comments: Record<string, CommentItem[]>;
  
  // Modals & Navigation triggers
  modal: ModalState;
  openModal: (type: ModalState['type'], id?: string) => void;
  closeModal: () => void;
  
  // Quick Actions
  toggleBookmarkAnnouncement: (id: string) => void;
  markAnnouncementAsRead: (id: string) => void;
  toggleEventAttendance: (id: string) => void;
  toggleJoinCommunity: (id: string) => void;
  toggleJoinGroup: (id: string) => void;
  createGroup: (newGroup: Omit<GroupItem, 'id' | 'isMember' | 'memberCount' | 'recentActivity'>) => void;
  addAnnouncementComment: (announcementId: string, text: string) => void;
  
  // Messaging
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (threadId: string, text: string) => void;
  startDirectChatWithStudent: (student: Student) => void;
  
  // Notifications
  unreadNotifCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Helpers
  getSharedCommunitiesCount: (student: Student) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Student>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [modal, setModal] = useState<ModalState>({ type: null });
  
  const [students] = useState<Student[]>(STUDENTS_DIRECTORY);
  const [studyCentres] = useState<StudyCentre[]>(STUDY_CENTRES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [events, setEvents] = useState<EventItem[]>(EVENTS);
  const [communities, setCommunities] = useState<Community[]>(COMMUNITIES);
  const [groups, setGroups] = useState<GroupItem[]>(GROUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(CHAT_THREADS);
  const [messages, setMessages] = useState<Record<string, MessageItem[]>>(INITIAL_MESSAGES);
  const [comments, setComments] = useState<Record<string, CommentItem[]>>(ANNOUNCEMENT_COMMENTS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Recalculate official communities when student details change
  const updateUserCoordinates = (updates: Partial<Student>) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    
    // Automatically keep official communities in sync
    setCommunities(prev => prev.map(c => {
      let isRelevant = false;
      if (c.type === 'STATE' && c.state === updated.state) isRelevant = true;
      if (c.type === 'CENTRE' && c.centreId === updated.studyCentreId) isRelevant = true;
      if (c.type === 'FACULTY' && c.faculty === updated.faculty) isRelevant = true;
      if (c.type === 'DEPARTMENT' && c.department === updated.department) isRelevant = true;
      if (c.type === 'PROGRAMME' && c.programme === updated.programme) isRelevant = true;
      if (c.type === 'LEVEL' && c.level === updated.level) isRelevant = true;
      return {
        ...c,
        joined: isRelevant ? true : c.joined,
      };
    }));
  };

  const switchPersona = (index: number) => {
    const p = DEMO_PERSONAS[index];
    if (!p) return;
    updateUserCoordinates({
      name: p.name.split(' (')[0],
      state: p.state,
      studyCentreId: p.studyCentreId,
      studyCentreName: p.studyCentreName,
      faculty: p.faculty,
      department: p.department,
      programme: p.programme,
      level: p.level,
      avatar: p.avatar,
    });
  };

  const openModal = (type: ModalState['type'], id?: string) => {
    setModal({ type, id });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  const toggleBookmarkAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a => (a.id === id ? { ...a, bookmarked: !a.bookmarked } : a))
    );
  };

  const markAnnouncementAsRead = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a => (a.id === id ? { ...a, read: true } : a))
    );
  };

  const toggleEventAttendance = (id: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              isAttending: !e.isAttending,
              attendeesCount: e.isAttending ? e.attendeesCount - 1 : e.attendeesCount + 1,
            }
          : e
      )
    );
  };

  const toggleJoinCommunity = (id: string) => {
    setCommunities(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              joined: !c.joined,
              memberCount: c.joined ? c.memberCount - 1 : c.memberCount + 1,
            }
          : c
      )
    );
  };

  const toggleJoinGroup = (id: string) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === id
          ? {
              ...g,
              isMember: !g.isMember,
              memberCount: g.isMember ? g.memberCount - 1 : g.memberCount + 1,
            }
          : g
      )
    );
  };

  const createGroup = (newGroup: Omit<GroupItem, 'id' | 'isMember' | 'memberCount' | 'recentActivity'>) => {
    const id = `grp-${Date.now()}`;
    const group: GroupItem = {
      ...newGroup,
      id,
      isMember: true,
      memberCount: 1,
      recentActivity: 'Group initiated just now by ' + currentUser.name,
    };
    setGroups(prev => [group, ...prev]);
  };

  const addAnnouncementComment = (announcementId: string, text: string) => {
    if (!text.trim()) return;
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      targetId: announcementId,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorSubtitle: `${currentUser.programme} • ${currentUser.level}`,
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0,
    };

    setComments(prev => ({
      ...prev,
      [announcementId]: [...(prev[announcementId] || []), newComment],
    }));

    setAnnouncements(prev =>
      prev.map(a =>
        a.id === announcementId ? { ...a, commentCount: a.commentCount + 1 } : a
      )
    );
  };

  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    const msg: MessageItem = {
      id: `m-${Date.now()}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Just now',
      isMine: true,
    };

    setMessages(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), msg],
    }));

    // Update last message in thread
    setChatThreads(prev =>
      prev.map(t =>
        t.id === threadId
          ? { ...t, lastMessage: text.trim(), lastMessageTime: 'Just now' }
          : t
      )
    );

    // If it is a direct chat with Amaka, simulate an organic peer reply after 1.5s
    if (threadId === 'th-amaka') {
      setTimeout(() => {
        const replyMsg: MessageItem = {
          id: `m-${Date.now() + 1}`,
          threadId: 'th-amaka',
          senderId: 'stu-amaka',
          senderName: 'Amaka Williams',
          senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
          text: 'Great to hear! I will save a desk in the lab front row so we can go over the code together.',
          timestamp: 'Just now',
          isMine: false,
        };
        setMessages(p => ({
          ...p,
          'th-amaka': [...(p['th-amaka'] || []), replyMsg],
        }));
        setChatThreads(p =>
          p.map(t =>
            t.id === 'th-amaka'
              ? { ...t, lastMessage: replyMsg.text, lastMessageTime: 'Just now' }
              : t
          )
        );
      }, 1500);
    }
  };

  const startDirectChatWithStudent = (student: Student) => {
    // Check if thread already exists
    let existingThread = chatThreads.find(
      t => !t.isGroup && t.participantId === student.id
    );

    if (!existingThread) {
      const newThreadId = `th-${student.id}`;
      const newThread: ChatThread = {
        id: newThreadId,
        isGroup: false,
        name: student.name,
        avatar: student.avatar,
        subtitle: `${student.programme} • ${student.level} • ${student.studyCentreName.replace('Lagos Study Centre — ', '')}`,
        lastMessage: 'Direct conversation started.',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        participantId: student.id,
        isOnline: student.isOnline,
      };

      setChatThreads(prev => [newThread, ...prev]);
      setActiveChatId(newThreadId);
    } else {
      setActiveChatId(existingThread.id);
    }

    // Close student modal if open and jump to messages
    closeModal();
    setActiveTab('messages');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadNotifCount = notifications.filter(n => n.unread).length;

  const getSharedCommunitiesCount = (student: Student): number => {
    let count = 0;
    if (student.state === currentUser.state) count++;
    if (student.studyCentreId === currentUser.studyCentreId) count++;
    if (student.faculty === currentUser.faculty) count++;
    if (student.department === currentUser.department) count++;
    if (student.programme === currentUser.programme) count++;
    if (student.level === currentUser.level) count++;
    return count;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateUserCoordinates,
        switchPersona,
        activeTab,
        setActiveTab,
        students,
        studyCentres,
        announcements,
        events,
        communities,
        groups,
        notifications,
        chatThreads,
        messages,
        comments,
        modal,
        openModal,
        closeModal,
        toggleBookmarkAnnouncement,
        markAnnouncementAsRead,
        toggleEventAttendance,
        toggleJoinCommunity,
        toggleJoinGroup,
        createGroup,
        addAnnouncementComment,
        activeChatId,
        setActiveChatId,
        sendMessage,
        startDirectChatWithStudent,
        unreadNotifCount,
        markNotificationRead,
        markAllNotificationsRead,
        getSharedCommunitiesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
