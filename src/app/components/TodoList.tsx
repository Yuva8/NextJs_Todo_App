"use client";

import { Task, useTodoStore } from "../store/useTodoStore";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

const TodoList = () => {
  const tasks = useTodoStore((state) => state.tasks) || [];
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const toggleTaskCompletion = useTodoStore(
    (state) => state.toggleTaskCompletion
  );

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={() => toggleTaskCompletion(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
