import type { Schedule } from "@/types";

export const schedule: Schedule = {
  lunes: [
    { time: "00:00 - 06:00", name: "Nocturno Esmerosound", host: "Luna" },
    { time: "06:00 - 09:00", name: "Amanecer Esmerosound", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Ritmos Latinos", host: "DJ Sabor" },
    { time: "12:00 - 15:00", name: "Clásicos del Rock", host: "Rocker" },
    { time: "15:00 - 18:00", name: "Tarde de Pop", host: "Popstar" },
    { time: "18:00 - 21:00", name: "Nuevas Olas", host: "Indie"},
    { time: "21:00 - 23:59", name: "Nocturno Esmerosound", host: "Luna"},
  ],
  martes: [
    { time: "00:00 - 06:00", name: "Nocturno Esmerosound", host: "Luna" },
    { time: "06:00 - 09:00", name: "Amanecer Esmerosound", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Jazz y Más", host: "Blue Note" },
    { time: "12:00 - 15:00", name: "Hits Actuales", host: "DJ Fresh" },
    { time: "15:00 - 18:00", name: "Electrónica Global", host: "Beatmaster" },
    { time: "18:00 - 21:00", name: "Reggae Vibes", host: "Roots" },
    { time: "21:00 - 23:59", name: "After Office", host: "Worky"},
  ],
  miercoles: [
    { time: "00:00 - 06:00", name: "Nocturno Esmerosound", host: "Luna" },
    { time: "06:00 - 09:00", name: "Amanecer Esmerosound", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Ritmos Latinos", host: "DJ Sabor" },
    { time: "12:00 - 15:00", name: "Clásicos del Rock", host: "Rocker" },
    { time: "15:00 - 18:00", name: "Tarde de Pop", host: "Popstar" },
    { time: "18:00 - 21:00", name: "Nuevas Olas", host: "Indie"},
    { time: "21:00 - 23:59", name: "Nocturno Esmerosound", host: "Luna"},
  ],
  jueves: [
    { time: "00:00 - 06:00", name: "Nocturno Esmerosound", host: "Luna" },
    { time: "06:00 - 09:00", name: "Amanecer Esmerosound", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Jazz y Más", host: "Blue Note" },
    { time: "12:00 - 15:00", name: "Hits Actuales", host: "DJ Fresh" },
    { time: "15:00 - 18:00", name: "Electrónica Global", host: "Beatmaster" },
    { time: "18:00 - 21:00", name: "Reggae Vibes", host: "Roots" },
    { time: "21:00 - 23:59", name: "After Office", host: "Worky"},
  ],
  viernes: [
    { time: "00:00 - 06:00", name: "Nocturno Esmerosound", host: "Luna" },
    { time: "06:00 - 09:00", name: "Amanecer Esmerosound", host: "DJ Sol" },
    { time: "09:00 - 12:00", name: "Ritmos Latinos", host: "DJ Sabor" },
    { time: "12:00 - 15:00", name: "Clásicos del Rock", host: "Rocker" },
    { time: "15:00 - 20:00", name: "Viernes de Fiesta", host: "Party Mix" },
    { time: "20:00 - 23:59", name: "Club Esmerosound", host: "Party Mix"},
  ],
  sabado: [
    { time: "00:00 - 08:00", name: "Club Esmerosound", host: "Party Mix"},
    { time: "08:00 - 11:00", name: "Fin de Semana Relax", host: "DJ Chill" },
    { time: "11:00 - 14:00", name: "Top 40", host: "DJ Hits" },
    { time: "14:00 - 17:00", name: "Recuerdos de Oro", host: "Golden" },
    { time: "17:00 - 20:00", name: "Sábado Noche", host: "DJ Dance" },
    { time: "20:00 - 23:59", name: "Retro Party", host: "DJ Dance"},
  ],
  domingo: [
    { time: "00:00 - 08:00", name: "After Party", host: "DJ Dance"},
    { time: "08:00 - 11:00", name: "Domingo Clásico", host: "Maestro" },
    { time: "11:00 - 14:00", name: "Especiales Esmerosound", host: "Varios" },
    { time: "14:00 - 17:00", name: "Mundo Reggae", host: "DJ Roots" },
    { time: "17:00 - 20:00", name: "Cierre de Semana", host: "DJ Sunset" },
    { time: "20:00 - 23:59", name: "Soundtracks de Películas", host: "Cinema" },
  ],
};

export const daysOfWeek = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];
