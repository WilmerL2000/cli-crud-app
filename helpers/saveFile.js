const fs = require("fs");

const file = "./db/data.json";

/**
 * It takes a string and saves it to a file
 * @param data - The data to write to the file.
 */
const saveDB = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
};

module.exports = { saveDB, readDB };
