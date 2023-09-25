import db from "./dbServes";

const createNoteTable = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS note (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT,
          main TEXT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      );
    });
  } catch (error) {
    alert(error);
  }
};

const createNoteItem = (name, main) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO note (name, main) VALUES (?, ?)", [
        name,
        main,
      ]);
    });
  } catch (error) {
    alert(error);
  }
};

const getNote = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM note",
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const data = [];
            for (let i = 0; i < results.rows.length; i++) {
              data.push(results.rows.item(i));
            }
            resolve(data);
          } else {
            resolve([]);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

const updateNote = (id, name, main) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("UPDATE note SET name = ?, main = ? WHERE id = ?;", [
        name,
        main,
        id,
      ]);
    });
  } catch (error) {
    alert(error);
  }
};

const deleteNote = (id) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM note WHERE id=?", [id]);
    });
  } catch (error) {
    alert(error);
  }
};

export { createNoteTable, createNoteItem, getNote, updateNote, deleteNote };
