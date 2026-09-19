export type ScopeType =
  | 'NATIONAL'
  | 'STATE'
  | 'STUDY_CENTRE'
  | 'FACULTY'
  | 'DEPARTMENT'
  | 'PROGRAMME'
  | 'LEVEL'
  | 'GROUP';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  matricNo?: string;
  state: string;
  studyCentreId: string;
  studyCentreName: string;
  faculty: string;
  department: string;
  programme: string;
  level: string; // e.g., '100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'PGD', 'M.Sc.', 'Ph.D.'
  bio: string;
  interests: string[];
  skills: string[];
  isOnline?: boolean;
  joinedDate?: string;
}

export interface StudyCentre {
  id: string;
  name: string;
  state: string;
  city: string;
  code: string;
  address: string;
  coordinator: string;
  contactEmail: string;
  phone: string;
  studentCount: number;
  activeGroupsCount: number;
  announcementsCount: number;
  established: string;
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  scope: ScopeType;
  scopeTarget: string; // e.g. "Nigeria (All Students)", "Lagos State", "Lagos Study Centre — Victoria Island", "Faculty of Computing", "Dept. of Computer Science", "B.Sc. Computer Science", "200 Level"
  publishingAuthority: string; // e.g. "Directorate of Academic Planning", "Centre Director Office - VI", "Head of Department, Computer Science"
  authorityRole: string; // e.g. "Official University Notice", "Centre Directorate", "Academic Department"
  date: string; // e.g. "Sep 18, 2026"
  timestamp: string;
  isPinned?: boolean;
  isOfficial: boolean;
  attachments?: {
    name: string;
    size: string;
    type: 'pdf' | 'doc' | 'schedule';
  }[];
  relatedEventId?: string;
  read?: boolean;
  bookmarked?: boolean;
  commentCount: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualPlatform?: string;
  scope: ScopeType;
  scopeTarget: string;
  organizer: string;
  description: string;
  attendeesCount: number;
  isAttending?: boolean;
}

export interface Community {
  id: string;
  name: string;
  type: 'STATE' | 'CENTRE' | 'FACULTY' | 'DEPARTMENT' | 'PROGRAMME' | 'LEVEL' | 'INTEREST';
  scope: ScopeType;
  description: string;
  memberCount: number;
  category: string;
  isOfficial: boolean;
  joined: boolean;
  state?: string;
  centreId?: string;
  faculty?: string;
  department?: string;
  programme?: string;
  level?: string;
}

export interface GroupItem {
  id: string;
  name: string;
  communityId?: string;
  description: string;
  memberCount: number;
  category: 'Study Group' | 'Project Team' | 'Course Circle' | 'Special Interest' | 'Centre Committee';
  recentActivity: string;
  isMember: boolean;
  leader: string;
  meetingSchedule?: string;
  studyCentreName?: string;
  department?: string;
  level?: string;
}

export interface MessageItem {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMine: boolean;
  attachmentName?: string;
}

export interface ChatThread {
  id: string;
  isGroup: boolean;
  name: string;
  avatar: string;
  subtitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participantId?: string;
  groupId?: string;
  isOnline?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'OFFICIAL' | 'MESSAGE' | 'COMMUNITY' | 'EVENT';
  unread: boolean;
  targetType?: 'announcement' | 'message' | 'event' | 'community' | 'group' | 'student';
  targetId?: string;
}

export interface CommentItem {
  id: string;
  targetId: string;
  authorName: string;
  authorAvatar: string;
  authorSubtitle: string;
  text: string;
  timestamp: string;
  likes: number;
}
