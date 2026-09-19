import React from 'react';
import { Globe, MapPin, Building2, Landmark, BookOpen, GraduationCap, Layers, Users } from 'lucide-react';
export const ScopeBadge = ({ scope, label, size = 'sm', showIcon = true, }) => {
    const getBadgeConfig = () => {
        switch (scope) {
            case 'NATIONAL':
                return { bg: 'bg-emerald-50 text-emerald-800', icon: Globe, defaultLabel: 'National' };
            case 'STATE':
                return { bg: 'bg-emerald-50 text-emerald-800', icon: MapPin, defaultLabel: 'State' };
            case 'STUDY_CENTRE':
                return { bg: 'bg-sky-50 text-sky-800', icon: Building2, defaultLabel: 'Study Centre' };
            case 'FACULTY':
                return { bg: 'bg-violet-50 text-violet-800', icon: Landmark, defaultLabel: 'Faculty' };
            case 'DEPARTMENT':
                return { bg: 'bg-violet-50 text-violet-800', icon: BookOpen, defaultLabel: 'Department' };
            case 'PROGRAMME':
                return { bg: 'bg-violet-50 text-violet-800', icon: GraduationCap, defaultLabel: 'Programme' };
            case 'LEVEL':
                return { bg: 'bg-amber-50 text-amber-800', icon: Layers, defaultLabel: 'Level' };
            case 'GROUP':
            default:
                return { bg: 'bg-slate-100 text-slate-600', icon: Users, defaultLabel: 'Peer Group' };
        }
    };
    const config = getBadgeConfig();
    const Icon = config.icon;
    const sizeClasses = {
        sm: 'text-[11px] h-[22px] px-2.5 gap-1 font-medium',
        md: 'text-xs h-6 px-3 gap-1.5 font-medium',
        lg: 'text-[13px] h-7 px-3.5 gap-1.5 font-medium',
    }[size];
    const iconSizes = { sm: 11, md: 13, lg: 14 }[size];
    return (<span className={`inline-flex items-center rounded-full whitespace-nowrap max-w-full ${config.bg} ${sizeClasses}`}>
      {showIcon && <Icon size={iconSizes} className="shrink-0 opacity-70"/>}
      <span className="truncate">{label || config.defaultLabel}</span>
    </span>);
};
