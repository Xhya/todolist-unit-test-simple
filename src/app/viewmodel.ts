import { DeepSignal, deepSignal } from "deepsignal/react";
import S from "s-js";
import { GlobalState } from "./globalState";
import { globalStateObservable } from "./globalState.observable";
import Repository from "./repository";
import { RepositoryInterface } from "./repositoryInterface";
import { TodolistType } from "./types";

export type State = {
  list: TodolistType;
  input: string;
  isLoading: boolean;
  isAddButtonDisabled: boolean;
};

export default class ViewModel {
  repository: RepositoryInterface;

  constructor(repository: RepositoryInterface = new Repository()) {
    this.repository = repository;
    S.on(globalStateObservable, () => {
      this.state.list = globalStateObservable().list;
    });
  }

  state: DeepSignal<State> = deepSignal({
    list: globalStateObservable().list,
    input: "",
    isLoading: false,
    get isAddButtonDisabled(): boolean {
      return !!!this.input;
    },
  });

  async fetchData() {
    const list = await this.repository.getList();
    globalStateObservable({ ...GlobalState, list });
  }

  async addItem(text: string) {
    if (text) {
      this.state.isLoading = true
      const list = await this.repository.addItem(text);
      globalStateObservable({ ...GlobalState, list });
      this.state.input = "";
      this.state.$isLoading = false
    }
  }

  onUpdateInput(input: string) {
    this.state.input = input;
  }
}
