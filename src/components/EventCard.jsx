import React from 'react';
import { ScopeBadge } from './ScopeBadge';
import { Calendar, Clock, MapPin, Video, CheckCircle2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
export const EventCard = ({ event, compact = false }) => {
    const { toggleEventAttendance } = useApp();
    return (<div className={`card card-hover flex flex-col justify-between text-left ${compact ? 'p-4' : 'p-4 sm:p-5'}`}>
      <div>
        {/* Scope + format */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <ScopeBadge scope={event.scope} label={event.scopeTarget}/>
          {event.isVirtual ? (<span className="chip chip-neutral">
              <Video size={11}/> Virtual
            </span>) : (<span className="chip chip-neutral">
              <MapPin size={11}/> In-person
            </span>)}
        </div>

        {/* Title */}
        <h4 className="font-semibold text-slate-900 text-sm sm:text-[15px] leading-snug mb-2 line-clamp-2">
          {event.title}
        </h4>

        {/* Date, time, location */}
        <div className="space-y-1.5 text-[13px] mb-2">
          <div className="flex items-center gap-2 font-medium text-emerald-800">
            <Calendar size={13} className="shrink-0"/>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={13} className="shrink-0 text-slate-400"/>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 min-w-0">
            <MapPin size={13} className="shrink-0 text-slate-400"/>
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Description */}
        {!compact && (<p className="text-[13px] text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {event.description}
          </p>)}
      </div>

      {/* Footer */}
      <div className="mt-2 pt-3 border-t border-[#eef2f6] flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500">
          {event.attendeesCount} going
        </span>

        <button onClick={() => toggleEventAttendance(event.id)} className={`btn btn-sm ${event.isAttending ? 'btn-primary' : 'btn-secondary'}`}>
          {event.isAttending ? (<>
              <CheckCircle2 size={13}/>
              <span>Attending</span>
            </>) : (<>
              <Plus size={13}/>
              <span>Attend</span>
            </>)}
        </button>
      </div>
    </div>);
};
