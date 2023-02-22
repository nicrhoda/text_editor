import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// put 
export const putDb = async (id, content) => {
  console.log('put request to database');
  // connect to database
  const jateDb = await openDB('jate', 1);
  // transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // opens storage
  const store = tx.objectStore('jate');
  // uses put to add items to storage
  const request = store.put({ id: 1, value: content });
  // confirming that data was entered correctly
  const result = await request;
  console.log('saved', result);
};

// get
export const getDb = async () => {
  console.log('get request to the database');
  // connect to database
  const jateDb = await openDB('jate', 1);
  // transaction
  const tx = jateDb.transaction('jate', 'readonly');
  // opens storage
  const store = tx.objectStore('jate');
  // gathers all of the content
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
