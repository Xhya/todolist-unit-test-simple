import { DeepSignal } from "deepsignal/react";
import Repository from "../repository/repository";
import { RepositoryInterface } from "../repository/repositoryInterface";
import { TodolistType } from "../types";
import { state } from "../state/state";

export default class ViewModel {
  repository: RepositoryInterface;

  constructor(repository: RepositoryInterface = new Repository()) {
    this.repository = repository;
  }

  viewModelState: DeepSignal<{
    list: TodolistType;
    input: string;
    isLoading: boolean;
    isAddButtonDisabled: boolean;
  }> = state;

  async fetchData() {
    const list = await this.repository.getList();
    state.list = list;
  }

  async addItem() {
    if (state.input) {
      state.isLoading = true;
      const list = await this.repository.addItem(state.input);
      state.list = list;
      state.input = "";
      state.isLoading = false;
    }
  }

  onUpdateInput(input: string) {
    state.input = input;
  }
}
