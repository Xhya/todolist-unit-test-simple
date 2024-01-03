import { TodolistType } from "../types";

export const state = {
  list: [] as TodolistType,
  input: "",
  isLoading: false,
  get isAddButtonDisabled(): boolean {
    return !!!this.input;
  },
};
