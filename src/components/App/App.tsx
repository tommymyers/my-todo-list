import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "../../dataModels/Task";
import TaskItem from "../TaskItem/TaskItem";
import SortBy from "../SortBy/SortBy";
import Header from "../Header/Header";
import taskService from "../../services/Tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newestFirst, setNewestFirst] = useState(true);

  const hook = () => {
    taskService
      .getAll()
      .then((initialTasks) => setTasks(initialTasks))
      .catch((error) => console.log(error));
  };
  useEffect(hook, []);

  const sortedTasks = [...tasks].sort(
    (a, b) =>
      new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
  );
  if (newestFirst) sortedTasks.reverse();

  const addTask = (task: Task) => {
    taskService.create(task).then((newTask) => {
      console.log(newTask);
      setTasks(tasks.concat(newTask));
    });
  };

  const toggleTaskCompletion = (task: Task) => {
    const changedTask = { ...task, complete: !task.complete };
    taskService
      .update(task.id!, changedTask)
      .then((updatedTask) => {
        console.log("updated task", updatedTask);
        setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      })
      .catch(() => {
        alert(`the task ${task.text} was deleted`);
        setTasks(tasks.filter((t) => t.id !== task.id));
      });
  };

  const deleteTask = (task: Task) => {
    taskService
      .remove(task.id!)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="App">
      <Header handleNewTask={addTask} />
      <SortBy
        newestFirst={newestFirst}
        onChange={(value) => setNewestFirst(value)}
      />
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCompletionChange={(isComplete: boolean) =>
            toggleTaskCompletion(task)
          }
          onDelete={() => deleteTask(task)}
        />
      ))}
    </div>
  );
};

export default App;
