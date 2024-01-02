import { fireEvent, render, screen } from "@testing-library/react";
import Todolist, { sleep } from "./Todolist.component";
import { TodoItem } from "../types";

describe.skip("Todolist Component", () => {
  const fakeTodo = [{ id: "0", text: "Salade" } as TodoItem];
  const fakeTodoAdd = [{ id: "0", text: "Salade" }, { id: "1", text: "Tomate" }];

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

  it("displays initial list", async () => {
    mockFetch();

    render(<Todolist />);
    expect(await screen.findByText("Salade")).toBeInTheDocument();
  });

  it("disabled button", async () => {
    mockFetch();

    render(<Todolist />);
    expect(await screen.findByText("Ajouter")).toBeDisabled();
  });

  it("enabled button", async () => {
    mockFetch();

    render(<Todolist />);
    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "Tomate" } });
    expect(await screen.findByText("Ajouter")).toBeEnabled();
  });

  it("loading state", async () => {
    mockFetch();

    render(<Todolist />);
    expect(await screen.findByText("Ajouter")).toBeInTheDocument();
  });

  it("add item", async () => {
    mockFetch();

    render(<Todolist />);
    const input = await screen.findByTestId("input");
    fireEvent.change(input, { target: { value: "Tomate" } });

    fireEvent.click(await screen.findByText("Ajouter"));

    await sleep(2000);

    expect(await screen.findByText("Tomate")).toBeInTheDocument();
  });
});
