const Task = require("./task");

class Tasks {
  _list = {};

  /**
   * Iterating over the keys of the object and pushing the values into an array.
   * @returns An array of objects.
   */
  get listArr() {
    const list = [];

    /* Iterating over the keys of the object and pushing the values into an array. */
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  /**
   * It deletes a task from the list.
   * @param [id] - The id of the task to delete.
   */
  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  /* A method that takes an array of tasks and adds them to the list. */
  loadTasksFromArray = (tasks = []) => {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  };

  /**
   * It creates a new task object and adds it to the list
   * @param [desc] - The description of the task.
   */
  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  /**
   * It loops through the listArr array and prints out the index, description, and status of each task.
   */
  completedList() {
    console.log();
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completedOn } = task;
      const status = completedOn ? "Completed".green : "Pending".red;

      console.log(`${idx}. ${desc} :: ${status}`);
    });
  }

  /**
   * If the completed parameter is true, then the function will print out the completed tasks,
   * otherwise it will print out the pending tasks.
   *
   * The function uses a forEach loop to iterate through the listArr array. For each task in the array,
   * the function will print out the task description and the status of the task.
   *
   * The counter variable is used to
   * @param [completed=true] - true/false
   */
  pendingCompletedList(completed = true) {
    console.log();
    let counter = 0;
    this.listArr.forEach((task) => {
      const { desc, completedOn } = task;
      const status = completedOn ? "Completed".green : "Pending".red;

      if (completed) {
        if (completedOn) {
          counter++;
          console.log(
            `${counter.toString().green}. ${desc} :: ${completedOn.green}`
          );
        }
      } else {
        if (!completedOn) {
          counter++;
          console.log(`${counter.toString().green}. ${desc} :: ${status}`);
        }
      }
    });
  }

  /**
   * The function takes an array of ids as an argument and loops through the array. If the task is not
   * completed, it sets the completedOn property to the current date. If the task is completed, it sets
   * the completedOn property to null.
   * @param [ids] - An array of ids of the tasks that are to be marked as completed.
   */
  toggleCompleted(ids = []) {
    /* Looping through the ids array and setting the completedOn property of each task to the current
    date. */
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedOn) {
        task.completedOn = new Date().toISOString();
      }
    });

    /* Looping through the listArr array and setting the completedOn property of each task to null. */
    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedOn = null;
      }
    });
  }
}

module.exports = Tasks;
