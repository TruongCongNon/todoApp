import { useMemo, useRef, useState } from "react";
import "./App.css";
import TodoItems from "./components/TodoItems";
import Slidebar from "./components/Sidebar/Sidebar";
import FilterPanel from "./components/FilterPanel/FilterPanel";

const App = () => {
  const inputRef = useRef();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [todoList, setTodoList] = useState([
    {
      id: '1',
      name: "Đi học bài",
      isImportant: true,
      isCompleted: true,
      isDeleted: false
    },

    {
      id: '2',
      name: "Đi tập thể dục",
      isImportant: true,
      isCompleted: false,
      isDeleted: false
    },
    {
      id: '3',
      name: "Đi chơi với người yêu ",
      isImportant: false,
      isCompleted: true,
      isDeleted: false
    },
    {
      id: ' 4',
      name: "Đi xem phim  ",
      isImportant: false,
      isCompleted: true,
      isDeleted: false
    },
  ]);

  const handleCompletedCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });

    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      } else {
        return todo;
      }
    });

    setTodoList(newTodoList);
  };

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  // console.log({ todoList })

  const filterTodo = useMemo(() => {
    return todoList.filter(
      todo => {
        switch (selectedFilterId) {
          case "all":
            return true;
          case "completed":
            return todo.isCompleted;
          case "important":
            return todo.isImportant;
          case "deleted":
            return todo.isDeleted;
          default:
            return true;
        }
      }
    )
  }, [selectedFilterId, todoList])

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          className="task-input"
          placeholder="Add new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportant: false,
                  isDeleted: false
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />

        <div>{filterTodo.map((todo) => {
          return (
            <TodoItems
              id={todo.id}
              key={todo.id}
              name={todo.name}
              isImportant={todo.isImportant}
              isCompleted={todo.isCompleted}
              handleCompletedCheckboxChange={handleCompletedCheckboxChange}
              handleTodoItemClick={handleTodoItemClick}
            />
          );
        })}</div>
        {showSidebar && (
          <Slidebar
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default App;
