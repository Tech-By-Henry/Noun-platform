import React from 'react';
import { EventItem } from '../types';
import { ScopeBadge } from './ScopeBadge';
import { Calendar, Clock, MapPin, Video, CheckCircle2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EventCardProps {
  event: EventItem;
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const { toggleEventAttendance } = useApp();

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all duration-150 p-4 shadow-2xs flex flex-col justify-between ${
        compact ? 'p-3.5' : 'p-4'
      }`}
    >
      <div>
        {/* Top: ScopeBadge and format (Virtual / Physical) */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <ScopeBadge scope={event.scope} label={event.scopeTarget} />
          {event.isVirtual ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              <Video size={11} /> Virtual
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              <MapPin size={11} /> In-Person
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-1.5 line-clamp-2">
          {event.title}
        </h4>

        {/* Date & Time */}
        <div className="space-y-1 text-xs text-slate-600 mb-2">
          <div className="flex items-center gap-1.5 font-medium text-emerald-800">
            <Calendar size={13} className="shrink-0 text-emerald-700" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock size={13} className="shrink-0 text-slate-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 truncate">
            <MapPin size={13} className="shrink-0 text-slate-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-xs text-slate-600 line-clamp-2 mb-3">
            {event.description}
          </p>
        )}
      </div>

      {/* Action: Attendees and RSVP */}
      <div className="mt-2 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          {event.attendeesCount} {event.attendeesCount === 1 ? 'student' : 'students'} going
        </span>

        <button
          onClick={() => toggleEventAttendance(event.id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all duration-150 cursor-pointer ${
            event.isAttending
              ? 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {event.isAttending ? (
            <>
              <CheckCircle2 size={13} />
              <span>Attending</span>
            </>
          ) : (
            <>
              <Plus size={13} />
              <span>Attend</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
