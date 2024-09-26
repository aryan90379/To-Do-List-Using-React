import { useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage when the component mounts
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [showFinished, setshowFinished] = useState(true);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }



  const saveToLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo(""); // Clear the input field
    saveToLocalStorage(newTodos); // Save to localStorage immediately
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); // Save the updated todos list
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos); // Save the updated todos list
  };

  return (
    <>
      <Navbar />
      <div className="md:container bg-violet-100 rounded-2xl mx-auto md:w-2/3 overflow-auto my-5 p-5 min-h-[70vh]">
        <h1 className='text-center font-bold text-lg'>Task-Master </h1>
        <h3 className="text-center font-bold text-md bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 bg-clip-text text-transparent">
          Manage your task in one place
        </h3>

        <div className="addTodo my-5">
          <h2 className="  m-3  text-2xl font-extrabold text-transparent bg-gradient-to-r from-violet-700 via-pink-600 to-indigo-500 bg-clip-text ">
            Add Tasks
          </h2>



          <div className='flex'>

            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Add your task..."
              className="w-full rounded-lg p-2 bg-white shadow-md border border-transparent focus:border-violet-500 focus:ring-2 focus:ring-violet-300 focus:outline-none transition duration-300 ease-in-out text-gray-700"
            />

            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="ml-2 bg-violet-700 hover:bg-violet-800 disabled:bg-violet-300 text-sm font-semibold text-white p-2 py-1 rounded-md"
            >
              Add
            </button>
          </div>
        </div>
        <div className="previousTasks flex items-center justify-center gap-3 font-bold text-gray-450">
          <input type="checkbox" onChange={toggleFinished} checked={showFinished} className='size-5' />
          <div className='text-lg opacity-75'>ShowFinished</div>
        </div>

        <div className='h-[2px] bg-black w-[90%] align-middle opacity-15 my-4 mx-auto' ></div>

        <h1 className="text-lg font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="flex justify-center bg-emerald-400 rounded-full text-black p-4 font-bold">
              No todos to display
            </div>
          )}
          {todos.map((item, index) => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex justify-center align-top gap-5">
                <input
                  className="w-9"
                  name={item.id}
                  onChange={() => handleCheckbox(item.id)}
                  type="checkbox"
                  checked={item.isCompleted} // Reflects the state of the checkbox
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  <div className="bg-violet-500 text-white p-2 min-w-3/5 rounded-md">
                    {`${item.todo}`}
                  </div>
                </div>
              </div>
              <div className="buttons flex gap-4 h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-violet-700 hover:bg-violet-800 text-sm font-semibold text-white p-2 rounded-md"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-violet-700 hover:bg-violet-800 text-sm font-semibold text-white p-2 rounded-md"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;

