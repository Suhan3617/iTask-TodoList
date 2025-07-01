import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const togglefinished = (e) => {
    setshowfinished(!showfinished);
  };

  const handleedit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };
  const handledelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };
  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    savetoLS();
  };
  const handlechange = (e) => {
    setTodo(e.target.value);
  };
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    savetoLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="text-center font-bold text-3xl">
          iTask - The Ulimate Todos Manager
        </h1>
        <div>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mx-auto">Add a Todo</h2>
            <div className="flex gap-3">
              <input
                onChange={handlechange}
                value={todo}
                type="text"
                className="bg-white w-full rounded-lg px-5 py-1"
              />
              <button
                onClick={handleadd}
                disabled={todo.length <= 3}
                className="bg-violet-800 disabled:bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full "
              >
                {" "}
                Save
              </button>
            </div>
          </div>

          <input
            className="my-4"
            onChange={togglefinished}
            type="checkbox"
            checked={showfinished}
          />{" "}
          <label className="mx-2" htmlFor="show">Show Finished</label>
          <div className="h-[1px] bg-black opacity-15 w-5/6 mx-auto" ></div>
          <h2 className="text-xl font-bold my-3">Your Todos</h2>
          <div className=" todos">
            {todos.length === 0 && (
              <div className="m-7">No Todos to display</div>
            )}
            {todos.map((item) => {
              return (
                (showfinished || !item.iscompleted) && (
                  <div
                    key={item.id}
                    className="todo flex justify-between my-3 "
                  >
                    <div className="flex gap-5">
                      <input
                        name={item.id}
                        onChange={handlecheckbox}
                        type="checkbox"
                        checked={item.iscompleted}
                        id=""
                      />
                      <div className={item.iscompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        onClick={(e) => {
                          handleedit(e, item.id);
                        }}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handledelete(e, item.id);
                        }}
                        className="bg-violet-800 hover:bg-violet-950 p-3 py-2 text-sm font-bold text-white rounded-md mx-1"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
