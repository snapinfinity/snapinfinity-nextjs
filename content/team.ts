// Team, as listed on the previous site. Members without a photo show a monogram
// until a real portrait is supplied (see the photo brief in the proposal).

export type Member = { name: string; role: string; photo: string | null };

export const team: Member[] = [
  { name: "Nashar Nibras", role: "Co-Founder", photo: null },
  { name: "Mohammad Nihal", role: "Co-Founder", photo: null },
  { name: "Ashfaque Ahamed", role: "Director of Business Development", photo: "/images/team/ashfaque-ahamed.jpg" },
  { name: "Muhammed Hani", role: "Creative Director", photo: "/images/team/muhammed-hani.jpg" },
  { name: "Ansif Abdulla", role: "Creative Head", photo: "/images/team/ansif-abdulla.jpg" },
  { name: "Muhammed Niyas", role: "Development Head", photo: "/images/team/muhammed-niyas.jpg" },
  { name: "Fayyas Ashraf", role: "Senior Content Creator", photo: "/images/team/fayyas-ashraf.jpg" },
  { name: "Sanand", role: "UI/UX Designer", photo: "/images/team/sanand.jpg" },
  { name: "Hadi", role: "Graphic Designer", photo: "/images/team/hadi.jpg" },
  { name: "Muethesim", role: "Backend Engineer", photo: "/images/team/muethesim.jpg" },
  { name: "Mohammad Fawas", role: "Software Engineer", photo: "/images/team/mohammad-fawas.jpg" },
  { name: "Aadil Mansoor", role: "Software Engineer", photo: "/images/team/aadil-mansoor.jpg" },
];

export const studioPhotos = [
  { src: "/images/studio/team-together.jpg", alt: "The Snap Infinity team together in the studio", width: 1200, height: 1600 },
  { src: "/images/studio/studio-desks.jpg", alt: "A designer at work along the studio's long desk", width: 1350, height: 1800 },
  { src: "/images/studio/be-bold.jpg", alt: "A poster on the studio shelf reading “Be bold or italic, but never regular”", width: 1350, height: 1800 },
  { src: "/images/studio/team-at-work.jpg", alt: "Team members gathered around a laptop", width: 1200, height: 1600 },
  { src: "/images/studio/meeting-room.jpg", alt: "The studio meeting room", width: 1200, height: 1600 },
  { src: "/images/studio/to-infinity-cake.jpg", alt: "A celebration cake iced with “Snap Infinity: to infinity and beyond”", width: 1350, height: 1800 },
  { src: "/images/studio/inauguration-team.jpg", alt: "The team under a balloon arch at the studio inauguration", width: 1800, height: 1374 },
] as const;
