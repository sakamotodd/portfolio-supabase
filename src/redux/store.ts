import {
  EditCommentsDTO,
  EditNoteDTO,
  UpdateCommentsDTO,
  UpdateNoteDTO,
} from "@/interface/types";
import create from "zustand";

type State = {
  editNote: EditNoteDTO;
  updateNote: UpdateNoteDTO;
  editComment: EditCommentsDTO;
  updateComment: UpdateCommentsDTO;
  setEditNote: (payload: EditNoteDTO) => void;
  setEditComment: (payload: EditCommentsDTO) => void;
  setUpdateNote: (payload: UpdateNoteDTO) => void;
  setUpdateComment: (payload: UpdateCommentsDTO) => void;
  resetEditNote: () => void;
  resetEditComment: () => void;
  resetUpdateNote: () => void;
  resetUpdateComment: () => void;
};

const useStore = create<State>((set) => ({
  editNote: {
    title: "",
    content: "",
    openFlag: true,
    user_id: "",
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
  updateComment: {
    id: "",
    title: "",
    content: "",
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
  setUpdateComment: (payload) =>
    set({
      updateComment: {
        title: payload.title,
        content: payload.content,
        id: payload.id,
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
  resetUpdateNote: () =>
    set({
      updateNote: {
        id: "",
        content: "",
        title: "",
        openFlag: true,
      },
    }),
  resetEditComment: () =>
    set({
      editComment: {
        title: "",
        content: "",
        note_id: "",
        user_id: "",
      },
    }),
  resetUpdateComment: () =>
    set({
      updateComment: {
        title: "",
        content: "",
        id: "",
      },
    }),
}));

export default useStore;
