import { ReactNode } from "react";

export interface AvatarDTO {
  avatar_url: string;
}
export interface UsersDTO {
  full_name: string;
  avatar_url: string;
  email: string;
}
export interface CommentsDTO {
  id: string;
  title: string;
  content: string;
  created_at: string;
  note_id: string;
  user_id: string | undefined;
  users: UsersDTO;
}
export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  openFlag: boolean;
  user_id: string;
  created_at: string;
  users: UsersDTO;
}

export interface PrivateNoteDTO {
  id: string;
  title: string;
  content: string;
  openFlag: boolean;
  user_id: string;
  created_at: string;
  users: UsersDTO;
  comments: CommentsDTO[];
}

export interface UpdateNoteDTO {
  id: string;
  content: string;
  title: string;
  openFlag: boolean;
}

export interface EditNoteDTO {
  content: string;
  title: string;
  openFlag: boolean;
  user_id: string | undefined;
}

export interface EditCommentsDTO {
  content: string;
  title: string;
  note_id: string;
  user_id: string | undefined;
}
export interface UpdateCommentsDTO {
  id: string;
  content: string;
  title: string;
}

export interface UserNewsDTO {
  created_at: string;
  email: string;
  id: string;
  name: string;
  isFlag: boolean;
  photoURL: string;
  title: string;
  content: string;
  orderNo: number;
}

export interface LayoutDTO {
  children: ReactNode;
  title: string;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode?: boolean;
  listFlag?: boolean;
  setListFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SideBarDTO {
  children: ReactNode;
  styles: string;
  listFlag: boolean;
  setListFlag: React.Dispatch<React.SetStateAction<boolean>>;
  listClickRef: React.MutableRefObject<HTMLButtonElement>;
}

export interface HeaderDTO {
  title: string;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  listFlag: boolean;
  setListFlag: React.Dispatch<React.SetStateAction<boolean>>;
  listClickRef: React.MutableRefObject<HTMLButtonElement>;
}

export interface darkModeDTO {
  darkMode: boolean;
}

export interface SignInFormDTO {
  email: string;
  password: string;
}

export interface SignUpFormDTO {
  email: string;
  password: string;
  pass: string;
  name: string;
}

export interface ContactFormDTO {
  name: string;
  email: string;
  contact: string;
}
