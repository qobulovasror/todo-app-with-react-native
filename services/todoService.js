import db from "./dbServes";

const createTodoTable = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS todo (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT,
          description TEXT,
          subItem TEXT, 
          dueDate TIMESTAMP,
          status TEXT, 
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      );
    });
  } catch (error) {
    alert(error);
  }
};

const getTodo = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todo",
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const todo = [];
            for (let i = 0; i < results.rows.length; i++) {
              todo.push(results.rows.item(i));
            }
            resolve(todo);
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

const updateTodo = (...params)=>{
  // const {id, name} = params
}

const deleteTodo = (id)=>{

}

export {createTodoTable, getTodo, updateTodo, deleteTodo}