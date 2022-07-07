import {
  EditCommentsDTO,
  EditNoteDTO,
  EditTaskDTO,
  NewsVariableDTO,
  UpdateNoteDTO,
} from "@/interface/types";
import create from "zustand";

type State = {
  editTask: EditTaskDTO;
  editNote: EditNoteDTO;
  updateNote: UpdateNoteDTO;
  selectNews: NewsVariableDTO;
  editComment: EditCommentsDTO;
  setEditNote: (payload: EditNoteDTO) => void;
  setEditTask: (payload: EditTaskDTO) => void;
  setEditComment: (payload: EditCommentsDTO) => void;
  setEditTitle: (payload: NewsVariableDTO) => void;
  setUpdateNote: (payload: UpdateNoteDTO) => void;
  resetEditNote: () => void;
  resetEditComment: () => void;
  resetUpdateNote: () => void;
  resetEditTask: () => void;
  resetEditTitle: () => void;
};

const useStore = create<State>((set) => ({
  editTask: {
    id: "",
    title: "",
    mail: "",
  },

  editNote: {
    title: "",
    content: "",
    openFlag: true,
    user_id: "",
  },

  selectNews: {
    content: "",
    title: "",
    name: "",
    email: "",
    photoURL: "",
    isFlag: true,
  },

  updateNote: {
    id: "",
    content: "",
    title: "",
    openFlag: true,
  },
  editComment: {
    title: "",
    content: "",
    note_id: "",
    user_id: "",
  },
  setEditNote: (payload) =>
    set({
      editNote: {
        title: payload.title,
        content: payload.content,
        openFlag: payload.openFlag,
        user_id: payload.user_id,
      },
    }),
  setEditTask: (payload) =>
    set({
      editTask: {
        id: payload.id,
        title: payload.title,
        mail: payload.mail,
      },
    }),
  setEditTitle: (payload) =>
    set({
      selectNews: {
        content: payload.content,
        title: payload.title,
        name: payload.name,
        email: payload.email,
        photoURL: payload.photoURL,
        isFlag: payload.isFlag,
      },
    }),
  setUpdateNote: (payload) =>
    set({
      updateNote: {
        id: payload.id,
        content: payload.content,
        title: payload.title,
        openFlag: payload.openFlag,
      },
    }),
  setEditComment: (payload) =>
    set({
      editComment: {
        title: payload.title,
        content: payload.content,
        note_id: payload.note_id,
        user_id: payload.user_id,
      },
    }),
  resetEditNote: () =>
    set({
      editNote: {
        content: "",
        title: "",
        openFlag: true,
        user_id: "",
      },
    }),
  resetEditTask: () =>
    set({
      editTask: {
        id: "",
        title: "",
        mail: "",
      },
    }),
  resetUpdateNote: () =>
    set({
      updateNote: {
        id: "",
        content: "",
        title: "",
        openFlag: true,
      },
    }),
  resetEditTitle: () =>
    set({
      selectNews: {
        content: "",
        title: "",
        name: "",
        email: "",
        photoURL: "",
        isFlag: true,
      },
    }),
  resetEditComment: () =>
    set({
      editTask: {
        id: "",
        title: "",
        mail: "",
      },
    }),
}));

export default useStore;
