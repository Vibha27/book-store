import DB from './config';

const onRequestError = (e) => {
  console.log('Database Error', e);
}

 export const  add = (array) => {
  const request = DB ();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const store = db.transaction(["books"], "readwrite").objectStore("books");
    
    // Storing each element in store
    array.forEach(element => {
      store.add(element)
    });
    
  }
}

export const get = (callback) => {
  const request = DB();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['books'], 'readonly');
    const store = transaction.objectStore('books');
    
    store.getAll().onsuccess = (ev) => {
      // Sorting the result from indexeddb
      const sortedArray = sort(ev.target.result);
      callback(sortedArray);
    }
  }
}

export const destroy = () => {

}

const sort = (array) => {
  var len = array.length;
  if(len < 2) { 
    return array;
  }

  var pivot = Math.ceil(len/2);
  return merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
};

 const merge = (left, right) => {
  var result = [];

  while((left.length > 0) && (right.length > 0)) {
    if(left[0].average_rating > right[0].average_rating) {
      result.push(left.shift()); //left array's first element will be pushed to result
    }
    else {
      result.push(right.shift());  //right array's first element will be pushed to result
    }
  }

  result = result.concat(left, right);
  return result;
}

// Add to cart
export const  addToCartDB = (book) => {
  const request = DB ();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const store = db.transaction(["cart"], "readwrite").objectStore("cart");
    const insertRequest = store.put(book);
    // Storing element in store
    insertRequest.onsuccess = (e) => {
      console.log("Newly inserted book id ",e.target.result)
    }
  }
}

export const getCart = (callback) => {
  const request = DB();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['cart'], 'readonly');
    const store = transaction.objectStore('cart');
    
    store.getAll().onsuccess = (ev) => {
      callback(ev.target.result);
      console.log(ev.target.result)
    }
  }
}
export const deleteBookFromCart = (bookId) => {
  const request = DB();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['cart'], 'readwrite');
    const store = transaction.objectStore('cart');
    const deleteRequest = store.delete(bookId)
    deleteRequest.onsuccess = (ev) => {
      console.log("Removed from cart ",ev.target.result)
    }
  }
}
export const deleteAllBookFromCart = () => {
  const request = DB();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['cart'], 'readwrite');
    const store = transaction.objectStore('cart');
    const deleteRequest = store.clear()
    deleteRequest.onsuccess = (ev) => {
      console.log("Payment success deleted all record ",ev.target.result)
    }
  }
}

// For Seaching
export const getSearched = (callback) => {
  const request = DB();
  
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['books'], 'readonly');
    const store = transaction.objectStore('books');
    
    store.getAll().onsuccess = (ev) => {
      // searching the book from indexeddb
      // const searchedArray = binarySearch(ev.target.result);
      // callback(searchedArray);
    }
  }
}