import { fireEvent, render, screen } from "@testing-library/react";
import Todolist, { sleep } from "./Todolist.component";
import RepositoryMock from "../repository/repositoryMock";

describe("Todolist Component", () => {
  const repository = new RepositoryMock();

  const fakeTodo = [{ id: "0", text: "Un item" } as TodoItem];
  const fakeTodoAdd = [
    { id: "0", text: "Un item" },
    { id: "1", text: "Tomate" },
  ];

  function mockFetch() {
    jest.spyOn(global, "fetch").mockImplementation((url) =>
      Promise.resolve({
        json: () => {
          if (url === "./data.json") {
            return Promise.resolve(fakeTodo);
          } else if (url === "./data_add.json") {
            return Promise.resolve(fakeTodoAdd);
          }
        },
      } as Response)
    );
  }

  function renderComponent() {
    render(<Todolist />);
  }

  it("displays initial list", async () => {
    mockFetch();

    renderComponent();
    expect(await screen.findByText("Un item")).toBeInTheDocument();
  });

  it("disabled button", async () => {
    mockFetch();

    renderComponent();
    expect(await screen.findByText("Ajouter")).toBeDisabled();
  });

  it("enabled button", async () => {
    mockFetch();

    renderComponent();
    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "Tomate" } });
    expect(await screen.findByText("Ajouter")).toBeEnabled();
  });

  it("loading state", async () => {
    mockFetch();

    renderComponent();
    expect(await screen.findByText("Ajouter")).toBeInTheDocument();
  });

  it("add item", async () => {
    mockFetch();

    renderComponent();
    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "Tomate" } });

    fireEvent.click(await screen.findByText("Ajouter"));

    await sleep(2000);

    expect(await screen.findByText("Tomate")).toBeInTheDocument();
  });
});
