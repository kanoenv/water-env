import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdminStatCardProps {
  label: string;
  value: number | string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: 'default' | 'success' | 'warning' | 'danger';
  active?: boolean;
  onClick?: () => void;
}

const tones: Record<string, { icon: string; bg: string }> = {
  default: { icon: 'text-primary', bg: 'bg-primary/10' },
  success: { icon: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  warning: { icon: 'text-amber-600', bg: 'bg-amber-500/10' },
  danger: { icon: 'text-destructive', bg: 'bg-destructive/10' },
};

const AdminStatCard = ({ label, value, hint, icon: Icon, tone = 'default', active, onClick }: AdminStatCardProps) => {
  const t = tones[tone];
  const Wrapper: any = onClick ? 'button' : 'div';
  return (
    <Wrapper onClick={onClick} className={cn('text-left w-full', onClick && 'cursor-pointer')}>
      <Card
        className={cn(
          'relative h-full overflow-hidden transition-all',
          onClick && 'hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30',
          active && 'border-primary/60 shadow-sm'
        )}
      >
        <span
          className={cn(
            'absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transition-opacity',
            active ? 'opacity-100' : 'opacity-40'
          )}
        />
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={cn('rounded-lg p-2.5 ring-1 ring-border/60', t.bg)}>
              <Icon className={cn('h-5 w-5', t.icon)} />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
            {hint && <div className="mt-1 text-xs text-muted-foreground/80">{hint}</div>}
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default AdminStatCard;
