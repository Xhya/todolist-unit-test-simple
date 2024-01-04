import { deepSignal } from "deepsignal/react";
import { TodolistType } from "../types";

export const state = deepSignal({
  list: [] as TodolistType,
  input: "",
  isLoading: false,
  get isAddButtonDisabled(): boolean {
    return !!!this.input;
  },
});
