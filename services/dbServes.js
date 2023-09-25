import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.todo')
export default db 