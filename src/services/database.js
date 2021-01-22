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
  // console.log("merge")
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