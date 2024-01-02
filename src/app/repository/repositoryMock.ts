import { RepositoryInterface } from "./repositoryInterface";
import { TodolistType } from "../types";

export default class RepositoryMock implements RepositoryInterface {
  private currentId = "0";
  private _list: TodolistType = [
    {
      id: this.currentId,
      text: "Un item",
    },
  ];

  keepLoadState = false;

  getList(): Promise<TodolistType> {
    return new Promise((resolve) => {
      if (!this.keepLoadState) {
        setTimeout(() => resolve(this._list), 500);
      }
    });
  }

  addItem(text: string) {
    return new Promise<TodolistType>((resolve) => {
      if (!this.keepLoadState) {
        const nextId = (parseInt(this.currentId) + 1).toString();
        const item = { text, id: nextId };
        this._list.push(item);
        setTimeout(() => resolve(this._list), 500);
      }
    });
  }
}
