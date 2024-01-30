import RepositoryMock from "../repository/repositoryMock";
import { TodoItem } from "../types";
import ViewModel, { ViewModelState } from "./viewmodel";

describe.skip("todolist tests", () => {
  let repository: RepositoryMock;
  let vm: ViewModel;
  let state: ViewModelState;

  beforeEach(() => {
    repository = new RepositoryMock();
    vm = new ViewModel(repository);
    state = vm.viewModelState
  });

  it("displays initial list", async () => {
    await vm.onInit();
    expect(getItems()).toEqual(["Un item"]);
  });

  it("disabled button", async () => {
    expect(state.isButtonDisabled).toEqual(true);
  });

  it("enabled button", async () => {
    vm.onUpdateInput("123");
    expect(state.isButtonDisabled).toEqual(false);
  });

  it("re disabled button", async () => {
    vm.onUpdateInput("123");
    expect(state.isButtonDisabled).toEqual(false);

    vm.onUpdateInput("");
    expect(state.isButtonDisabled).toEqual(true);
  });

  it("loading state", async () => {
    repository.keepLoadState = true;
    vm.onUpdateInput("Deux items");
    vm.onClickAddbutton();
    expect(state.isLoading).toEqual(true);
  });

  it("not loading state", async () => {
    repository.keepLoadState = false;
    vm.onUpdateInput("Deux items");
    await vm.onClickAddbutton();
    expect(state.isLoading).toEqual(false);
  });

  it("add item", async () => {
    await vm.onInit();
    expect(getItems()).toEqual(["Un item"]);

    vm.onUpdateInput("Deux items");
    await vm.onClickAddbutton();
    expect(getItems()).toEqual(["Un item", "Deux items"]);

    vm.onUpdateInput("Trois items");
    await vm.onClickAddbutton();
    expect(getItems()).toEqual([
      "Un item",
      "Deux items",
      "Trois items",
    ]);
  });

  it("input reset after new item", async () => {
    vm.onUpdateInput("Trois items");
    await vm.onClickAddbutton();
    expect(state.input).toEqual("");
  });

  const getItems = () =>
    Object.values(state.itemList).map((item: TodoItem) => item.text);
});
