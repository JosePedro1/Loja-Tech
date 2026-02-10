import * as SQLite from 'expo-sqlite';
let db = null;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync('lojatech.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS carrinho (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      preco REAL,
      sincronizado INTEGER DEFAULT 0
    );
  `);
};

export const adicionarAoCarrinho = async (nome, preco, sincronizado = 0) =>
  db.runAsync('INSERT INTO carrinho (nome, preco, sincronizado) VALUES (?, ?, ?)', [nome, preco, sincronizado]);

export const listarCarrinhoLocal = async () => db.getAllAsync('SELECT * FROM carrinho ORDER BY id DESC');
export const listarNaoSincronizados = async () => db.getAllAsync('SELECT * FROM carrinho WHERE sincronizado = 0');
export const marcarComoSincronizado = async (id) => db.runAsync('UPDATE carrinho SET sincronizado = 1 WHERE id = ?', [id]);
export const removerDoCarrinho = async (id) => db.runAsync('DELETE FROM carrinho WHERE id = ?', [id]);
export const limparCarrinho = async () => db.runAsync('DELETE FROM carrinho');
