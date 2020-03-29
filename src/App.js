import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/task/read");
    setTasks(response.data);
  };

  const listenInput = event => {
    setInputTask(event.target.value);
  };

  const submit = event => {
    event.preventDefault();
    if (inputTask) {
      axios.post("http://localhost:8000/task/new", {
        name: inputTask,
        done: false
      });
      setInputTask("");
      setUpdate(!update);
    }
  };

  const handleUpdateTask = async id => {
    await axios.post("http://localhost:8000/task/update/" + id);
    setUpdate(!update);
  };

  const handleDeleteTask = async id => {
    await axios.post("http://localhost:8000/task/delete/" + id);
    setUpdate(!update);
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <div className="mainPage">
      <div className="titleContainer">
        <h1>to do list</h1>
      </div>
      <div className="array">
        {tasks.map((task, index) => {
          return (
            <div key={index} className="arrayElements">
              <div className="elementContainer">
                <span
                  onClick={() => {
                    handleUpdateTask(task._id);
                  }}
                  className={task.done === true ? "clicked" : "element"}
                >
                  {task.name}
                </span>
              </div>
              <div
                className="crossContainer"
                onClick={() => {
                  handleDeleteTask(task._id);
                }}
              >
                <span className="cross">x</span>
              </div>
            </div>
          );
        })}
      </div>

      <form className="formSubmit" onSubmit={submit}>
        <input
          value={inputTask}
          onChange={listenInput}
          placeholder="entrez votre tâche ici"
          className="input"
        />
        <span className="submitButton" onClick={submit}>
          +
        </span>
      </form>
    </div>
  );
}

export default App;
