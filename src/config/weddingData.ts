import { WeddingData, PhotoItem } from '../types';

const heroPhotos: PhotoItem[] = [
  {
    id: 'hero-1',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000',
    caption: 'Royal Serenade',
    tag: 'Pre-Wedding',
    location: 'Udaipur Palace'
  },
  {
    id: 'hero-2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
    caption: 'Golden Hour Promises',
    tag: 'Portraits',
    location: 'New Delhi'
  },
  {
    id: 'hero-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000',
    caption: 'Candlelit Dreams',
    tag: 'Elegance',
    location: 'The Grand Palace'
  },
  {
    id: 'hero-4',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1000',
    caption: 'Hand in Hand Forever',
    tag: 'Romantic',
    location: 'Amber Fort'
  },
  {
    id: 'hero-5',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000',
    caption: 'A Soft Glance',
    tag: 'Candid',
    location: 'Lodi Gardens'
  },
  {
    id: 'hero-6',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000',
    caption: 'Whispers in Rose',
    tag: 'Floral Bloom',
    location: 'Oberoi Gardens'
  },
  {
    id: 'hero-7',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1000',
    caption: 'Eternal Vows',
    tag: 'Ceremony',
    location: 'The Grand Palace'
  },
  {
    id: 'hero-8',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000',
    caption: 'Twilight Embrace',
    tag: 'Sunset',
    location: 'Yamuna Riverbank'
  },
  {
    id: 'hero-9',
    url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1000',
    caption: 'First Light Together',
    tag: 'Dawn',
    location: 'Aravalli Hills'
  },
  {
    id: 'hero-10',
    url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=1000',
    caption: 'Regal Majesty',
    tag: 'Royal',
    location: 'New Delhi'
  },
  {
    id: 'hero-11',
    url: 'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?auto=format&fit=crop&q=80&w=1000',
    caption: 'The First Spark',
    tag: 'Chemistry',
    location: 'Old Delhi'
  },
  {
    id: 'hero-12',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000',
    caption: 'Royal Elegance',
    tag: 'Heritage',
    location: 'Jaipur'
  }
];

// Generate 45 curated couple photos for the 360 degree experience
const gallery360Photos: PhotoItem[] = [
  { id: 'g360-1', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000', caption: 'Regal Majesty', tag: 'Pre-Wedding', location: 'Jaipur' },
  { id: 'g360-2', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000', caption: 'Golden Hour Smile', tag: 'Candid', location: 'Delhi' },
  { id: 'g360-3', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000', caption: 'Fairytale Evening', tag: 'Romantic', location: 'Palace' },
  { id: 'g360-4', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1000', caption: 'Stepping into Forever', tag: 'Portraits', location: 'Agra' },
  { id: 'g360-5', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000', caption: 'Intimate Conversation', tag: 'Candid', location: 'Lodi Gardens' },
  { id: 'g360-6', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000', caption: 'Floral Canopy Walk', tag: 'Floral', location: 'The Grand Palace' },
  { id: 'g360-7', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1000', caption: 'Vows Exchange', tag: 'Ceremony', location: 'New Delhi' },
  { id: 'g360-8', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000', caption: 'Twilight Magic', tag: 'Sunset', location: 'Lake Palace' },
  { id: 'g360-9', url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1000', caption: 'Morning Light', tag: 'Pre-Wedding', location: 'Aravalli Hills' },
  { id: 'g360-10', url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=1000', caption: 'Symphony of Hearts', tag: 'Royal', location: 'Chhatarpur' },
  { id: 'g360-11', url: 'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?auto=format&fit=crop&q=80&w=1000', caption: 'A Timeless Embrace', tag: 'Romantic', location: 'Taj Gardens' },
  { id: 'g360-12', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000', caption: 'Celebration of Love', tag: 'Candid', location: 'The Grand Palace' },
  { id: 'g360-13', url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1000', caption: 'The Engagement Ring', tag: 'Details', location: 'Delhi' },
  { id: 'g360-14', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000', caption: 'Walk on Greenery', tag: 'Nature', location: 'Mehrauli' },
  { id: 'g360-15', url: 'https://images.unsplash.com/photo-1509924603848-aca5e5f276d7?auto=format&fit=crop&q=80&w=1000', caption: 'Gaze of Devotion', tag: 'Portraits', location: 'Udaipur' },
  { id: 'g360-16', url: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&q=80&w=1000', caption: 'Under Starlit Skies', tag: 'Night', location: 'The Grand Palace' },
  { id: 'g360-17', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000', caption: 'Radiant Bride Ananya', tag: 'Bride', location: 'New Delhi' },
  { id: 'g360-18', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000', caption: 'Handsome Groom Aarav', tag: 'Groom', location: 'New Delhi' },
  { id: 'g360-19', url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=1000', caption: 'Blossom of Joy', tag: 'Floral', location: 'Oberoi' },
  { id: 'g360-20', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1000', caption: 'Unfiltered Happiness', tag: 'Candid', location: 'Aerocity' },
  { id: 'g360-21', url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=1000', caption: 'Royal Gateway', tag: 'Architecture', location: 'Jaipur' },
  { id: 'g360-22', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1000', caption: 'Laughter Under Lights', tag: 'Night', location: 'Sangeet Night' },
  { id: 'g360-23', url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1000', caption: 'Dancing into Sunset', tag: 'Dance', location: 'The Grand Palace' },
  { id: 'g360-24', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1000', caption: 'Eyes Sealed in Love', tag: 'Portraits', location: 'Vasant Kunj' },
  { id: 'g360-25', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000', caption: 'Grand Reception Glow', tag: 'Reception', location: 'New Delhi' },
  { id: 'g360-26', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000', caption: 'Confetti Dreams', tag: 'Celebration', location: 'The Grand Palace' },
  { id: 'g360-27', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1000', caption: 'Silk & Crimson', tag: 'Details', location: 'Boutique' },
  { id: 'g360-28', url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1000', caption: 'Whispers of Spring', tag: 'Pre-Wedding', location: 'Botanical Gardens' },
  { id: 'g360-29', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000', caption: 'Serene Presence', tag: 'Portraits', location: 'New Delhi' },
  { id: 'g360-30', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1000', caption: 'Modern Romance', tag: 'Candid', location: 'Gurugram' },
  { id: 'g360-31', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1000', caption: 'Velvet Softness', tag: 'Elegance', location: 'New Delhi' },
  { id: 'g360-32', url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=1000', caption: 'Urban Royalty', tag: 'City', location: 'Connaught Place' },
  { id: 'g360-33', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=1000', caption: 'Charming Moments', tag: 'Portraits', location: 'Sunder Nursery' },
  { id: 'g360-34', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000', caption: 'Joyful Whispers', tag: 'Candid', location: 'New Delhi' },
  { id: 'g360-35', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000', caption: 'Gentle Strength', tag: 'Groom', location: 'The Grand Palace' },
  { id: 'g360-36', url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=1000', caption: 'Inner Glow', tag: 'Bride', location: 'The Grand Palace' },
  { id: 'g360-37', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1000', caption: 'Harmonious Journey', tag: 'Romantic', location: 'Aravalli' },
  { id: 'g360-38', url: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&q=80&w=1000', caption: 'Candlelight Reflection', tag: 'Night', location: 'The Grand Palace' },
  { id: 'g360-39', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000', caption: 'Shared Laughter', tag: 'Candid', location: 'Hauz Khas' },
  { id: 'g360-40', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000', caption: 'Friends & Family Rejoice', tag: 'Sangeet', location: 'New Delhi' },
  { id: 'g360-41', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000', caption: 'Precious Memories', tag: 'Candid', location: 'The Grand Palace' },
  { id: 'g360-42', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1000', caption: 'Infinite Tenderness', tag: 'Romantic', location: 'Yamuna' },
  { id: 'g360-43', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000', caption: 'Dusk till Dawn', tag: 'Sunset', location: 'New Delhi' },
  { id: 'g360-44', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000', caption: 'A Royal Beginning', tag: 'Heritage', location: 'Palace Grounds' },
  { id: 'g360-45', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1000', caption: 'Sealed with a Promise', tag: 'Wedding Vows', location: 'The Grand Palace' }
];

export const weddingData: WeddingData = {
  brideName: 'Ananya Sharma',
  groomName: 'Aarav Mehta',
  weddingDate: '18 October 2026',
  weddingDateIso: '2026-10-18T19:00:00',
  weddingDay: 'Sunday',
  weddingTime: '7:00 PM',
  venue: 'The Grand Palace, New Delhi',
  venueAddress: 'Nelson Mandela Road, Vasant Kunj, New Delhi, Delhi 110070',
  tagline: '“Two hearts, one beautiful journey.”',
  heroPhotos,
  gallery360Photos,
  whatsapp: '+91 98765 43210',
  phone: '+91 98765 43210',
  email: 'hello@weddingstudio.com',
  studioName: 'Lumière Wedding Invitation Studio'
};
