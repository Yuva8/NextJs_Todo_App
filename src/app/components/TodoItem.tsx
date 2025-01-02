"use client";

import { Task } from "../store/useTodoStore";
import styles from "../styles/TodoItem.module.css";

interface TodoItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem = ({ task, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={styles.taskItem}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      <span className={task.completed ? styles.completed : ""}>
        {task.name}
      </span>
      <button onClick={onDelete} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
