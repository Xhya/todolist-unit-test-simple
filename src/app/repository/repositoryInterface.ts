import { Todo } from "../types";

export interface RepositoryInterface {
    getList: () => Promise<Todo>;
    addItem: (text: string) => Promise<Todo>;
  }
  