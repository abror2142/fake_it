const dbName = "bookDatabase";
const storeName = "books";
let db;

// Open (or create) the database
const request = indexedDB.open(dbName, 1);

// Create object store when upgrading or creating the database
request.onupgradeneeded = function(event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains(storeName)) {
    const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("author", "author", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Database opened successfully");
};

request.onerror = function(event) {
  console.error("Database error:", event.target.errorCode);
};

function addBook(title, author, description) {
    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);
  
    const book = {
      title: title,
      author: author,
      description: description,
    };
  
    const request = objectStore.add(book);
  
    request.onsuccess = function(event) {
      console.log("Book added to the database", event.target.result);
      displayBooks();
    };
  
    request.onerror = function(event) {
      console.error("Error adding book:", event.target.errorCode);
    };
  }
  