'use client';
import React from 'react';

interface CalendarProps {
  taskName: string;
  durationHours?: number;
}

export default function CalendarExportBtn({ taskName, durationHours = 2 }: CalendarProps) {
  const handleDownload = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);

    const startDate = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), 0] as [
      number, number, number, number, number,
    ];

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Guild//AI Advisor//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate[0]}${String(startDate[1]).padStart(2, '0')}${String(startDate[2]).padStart(2, '0')}T${String(startDate[3]).padStart(2, '0')}${String(startDate[4]).padStart(2, '0')}00`,
      `DTEND:${startDate[0]}${String(startDate[1]).padStart(2, '0')}${String(startDate[2]).padStart(2, '0')}T${String(startDate[3] + durationHours).padStart(2, '0')}${String(startDate[4]).padStart(2, '0')}00`,
      `SUMMARY:⚡ [GUILD] ${taskName}`,
      'DESCRIPTION:Scheduled by your Guild Advisor. Time to lock in!',
      'BEGIN:VALARM',
      'TRIGGER:-PT10M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Guild Session Starting!',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Guild_Session.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 hover:scale-105 active:scale-95"
    >
      📅 Sync to Phone Calendar
    </button>
  );
}
