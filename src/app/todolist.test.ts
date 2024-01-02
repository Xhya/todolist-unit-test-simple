import RepositoryMock from "./repositoryMock";
import { TodoItem } from "./types";
import ViewModel from "./viewmodel";

describe("todolist tests", () => {
  let repository: RepositoryMock
  let vm: ViewModel;

  beforeEach(() => {
    repository = new RepositoryMock()
    vm = new ViewModel(repository)
  });

  it("displays initial list", async () => {
    await vm.fetchData();
    expect(getItemValueList()).toEqual(["Un item"]);
  });

  it("disabled button", async () => {
    expect(vm.state.isAddButtonDisabled).toEqual(true);
  });

  it("enabled button", async () => {
    vm.onUpdateInput("123");
    expect(vm.state.isAddButtonDisabled).toEqual(false);
  });

  it("loading state", async () => {
    repository.keepLoadState = true
    vm.addItem("Deux items");
    expect(vm.state.isLoading).toEqual(true);
  });

  it("not loading state", async () => {
    repository.keepLoadState = false
    await vm.addItem("Deux items");
    expect(vm.state.isLoading).toEqual(false);
  });

  it("add item", async () => {
    await vm.fetchData();
    expect(getItemValueList()).toEqual(["Un item"]);
    vm.addItem("Deux items");
    expect(getItemValueList()).toEqual(["Un item", "Deux items"]);
    vm.addItem("Trois items");
    expect(getItemValueList()).toEqual([
      "Un item",
      "Deux items",
      "Trois items",
    ]);
  });

  it("input reset after new item", async () => {
    vm.addItem("Deux items");
    expect(vm.state.input).toEqual("");
  });

  const getItemValueList = () =>
    Object.values(vm.state.list).map((item: TodoItem) => item.text);
});
