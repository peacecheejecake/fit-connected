import { NoteIcon, PersonIcon, EditIcon, FaceIconOne } from '@/assets/icons';

interface NavBarItem {
  idx: number;
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const navBarItems: NavBarItem[] = [
  {
    idx: 0,
    title: 'Note',
    Icon: NoteIcon,
  },
  {
    idx: 1,
    title: 'Note',
    Icon: NoteIcon,
  },
  {
    idx: 2,
    title: 'Note',
    Icon: NoteIcon,
  },
  {
    idx: 3,
    title: 'Note',
    Icon: NoteIcon,
  },
];

export { navBarItems };
export type { NavBarItem };
