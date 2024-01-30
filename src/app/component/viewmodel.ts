import { DeepSignal } from "deepsignal/react";
import Repository from "../repository/repository";
import { RepositoryInterface } from "../repository/repositoryInterface";
import { Todo } from "../types";
import { state } from "../state/state";

export type ViewModelState = {
  itemList: Todo;
  input: string;
  isLoading: boolean;
  isButtonDisabled: boolean;
}
export default class ViewModel {
  repository: RepositoryInterface;

  constructor(repository: RepositoryInterface = new Repository()) {
    this.repository = repository;
  }

  viewModelState: DeepSignal<ViewModelState> = state;

  async onInit() {
    const list = await this.repository.getList();
    state.itemList = list;
  }

  async onClickAddbutton() {
    if (state.input) {
      state.isLoading = true;
      const list = await this.repository.addItem(state.input);
      state.itemList = list;
      state.input = "";
      state.isLoading = false;
    }
  }

  onUpdateInput(input: string) {
    state.input = input;
  }
}
