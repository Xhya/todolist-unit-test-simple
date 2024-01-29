import RepositoryMock from "../repository/repositoryMock";
import { TodoItem } from "../types";
import ViewModel from "../component/viewmodel";

describe.skip("todolist tests", () => {
  let repository: RepositoryMock;
  let vm: ViewModel;

  beforeEach(() => {
    repository = new RepositoryMock();
    vm = new ViewModel(repository);
  });

  it("displays initial list", async () => {
    await vm.fetchData();
    expect(getItemValueList()).toEqual(["Un item"]);
  });

  it("disabled button", async () => {
    expect(vm.viewModelState.isButtonDisabled).toEqual(true);
  });

  it("enabled button", async () => {
    vm.onUpdateInput("123");
    expect(vm.viewModelState.isButtonDisabled).toEqual(false);
  });

  it("re disabled button", async () => {
    vm.onUpdateInput("123");
    expect(vm.viewModelState.isButtonDisabled).toEqual(false);
    vm.onUpdateInput("");
    expect(vm.viewModelState.isButtonDisabled).toEqual(true);
  });

  it("loading state", async () => {
    repository.keepLoadState = true;
    vm.onUpdateInput("Deux items");
    vm.addItem();
    expect(vm.viewModelState.isLoading).toEqual(true);
  });

  it("not loading state", async () => {
    repository.keepLoadState = false;
    vm.onUpdateInput("Deux items");
    await vm.addItem();
    expect(vm.viewModelState.isLoading).toEqual(false);
  });

  it("add item", async () => {
    await vm.fetchData();
    expect(getItemValueList()).toEqual(["Un item"]);
    vm.onUpdateInput("Deux items");
    await vm.addItem();
    expect(getItemValueList()).toEqual(["Un item", "Deux items"]);
    vm.onUpdateInput("Trois items");
    await vm.addItem();
    expect(getItemValueList()).toEqual([
      "Un item",
      "Deux items",
      "Trois items",
    ]);
  });

  it("input reset after new item", async () => {
    vm.onUpdateInput("Trois items");
    await vm.addItem();
    expect(vm.viewModelState.input).toEqual("");
  });

  const getItemValueList = () =>
    Object.values(vm.viewModelState.itemList).map((item: TodoItem) => item.text);
});
