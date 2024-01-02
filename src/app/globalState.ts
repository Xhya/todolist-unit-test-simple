import { TodolistType } from "./types";

export const GlobalState = {
  list: [] as TodolistType,
  input: "",
  isLoading: false,
  get isAddButtonDisabled(): boolean {
    return !!!this.input;
  },
};
