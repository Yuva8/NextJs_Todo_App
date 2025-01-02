"use client";

import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";
import styles from "../styles/TodoForm.module.css";

const TodoForm = () => {
  const [taskName, setTaskName] = useState("");
  const addTask = useTodoStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      addTask(taskName);
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
