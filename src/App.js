import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const toto = event => {
    setInputTask(event.target.value);
  };

  const bibi = event => {
    event.preventDefault();
    const newTask = [...tasks];
    if (inputTask) {
      newTask.push({ name: inputTask, done: false, id: true });
      setTasks(newTask);
      setInputTask("");
    }
  };

  return (
    <div className="mainPage">
      <div className="titleContainer">
        <h1>TO DO LIST</h1>
      </div>
      <div className="array">
        {tasks.map((element, index) => {
          return (
            <div className="arrayElements">
              <div className="elementContainer">
                <span
                  className={tasks[index].done === true ? "clicked" : "element"}
                  onClick={() => {
                    const newTasks = [...tasks];
                    newTasks[index].done = !newTasks[index].done;
                    console.log(newTasks[index].done);
                    setTasks(newTasks);
                  }}
                >
                  {element.name}
                </span>
              </div>
              <div className="crossContainer">
                <span
                  className="cross"
                  onClick={() => {
                    const newTasks = [...tasks];
                    newTasks.splice(index, 1);
                    setTasks(newTasks);
                  }}
                >
                  x
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <form className="formSubmit" onSubmit={bibi}>
        <input
          value={inputTask}
          onChange={toto}
          placeholder="entrez votre tâche ici"
          className="input"
        />
        <span className="submitButton">Ajoutez votre tâche</span>
      </form>
    </div>
  );
}

export default App;
