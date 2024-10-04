import * as SQLite from "expo-sqlite";

const postsQuery = `
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS posts (uid TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, thumbnail TEXT NOT NULL, video TEXT NOT NULL, description TEXT NOT NULL, author TEXT NOT NULL, createdAt TEXT NOT NULL);
`;

function generateUID(length = 28) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uid += chars[randomIndex];
  }
  return uid;
}

async function getDb() {
  const db = await SQLite.openDatabaseAsync("moviefy");
  return db;
}

export async function createTables() {
  try {
    const db = await getDb();
    await db.execAsync(postsQuery);
    return {
      status: 200,
      message: "tables created successfully!",
      data: null,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
}

export async function insertData(table, data) {
  try {
    const tableData = { uid: generateUID(), ...data };
    const db = await getDb();
    const columns = Object.keys(tableData)
      .filter((column) => column !== "")
      .join(", ");
    const values = Object.values(tableData).filter((value) => value !== "");
    const questionMarks = Object.values(tableData)
      .filter((value) => !!value)
      .map(() => "?")
      .join(", ");
    const query = `INSERT INTO ${table} (${columns}) VALUES (${questionMarks})`;
    const result = await db.runAsync(query, values);
    return {
      status: 200,
      message: "data inserted successfully!",
      data: result.lastInsertRowId,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
}

export async function selectData(table) {
  try {
    const db = await getDb();
    const query = `SELECT * FROM ${table}`;
    const allRows = await db.getAllAsync(query);
    return {
      status: 200,
      message: "data selected successfully!",
      data: allRows,
    };
  } catch (error) {
    return {
      status: 400,
      message: `cannot select table ${table}`,
      data: null,
    };
  }
}

export async function dropTable(table) {
  try {
    const db = await getDb();
    await db.execAsync(`DROP TABLE ${table}`);
    return {
      status: 200,
      message: `table droped successfully!`,
      data: null,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
}
