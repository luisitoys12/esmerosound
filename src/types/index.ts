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
