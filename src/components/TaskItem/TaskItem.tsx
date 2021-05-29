import React, { ChangeEvent, useState } from "react";
import Task from "../../dataModels/Task";

interface TaskItemProps {
  task: Task;
  onCompletionChange: (isComplete: boolean) => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onCompletionChange,
  onDelete,
}) => {
  const [completed, setCompleted] = useState(task.complete);
  const { text } = task;
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCompleted(!completed);
          onCompletionChange(completed);
        }}
      />
      {text}
      <button
        onClick={() => {
          onDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
