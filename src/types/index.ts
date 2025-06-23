export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
  dataAiHint: string;
  createdAt?: number;
}

export interface Show {
  time: string;
  name:string;
  host: string;
}

export interface Schedule {
  lunes: Show[];
  martes: Show[];
  miercoles: Show[];
  jueves: Show[];
  viernes: Show[];
  sabado: Show[];
  domingo: Show[];
}

export interface TopSong {
  rank: number;
  title: string;
  artist: string;
  albumCoverUrl: string;
  dataAiHint: string;
  youtubeVideoId: string;
}

export interface RadioEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  dataAiHint: string;
}

export interface AzuracastSong {
  id: string;
  text: string;
  artist: string;
  title: string;
  album: string;
  art: string;
}

export interface AzuracastNowPlaying {
  station: {
    name: string;
  };
  now_playing: {
    song: AzuracastSong;
  };
  song_history: {
    song: AzuracastSong;
    played_at: number;
  }[];
  is_online: boolean;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  audioUrl: string;
  dataAiHint: string;
}

export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  dataAiHint: string;
  createdAt?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  dataAiHint: string;
  twitterUrl?: string;
  instagramUrl?: string;
}
