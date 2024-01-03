import { fireEvent, render, screen } from "@testing-library/react";
import Todolist, { sleep } from "./Todolist.component";
import RepositoryMock from "../repository/repositoryMock";
import { TodoItem } from "../types";

const repository = new RepositoryMock()

describe("Todolist Component", () => {
  function mockFetch() {
    jest.spyOn(global, "fetch").mockImplementation((url) =>
      Promise.resolve({
        json: () => {
          if (url === "./data.json") {
            return Promise.resolve(initialFakeTodo);
          } else if (url === "./data_add.json") {
            return Promise.resolve(fakeTodoWithNewItem);
          }
        },
      } as Response)
    );
  }

  const initialFakeTodo = [{ id: "0", text: "Un item" } as TodoItem];
  const fakeTodoWithNewItem = [
    { id: "0", text: "Un item" },
    { id: "1", text: "Tomate" },
  ];

  function renderComponent() {
    render(<Todolist />);
  }

  beforeEach(() => {
    mockFetch();
  })

  it("displays initial list", async () => {
    renderComponent();
    expect(await screen.findByText("Un item")).toBeInTheDocument();
  });

  it("disabled button", async () => {
    renderComponent();
    expect(await screen.findByText("Ajouter")).toBeDisabled();
  });

  it("enabled button", async () => {
    renderComponent();
    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "Tomate" } });
    expect(await screen.findByText("Ajouter")).toBeEnabled();
  });

  it("loading state", async () => {
    renderComponent();
    expect(await screen.findByText("Ajouter")).toBeInTheDocument();
  });

  it("add item", async () => {
    renderComponent();
    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "Tomate" } });

    fireEvent.click(await screen.findByText("Ajouter"));

    await sleep(2000);

    expect(await screen.findByText("Tomate")).toBeInTheDocument();
  });
});
