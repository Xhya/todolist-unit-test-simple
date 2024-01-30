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
};
export default class ViewModel {
  repository: RepositoryInterface;

  constructor(repository: RepositoryInterface = new Repository()) {
    this.repository = repository;
  }

  viewModelState: DeepSignal<ViewModelState> = {
    itemList: state.itemList,
    input: "",
    isLoading: false,
    get isButtonDisabled(): boolean {
      return !!!this.input;
    },
  };

  async onInit() {
    const list = await this.repository.getList();
    this.viewModelState.itemList = list;
  }

  async onClickAddbutton() {
    if (this.viewModelState.input) {
      this.viewModelState.isLoading = true;
      const list = await this.repository.addItem(this.viewModelState.input);
      state.itemList = list;
      this.viewModelState.input = "";
      this.viewModelState.isLoading = false;
    }
  }

  onUpdateInput(input: string) {
    this.viewModelState.input = input;
  }
}
