import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
import { useTodoStore } from "../store/useTodoStore";
import "@testing-library/jest-dom";

jest.mock("../store/useTodoStore", () => ({
  useTodoStore: jest.fn(),
}));

describe("TodoList Component", () => {
  it("renders tasks correctly", () => {
    const mockTasks = [
      { id: "1", name: "Task 1", completed: false },
      { id: "2", name: "Task 2", completed: false },
    ];

    const mockedUseTodoStore = useTodoStore as jest.MockedFunction<
      typeof useTodoStore
    >;
    mockedUseTodoStore.mockImplementation((selector) =>
      selector({
        tasks: mockTasks,
        addTask: jest.fn(),
        toggleTaskCompletion: jest.fn(),
        deleteTask: jest.fn(),
        setTasks: jest.fn(),
      })
    );

    render(<TodoList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("verifies task toggling works as expected", () => {
    const mockTasks = [
      { id: "1", name: "Task 1", completed: false },
      { id: "2", name: "Task 2", completed: false },
    ];

    const mockToggleTaskCompletion = jest.fn();
    const mockedUseTodoStore = useTodoStore as jest.MockedFunction<
      typeof useTodoStore
    >;
    mockedUseTodoStore.mockImplementation((selector) =>
      selector({
        tasks: mockTasks,
        addTask: jest.fn(),
        toggleTaskCompletion: mockToggleTaskCompletion,
        deleteTask: jest.fn(),
        setTasks: jest.fn(),
      })
    );

    render(<TodoList />);

    const taskName = screen.getByText("Task 1");
    const checkbox = taskName.previousElementSibling as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(mockToggleTaskCompletion).toHaveBeenCalledWith("1");
  });
});
