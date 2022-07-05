import {
  CreateCommentDTO,
  EditNewsDTO,
  EditTaskDTO,
  NewsVariableDTO,
  UpdateNewsDTO,
} from "@/interface/types";
import create from "zustand";

type State = {
  editTask: EditTaskDTO;
  editNews: EditNewsDTO;
  selectNews: NewsVariableDTO;
  updateNews: UpdateNewsDTO;
  editComment: CreateCommentDTO;
  setEditTask: (payload: EditTaskDTO) => void;
  setEditTitle: (payload: NewsVariableDTO) => void;
  setUpdateNewsReducer: (payload: UpdateNewsDTO) => void;
  setCommentNewsReducer: (payload: CreateCommentDTO) => void;
  resetEditTask: () => void;
  resetUpdateNews: () => void;
  resetEditTitle: () => void;
  resetEditNews: () => void;
  resetCommentNewsReducer: () => void;
};

const useStore = create<State>((set) => ({
  editTask: {
    id: "",
    title: "",
    mail: "",
  },

  editNews: {
    id: "",
    content: "",
    title: "",
    name: "",
    email: "",
    photoURL: "",
    isFlag: true,
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
  resetEditNews: () =>
    set({
      editNews: {
        id: "",
        content: "",
        title: "",
        name: "",
        email: "",
        photoURL: "",
        isFlag: true,
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
