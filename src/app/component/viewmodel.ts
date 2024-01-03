import { DeepSignal } from "deepsignal/react";
import Repository from "../repository/repository";
import { RepositoryInterface } from "../repository/repositoryInterface";
import { TodolistType } from "../types";
import { state } from "../state/state";
import { deepSignal } from "deepsignal/react";

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
  }> = deepSignal(state);

  async fetchData() {
    const list = await this.repository.getList();
    this.viewModelState.list = list;
  }

  async addItem() {
    if (this.viewModelState.input) {
      this.viewModelState.isLoading = true;
      const list = await this.repository.addItem(this.viewModelState.input);
      this.viewModelState.list = list;
      this.viewModelState.input = "";
      this.viewModelState.isLoading = false;
    }
  }

  onUpdateInput(input: string) {
    this.viewModelState.input = input;
  }
}
