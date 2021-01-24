const dbVersion = 3;

export default () => {
  const request = indexedDB.open("BooksDetail", dbVersion);
  
  request.onerror = (e) => {
    console.log('Database Error', e);
  }

  request.onsuccess = (e) => {
    console.log('Database Opened');
  }

  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    db.createObjectStore("books",{ keyPath : "bookID"});
    db.createObjectStore("cart",{ keyPath : "bookID"});
  }

  return request;
}
