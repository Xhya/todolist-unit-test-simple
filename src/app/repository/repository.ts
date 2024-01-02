import { RepositoryInterface } from "./repositoryInterface";

export default class Repository implements RepositoryInterface {
  private currentId = "0"

  async getList() {
    const response = await fetch("./data.json");
    const json = await response.json();
    return json
  }

  async addItem(text: string) {
      const response = await fetch("./data.json");
      const json = await response.json();
      const nextId = (parseInt(this.currentId) + 1).toString()
      const item = { text, id: nextId }
      json.push(item)
      return json
  }
}

