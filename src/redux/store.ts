import {
  CreateCommentDTO,
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
  editComment: CreateCommentDTO;
  setEditNote: (payload: EditNoteDTO) => void;
  setEditTask: (payload: EditTaskDTO) => void;
  setEditTitle: (payload: NewsVariableDTO) => void;
  setUpdateNewsReducer: (payload: UpdateNewsDTO) => void;
  setCommentNewsReducer: (payload: CreateCommentDTO) => void;
  resetEditNote: () => void;
  resetEditTask: () => void;
  resetUpdateNews: () => void;
  resetEditTitle: () => void;
  resetCommentNewsReducer: () => void;
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
    groupNewsId: "",
    commentText: "",
    commentName: "",
    commentPhotURL: "",
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
  setCommentNewsReducer: (payload) =>
    set({
      editComment: {
        groupNewsId: payload.groupNewsId,
        commentText: payload.commentText,
        commentName: payload.commentName,
        commentPhotURL: payload.commentPhotURL,
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
  resetCommentNewsReducer: () =>
    set({
      editTask: {
        id: "",
        title: "",
        mail: "",
      },
    }),
}));

export default useStore;
