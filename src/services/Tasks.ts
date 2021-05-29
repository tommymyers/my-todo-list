import axios from "axios";
import Task from "../dataModels/Task";
axios.defaults.baseURL = "http://127.0.0.1:3001/";

const getAll = (): Promise<Task[]> => {
  const request = axios.get("/tasks");
  return request.then((response) => response.data);
};

const create = (newTask: Task): Promise<Task> => {
  const request = axios.post("/tasks", newTask);
  return request.then((response) => response.data);
};

const update = (id: number, newTask: Task): Promise<Task> => {
  const request = axios.put(`/tasks/${id}`, newTask);
  return request.then((response) => response.data);
};

const remove = (id: number) => {
  return axios.delete(`/tasks/${id}`);
};

const taskService = {
  getAll,
  create,
  update,
  remove,
};

export default taskService;
