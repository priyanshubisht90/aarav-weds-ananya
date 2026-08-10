import { WeddingData } from '../types';

export function getGoogleCalendarUrl(weddingData: WeddingData): string {
  const title = encodeURIComponent(`Save the Date: ${weddingData.brideName} & ${weddingData.groomName}'s Wedding`);
  const details = encodeURIComponent(
    `You are cordially invited to celebrate the wedding of ${weddingData.brideName} and ${weddingData.groomName}.\n\nDate: ${weddingData.weddingDate}\nTime: ${weddingData.weddingTime}\nVenue: ${weddingData.venue}\n\n${weddingData.tagline}`
  );
  const location = encodeURIComponent(`${weddingData.venue}, ${weddingData.venueAddress}`);
  
  // 18 Oct 2026, 19:00 to 23:00 IST
  const startTime = '20261018T133000Z'; // UTC conversion (7:00 PM IST is 1:30 PM UTC)
  const endTime = '20261018T183000Z';   // UTC conversion

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
}

export function getOutlookCalendarUrl(weddingData: WeddingData): string {
  const title = encodeURIComponent(`Save the Date: ${weddingData.brideName} & ${weddingData.groomName}'s Wedding`);
  const details = encodeURIComponent(
    `Wedding of ${weddingData.brideName} & ${weddingData.groomName} at ${weddingData.venue}`
  );
  const location = encodeURIComponent(`${weddingData.venue}, ${weddingData.venueAddress}`);
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&location=${location}&startdt=2026-10-18T19:00:00&enddt=2026-10-18T23:00:00`;
}

export function getYahooCalendarUrl(weddingData: WeddingData): string {
  const title = encodeURIComponent(`Save the Date: ${weddingData.brideName} & ${weddingData.groomName}`);
  const details = encodeURIComponent(
    `Celebrating ${weddingData.brideName} & ${weddingData.groomName} at ${weddingData.venue}`
  );
  const location = encodeURIComponent(`${weddingData.venue}`);

  return `https://calendar.yahoo.com/?v=60&title=${title}&st=20261018T190000&et=20261018T230000&desc=${details}&in_loc=${location}`;
}

export function downloadIcsFile(weddingData: WeddingData): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lumiere Wedding Studio//Save The Date//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    'SUMMARY:' + `Save the Date: ${weddingData.brideName} & ${weddingData.groomName}`,
    'DESCRIPTION:' + `Wedding celebration of ${weddingData.brideName} and ${weddingData.groomName}. ${weddingData.tagline}`,
    'LOCATION:' + `${weddingData.venue}, ${weddingData.venueAddress}`,
    'DTSTART:20261018T133000Z',
    'DTEND:20261018T183000Z',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Reminder: Wedding of ' + `${weddingData.brideName} & ${weddingData.groomName}`,
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${weddingData.brideName}_and_${weddingData.groomName}_SaveTheDate.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
