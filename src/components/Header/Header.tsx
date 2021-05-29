import React, { useState } from "react";
import Task from "../../dataModels/Task";

interface HeaderProps {
  handleNewTask: (task: Task) => void;
}

const Header: React.FC<HeaderProps> = ({ handleNewTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleTaskFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  return (
    <div className="header">
      <h1>To do list</h1>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const task: Task = {
            text: newTask,
            complete: false,
            dateCreated: new Date().toISOString(),
          };
          handleNewTask(task);
          setNewTask("");
        }}
      >
        <input
          placeholder="a new task..."
          value={newTask}
          onChange={handleTaskFormChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default Header;
