import { create } from "zustand";
import { devtools } from "zustand/middleware"; // Import devtools middleware

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TodoStore {
  tasks: Task[];
  addTask: (name: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTodoStore = create<TodoStore>()(
  devtools((set) => ({
    tasks: [],
    addTask: (name) =>
      set((state) => ({
        tasks: [
          ...state.tasks,
          { id: (state.tasks.length + 1).toString(), name, completed: false },
        ],
      })),
    toggleTaskCompletion: (id) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      })),
    deleteTask: (id) =>
      set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== id);

        const reindexedTasks = updatedTasks.map((task, index) => ({
          ...task,
          id: (index + 1).toString(),
        }));
        return { tasks: reindexedTasks };
      }),
    setTasks: (tasks) => set({ tasks }),
  }))
);
