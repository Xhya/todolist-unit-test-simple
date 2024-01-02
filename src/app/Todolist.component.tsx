import { useEffect, useState } from "react";
import ViewModel from "./viewmodel";
import { useSignalEffect } from "@preact/signals-react";
import "./todolist.css";

const VM = new ViewModel();

function Todolist() {
  //   const [input, setInput] = useState("");
  //   const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);
  // const [list, setList] = useState<TodolistType>([])

  const state = VM.state
  const input = state.input;
  const list = state.list;
  const isLoading = state.isLoading;
  const isAddButtonDisabled = state.isAddButtonDisabled;

  // On va fetcher la données pour afficher l'état initial
  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await fetch("./data.json");
  //       const json = await response.json();
  //       setList(json);
  //     }
  //     fetchData();
  //   }, []);

  // on écoute sur 'input' pour savoir si le bouton Ajouter est disabled ou non
  //   useEffect(() => {
  //     if (input) {
  //       setIsAddButtonDisabled(false);
  //     } else {
  //       setIsAddButtonDisabled(true);
  //     }
  //   }, [input]);

  useSignalEffect(() => {
    const fetchData = async () => {
      await VM.fetchData();
    };
    fetchData();
  });

  const onClickValidate = () => {
    VM.addItem(input);
  };

  const onUpdateInput = (input: string) => {
    VM.onUpdateInput(input);
  };

  // lors de l'ajout d'un item on met la todo en était de Loading en attendant la réponse serveur
  //   const onClickValidate = async () => {
  //     if (input) {
  //       setIsLoading(true);
  //       const response = await fetch("./data_add.json");
  //       const json = await response.json();
  //       await sleep(2000);
  //       setList(json);
  //       setIsLoading(false);
  //       setInput("");
  //     }
  //   };

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
        {list.map((item, index) => (
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
