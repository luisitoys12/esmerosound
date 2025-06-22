export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  dataAiHint: string;
}

export interface Show {
  time: string;
  name: string;
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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  dataAiHint: string;
}
