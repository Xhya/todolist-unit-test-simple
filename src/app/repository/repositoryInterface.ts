import { TodolistType } from "../types";

export interface RepositoryInterface {
    getList: () => Promise<TodolistType>;
    addItem: (text: string) => Promise<TodolistType>;
  }
  