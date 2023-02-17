require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showListChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";

  /* Creating a new instance of the Tasks class. */
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    /* Calling the inquirerMenu function and assigning the result to the opt variable. */
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        /* Asking the user to input a description. */
        const desc = await readInput("Descripcion:");
        /* Calling the createTask method of the tasks object. */
        tasks.createTask(desc);
        break;
      case "2":
        tasks.completedList();
        break;
      case "3":
        tasks.pendingCompletedList();
        break;
      case "4":
        tasks.pendingCompletedList(false);
        break;
      case "5":
        const ids = await showListChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await listOfTaskToDelete(tasks.listArr);
        if (id !== "0") {
          const confirmation = await confirm("Desea borrarla?");
          if (confirmation) tasks.deleteTask(id);
          console.log("Tarea borrada correctamtne!".green);
        }

        break;
    }

    saveDB(tasks.listArr);

    /* Waiting for the user to press enter. */
    await pause();
  } while (opt !== "0");
};

main();
