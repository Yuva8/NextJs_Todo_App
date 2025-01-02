"use client";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./store/useTodoStore";

async function fetchTasks() {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tasks = await response.json();
  return tasks;
}

const Page = () => {
  const setTasks = useTodoStore((state) => state.setTasks);
  const [tasks, setFetchedTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setFetchedTasks(fetchedTasks);
      setTasks(fetchedTasks);
    };

    loadTasks();
  }, [setTasks]);

  return (
    <div className="container">
      <center>
        <h1 className="text-xl font-bold text-gray-800 py-2">Todo List</h1>
      </center>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Page;
