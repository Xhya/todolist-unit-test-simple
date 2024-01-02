import { DeepSignal } from "deepsignal/react";
import Repository from "../repository/repository";
import { RepositoryInterface } from "../repository/repositoryInterface";
import { TodolistType } from "../types";
import { globalStateObservable } from "../state/globalState.observable";

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
  }

  state: DeepSignal<State> = globalStateObservable;

  async fetchData() {
    const list = await this.repository.getList();
    this.state.list = list;
  }

  async addItem(text: string) {
    if (text) {
      this.state.isLoading = true;
      const list = await this.repository.addItem(text);
      this.state.list = list;
      this.state.input = "";
      this.state.isLoading = false;
    }
  }

  onUpdateInput(input: string) {
    this.state.input = input;
  }
}
