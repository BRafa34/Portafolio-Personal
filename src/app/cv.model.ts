export interface Photo { src: string; alt: string; }
export interface Profile {
  name: string; role: string; intro: string; bio: string; location: string; availability: string;
  photo: Photo; cover: Photo; cvFile: string;
}
export interface TimelineEntry {
  title?: string; organization?: string; period?: string; description?: string; highlights?: string[];
  degree?: string; institution?: string; year?: string | number;
}
export interface Skill { name: string; level: number | null; }
export interface Language { name: string; level: string; }
export interface Project { id: string; title: string; category: string; description: string; image: Photo; technologies: string[]; url: string; repository: string; }
export interface Media { type: 'image' | 'video' | 'audio'; src: string; alt: string; title: string; description: string; captionSrc?: string; }
export interface Contact { email: string; phone: string; links: { label: string; url: string }[]; }
export interface Cv {
  demo?: boolean;
  profile: Profile; education: TimelineEntry[]; experience: TimelineEntry[]; skills: Skill[];
  languages: Language[]; projects: Project[]; media: Media[]; contact: Contact;
}
