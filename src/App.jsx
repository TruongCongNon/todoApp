import { useMemo, useRef } from "react";
import "./App.css";
import FilterPanel, { useAppContext } from "./components/FilterPanel/FilterPanel";
import Slidebar from "./components/Sidebar/Sidebar";
import TodoItems from "./components/TodoItems";

const App = () => {
  const inputRef = useRef();
  const { selectedCategoryId, todoList, setTodoList, searchText, selectedFilterId, activeTodoItemId, setActiveTodoItemId, showSidebar, setShowSidebar } = useAppContext()


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
        if (!todo.name.includes(searchText)) {
          return false;
        }
        if (selectedCategoryId && todo.category !== selectedCategoryId) {
          return false
        }
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
  }, [selectedFilterId, todoList, searchText, selectedCategoryId])

  return (
    <div className="container">
      <FilterPanel />
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
                  isDeleted: false,
                  category: 'personal'
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
