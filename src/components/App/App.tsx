import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "../../dataModels/Task";
import TaskItem from "../TaskItem/TaskItem";
import SortBy from "../SortBy/SortBy";
import Header from "../Header/Header";
import taskService from "../../services/Tasks";
import Notification, { NotificationProps } from "../Notification/Notification";
import Footer from "../Footer/Footer";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newestFirst, setNewestFirst] = useState(true);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationProps>();

  const displayNotification = (notification: NotificationProps) => {
    setCurrentNotification(notification);
    setTimeout(() => {
      setCurrentNotification({});
    }, 3000);
  };

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
      displayNotification({
        type: "success",
        message: `Created new task ${task.text}`,
      });
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
      .catch((error) => {
        if (error.response.status === 404) {
          displayNotification({
            type: "error",
            message: `The task ${task.text} was deleted from the server`,
          });
        } else {
          console.log("error occurred when trying to update task", error.response)
        }
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
      <Notification
        message={currentNotification?.message}
        type={currentNotification?.type}
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
      <Footer />
    </div>
  );
};

export default App;
