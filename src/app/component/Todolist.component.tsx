import { useEffect, useState } from "react";
import ViewModel from "./viewmodel";
import { useSignalEffect } from "@preact/signals-react";
import "./todolist.css";
import { TodolistType } from "../types";
import { TodoItem } from "../types";

function Todolist() {
  const [input, setInput] = useState("");
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<TodolistType>([]);

  // Afficher l'état initial
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("./data.json");
      const json = await response.json();
      setList(json);
    }
    fetchData();
  }, []);

  // Rajouter un item
  // Afficher un état de chargement
  const onClickValidate = async () => {
    if (input) {
      setIsLoading(true);
      const response = await fetch("./data_add.json");
      const json = await response.json();
      await sleep(1000);
      setList(json);
      setIsLoading(false);
      setInput("");
    }
  };

  // Ne pas autoriser l'ajout d'un item si aucun mot écrit
  const onUpdateInput = (newInput: string) => {
    if (newInput) {
      setIsAddButtonDisabled(false);
    } else {
      setIsAddButtonDisabled(true);
    }
    setInput(newInput);
  };

  return (
    <div className="todolist">
      <div className="todo-edition">
        <input
          data-testid="input"
          value={input}
          onChange={(event) => onUpdateInput(event.target.value)}
        />
        <button onClick={onClickValidate} disabled={isAddButtonDisabled}>
          {!isLoading && "Ajouter"}
          {isLoading && "..."}
        </button>
      </div>
      <div className="list">
        {list.map((item: TodoItem) => (
          <div className="item" key={item.text + item.id}>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todolist;

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
