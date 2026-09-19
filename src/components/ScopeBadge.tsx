import React from 'react';
import { ScopeType } from '../types';
import { Globe, MapPin, Building2, Landmark, BookOpen, GraduationCap, Layers, Users } from 'lucide-react';

interface ScopeBadgeProps {
  scope: ScopeType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ScopeBadge: React.FC<ScopeBadgeProps> = ({
  scope,
  label,
  size = 'sm',
  showIcon = true,
}) => {
  const getBadgeConfig = () => {
    switch (scope) {
      case 'NATIONAL':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: Globe,
          defaultLabel: 'National Scope',
        };
      case 'STATE':
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-200',
          dot: 'bg-teal-500',
          icon: MapPin,
          defaultLabel: 'State Scope',
        };
      case 'STUDY_CENTRE':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-600',
          icon: Building2,
          defaultLabel: 'Study Centre',
        };
      case 'FACULTY':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          dot: 'bg-purple-500',
          icon: Landmark,
          defaultLabel: 'Faculty',
        };
      case 'DEPARTMENT':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          dot: 'bg-indigo-500',
          icon: BookOpen,
          defaultLabel: 'Department',
        };
      case 'PROGRAMME':
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-200',
          dot: 'bg-sky-500',
          icon: GraduationCap,
          defaultLabel: 'Programme',
        };
      case 'LEVEL':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          icon: Layers,
          defaultLabel: 'Level',
        };
      case 'GROUP':
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          icon: Users,
          defaultLabel: 'Peer Group',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  }[size];

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-tight whitespace-nowrap ${config.bg} ${sizeClasses}`}
    >
      {showIcon && <Icon size={iconSizes} className="shrink-0 opacity-80" />}
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
