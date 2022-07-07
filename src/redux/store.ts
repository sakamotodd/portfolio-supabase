import {
  EditCommentsDTO,
  EditNoteDTO,
  EditTaskDTO,
  NewsVariableDTO,
  UpdateNewsDTO,
} from "@/interface/types";
import create from "zustand";

type State = {
  editTask: EditTaskDTO;
  editNote: EditNoteDTO;
  selectNews: NewsVariableDTO;
  updateNews: UpdateNewsDTO;
  editComment: EditCommentsDTO;
  setEditNote: (payload: EditNoteDTO) => void;
  setEditTask: (payload: EditTaskDTO) => void;
  setEditComment: (payload: EditCommentsDTO) => void;
  setEditTitle: (payload: NewsVariableDTO) => void;
  setUpdateNewsReducer: (payload: UpdateNewsDTO) => void;
  resetEditNote: () => void;
  resetEditComment: () => void;
  resetEditTask: () => void;
  resetUpdateNews: () => void;
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

  updateNews: {
    id: "",
    content: "",
    title: "",
    orderNo: 0,
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
  setUpdateNewsReducer: (payload) =>
    set({
      updateNews: {
        id: payload.id,
        content: payload.content,
        title: payload.title,
        orderNo: payload.orderNo,
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
  resetUpdateNews: () =>
    set({
      updateNews: {
        id: "",
        content: "",
        title: "",
        orderNo: 0,
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
