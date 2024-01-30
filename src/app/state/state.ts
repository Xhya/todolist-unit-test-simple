import { deepSignal } from "deepsignal/react";
import { Todo } from "../types";

export const state = deepSignal({
  itemList: [] as Todo
});
