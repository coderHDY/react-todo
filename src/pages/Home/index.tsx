import React, { useState, useEffect } from "react";
import useTodoList from "hooks/useTodoList";
import { v4 as uuidv4 } from "uuid";
import { TodoListItem } from "../../types/todoItem";
import Checkbox from "../../components/Checkbox";
import styles from "./index.module.css";

const Home: React.FC = () => {
  const {
    todoList,
    addTodo,
    toggleTodo,
    clearAllCompleted,
    clearAllActive,
    activeItems,
  } = useTodoList();

  const [newTodo, setNewTodo] = useState<TodoListItem>({
    id: uuidv4(),
    name: "",
    isComplete: false,
  });

  const addNewTodo = (e: KeyboardEvent) => {
    if (e.key === "Enter" && newTodo.name.trim() !== "") {
      console.log(e.key);
      addTodo({
        ...newTodo,
        id: uuidv4(),
      });
      setNewTodo({
        id: uuidv4(),
        name: "",
        isComplete: false,
      });
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", addNewTodo);
    return () => {
      window.removeEventListener("keydown", addNewTodo);
    };
  });
  const onNewEventCompleteChange = (newVal: boolean) => {
    setNewTodo({
      ...newTodo,
      isComplete: newVal,
    });
  };
  return (
    <div className={styles.todoContainer}>
      <div className={styles.title}>TODO</div>
      <div className={styles.inputContainer}>
        <Checkbox checked={true} onChange={onNewEventCompleteChange} />
        <input
          type="text"
          placeholder="Crate a new todo..."
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
      </div>
      <div className={styles.listContainer}>
        {todoList.map((todo, index) => (
          <div className={styles.itemContainer} key={todo.id}>
            <Checkbox
              checked={todo.isComplete}
              onChange={() => toggleTodo(index)}
            />
            <div
              className={`${styles.itemName} ${
                todo.isComplete ? styles.complete : ""
              }`}
            >
              {todo.name}
            </div>
          </div>
        ))}

        <div className={styles.controller}>
          <div className={styles.itemCount}>{activeItems} items left</div>
          <button onClick={clearAllCompleted}>All Active Completed</button>
          <button onClick={clearAllActive}>Clear Completed</button>
        </div>
      </div>

      <div className={styles.footer}>
        <div>
          Challenge by
          <a
            href="https://coderhdy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            coderHDY
          </a>
        </div>
        <div>
          Coded by
          <a
            href="https://coderhdy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            coderHDY
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
