const inquirer = require("inquirer");
require("colors");

/* Creating a list of options for the user to choose from. */
const questions = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      { value: "1", name: `${"1.".green} Crear tarea` },
      { value: "2", name: `${"2.".green} Listar tareas` },
      { value: "3", name: `${"3.".green} Listar tareas completadas` },
      { value: "4", name: `${"4.".green} Listar tareas pendientes` },
      { value: "5", name: `${"5.".green} Completar tarea(s)` },
      { value: "6", name: `${"6.".green} Borrar tarea(s)` },
      { value: "0", name: `${"0.".green} Salir` },
    ],
  },
];

/**
 * It asks the user to select an option from a list of options
 * @returns The option selected by the user.
 */
const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("  Seleccione una opcion".white);
  console.log("==========================\n".green);

  /* Destructuring the object returned by the inquirer.prompt function. */
  const { option } = await inquirer.prompt(questions);

  return option;
};

/**
 * It waits for the user to press the enter key before continuing.
 */
const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} par continuar`,
    },
  ];
  console.log("\n");
  /* Waiting for the user to press the enter key before continuing. */
  await inquirer.prompt(question);
};

/**
 * It asks the user for input and returns the input.
 * @param message - The message that will be displayed to the user.
 * @returns The value of the input.
 */
const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  /* Destructuring the object returned by the inquirer.prompt function. */
  const { desc } = await inquirer.prompt(question);
  return desc;
};

/**
 * It creates a list of options for the user to choose from, and returns the id of the task the user
 * wants to delete
 * @param [tasks] - An array of objects. Each object represents a task.
 * @returns The id of the task to be deleted.
 */
const listOfTaskToDelete = async (tasks = []) => {
  /* Creating a list of options for the user to choose from. */
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({ value: "0", name: "0.".green + "Cancelar" });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  /* Destructuring the object returned by the inquirer.prompt function. */
  const { id } = await inquirer.prompt(questions);
  return id;
};

/**
 * It asks the user a question and returns true or false depending on the answer
 * @param message - The message to display to the user.
 * @returns The value of the ok property of the object returned by the inquirer.prompt function.
 */
const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

/**
 * It creates a list of options for the user to choose from, and then returns the selected options
 * @param [tasks] - An array of objects. Each object represents a task.
 * @returns An array of ids.
 */
const showListChecklist = async (tasks = []) => {
  console.log();
  /* Creating a list of options for the user to choose from. */
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completedOn ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  /* Destructuring the object returned by the inquirer.prompt function. */
  const { ids } = await inquirer.prompt(questions);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showListChecklist,
};
