import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3001/";

const getAll = () => {
  return axios.get("/tasks");
};

const create = newTask => {
  return axios.post("/tasks", newTask)
}

const update = (id, newTask) => {
  return axios.put(`/tasks/${id}`, newTask)
}

const remove = id => {
  return axios.delete(`/tasks/${id}`)
}

const taskService = {
  getAll,
  create,
  update,
  remove
}

export default taskService
