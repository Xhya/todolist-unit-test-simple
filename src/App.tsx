import Todolist from "./app/component/Todolist.component";
import Repository from "./app/repository/repository";

function App() {
  const repository = new Repository()
  
  return (
    <div className="container">
      <Todolist/>
    </div>
  );
}

export default App;
