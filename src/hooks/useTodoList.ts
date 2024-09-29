import { setStorage, getStorage } from "utils/storage";
import { useState, useEffect } from "react";
import { TODO_STORAGE_KEY } from "utils/constant";
import { TodoListItem } from "../types/todoItem";
const initItems: TodoListItem[] = [
  {
    id: "1",
    name: "Learn React",
    isComplete: false,
  },
  {
    id: "2",
    name: "Learn TypeScript",
    isComplete: true,
  },
  {
    id: "3",
    name: "Learn Redux",
    isComplete: false,
  },
  {
    id: "4",
    name: "Learn Redux Toolkit",
    isComplete: true,
  },
  {
    id: "5",
    name: "Learn React Query",
    isComplete: false,
  },
  {
    id: "6",
    name: "Learn React Router",
    isComplete: false,
  },
];

const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  const initTodoList = async () => {
    const data = (await getStorage(TODO_STORAGE_KEY)) as TodoListItem[];
    try {
      const todoList = data ? data : [];
      if (data) {
        setTodoList(todoList);
      } else {
        setTodoList(initItems);
        void setStorage(TODO_STORAGE_KEY, initItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = (newTodo: TodoListItem) => {
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    void setStorage(TODO_STORAGE_KEY, newTodoList);
  };
  const toggleTodo = (index: number) => {
    const newTodoList = todoList.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });
    setTodoList(newTodoList);
    void setStorage(TODO_STORAGE_KEY, newTodoList);
  };

  const removeTodo = (index: number) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    void setStorage(TODO_STORAGE_KEY, newTodoList);
  };

  const clearAllCompleted = () => {
    const newTodoList = todoList.filter((todo) => !todo.isComplete);
    setTodoList(newTodoList);
    void setStorage(TODO_STORAGE_KEY, newTodoList);
  };
  const clearAllActive = () => {
    const newTodoList = todoList.filter((todo) => todo.isComplete);
    setTodoList(newTodoList);
    void setStorage(TODO_STORAGE_KEY, newTodoList);
  };
  const updateTodo = (newItem: TodoListItem) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newItem.id) {
        return newItem;
      }
      return todo;
    });
    setTodoList(newTodoList);
    void setStorage(TODO_STORAGE_KEY, newTodoList);
  };

  useEffect(() => {
    void initTodoList();
  }, []);
  const activeItems = todoList.filter((todo) => !todo.isComplete).length;
  return {
    todoList,
    activeItems,
    toggleTodo,
    addTodo,
    updateTodo,
    removeTodo,
    clearAllCompleted,
    clearAllActive,
  };
};

export default useTodoList;
