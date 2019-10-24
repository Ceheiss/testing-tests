function forEach(array, callback, optionalThisObject){
    if (optionalThisObject){
      callback = callback.bind(optionalThisObject);
    }
    for (var i = 0; i < array.length; i++){
      callback(array[i], i, array);
    }
};

function map(array, callback, optionalThis){
    let mappedArray = [];
    let mapCallback = callback;
    if (optionalThis) {
      mapCallback = callback.bind(optionalThis);
    }
    for(let i = 0; i <  array.length; i++){
       // propertyName in object; --> name in person;
       // We use that to skip unassigned properties
      if (i in array){
        let mappedValue = mapCallback(array[i], i, array);
        mappedArray[i] = mappedValue;
      }
    }
    return mappedArray
};

function reduce (array, callback, initialValue){
    let resultSoFar = initialValue;
    let startingIndex = 0;
    let length = array.length;
    let validIndexArray = Object.keys(array);
    // If no initialValue
    if(arguments.length < 3) {
      if(validIndexArray.length === 0){
        // constructor to make a TypeError
        throw new TypeError('Reduce of empty array with no initial value');
      }
      // If array has one element, just return it (checks holes)
      if (validIndexArray.length === 1) {
        let onlyIndex = validIndexArray[0];
        let onlyElement = array[onlyIndex];
        return onlyElement;
      }
      // this checks that if no initialValue, we don't start with a hole
      // index in array returns a boolean (results depend whether there is a value to that index, that is why is useful for fixing holes)
      while(startingIndex in array === false && startingIndex < length){
        startingIndex++;
      }
      resultSoFar = array[startingIndex];
      startingIndex++;
    } else {
      // Return if no array
      if (validIndexArray.length === 0){
        return resultSoFar;
      }
    }

    for(let i = startingIndex; i < length; i++){
      // if in array checks for holes
      if (i in array){
        resultSoFar = callback(resultSoFar, array[i], i, array);
      }
    }
    return resultSoFar
};

function indexOf(array, searchElement, fromIndex){
    if(Array.isArray(array)){
      // default value
      let startingIndex = 0;
      if (fromIndex) {
        startingIndex = fromIndex;
      }
      let returnedValue;
      if (fromIndex >= array.length) {
        return -1;
      }
      if (Array.isArray(array)){
        for(let i = startingIndex; i < array.length; i++){
          if(array[i] === searchElement){
            returnedValue = i;
            return returnedValue
          }
        }
        return -1;
      }
    } else {
      throw new TypeError('First argument should be an array');
    }
};

function arrayFrom(iterable, callback, optionalThisObject){
    let transformedArray = [];
    if((typeof iterable === "object") && (!iterable.hasOwnProperty(length))){
        return transformedArray;
    }
    for (let i = 0; i < iterable.length; i++) {
        transformedArray.push(iterable[i]);
    }
    // if second parameter is provided
    if (callback){
        if(optionalThisObject){
            return map(transformedArray, callback, optionalThisObject);
        }
        return map(transformedArray, callback);
    }
    return transformedArray;
}

function reverse(iterable){
  let usedToBeObject = false;
  if((typeof iterable === "object") && (!Array.isArray(iterable))){
      usedToBeObject = true;
      iterable = arrayFrom(iterable);
  }
  if(Array.isArray(iterable)){
      let reversedArray = [];
      for(let i = iterable.length - 1; i > -1; i--){
          push(reversedArray, iterable[i]);
      }
      // Hacky way to mutate the original array
      for(let i = 0; i < reversedArray.length; i++){
          iterable.shift();
          push(iterable, reversedArray[i]);
      }
      // Back to object
      if(usedToBeObject){
          iterable = arrayToObject(iterable);
      }
      return iterable;
  } else {
      throw new TypeError("First argument must be iterable");
  }
}

function arrayToObject(array){
    let arrayLength = array.length;
    let returnedObject = {};
    if (Array.isArray(array)){
        for(let i = 0; i < arrayLength; i++){
            returnedObject[i] = array[i];
        }
        returnedObject.length = arrayLength;
    } else {
        throw new TypeError("Please provide an array");
    }
    return returnedObject;
}

function push(iterable){
  let isAnAcceptableObject = (typeof iterable === 'object') && iterable.length; 
  let isIterableAcceptable = Array.isArray(iterable) || isAnAcceptableObject;

  if(isIterableAcceptable){
    let startingPoint = iterable.length;
    if (arguments.length > 1) {
      for(let i = 1; i < arguments.length; i++){
        iterable[startingPoint] = arguments[i];
        startingPoint++;
      }
    }
    // handling iterables that are not arrays
    if(!Array.isArray(iterable) && (typeof iterable === 'object')){
      iterable.length += arguments.length - 1;
    }
    return iterable.length;
  } else {
    throw new TypeError("Enter an array or an iterable object");
  }
}

function pop(iterable){
  let nonArrayAcceptableObject = (typeof iterable === 'object') && iterable.length && !Array.isArray(iterable); 
  let acceptableIterable = Array.isArray(iterable) || nonArrayAcceptableObject;
  
  if (acceptableIterable) {
       // handling array iterables
  if (Array.isArray(iterable)){
          if(iterable.length === 0) {
              return undefined;
          } else {
              let lastElement = iterable[iterable.length - 1];
              iterable.length = iterable.length - 1;
              return lastElement;
          }
      } 
      // handling iterables that are not arrays
      if(nonArrayAcceptableObject){
          let lastElement = iterable.length - 1;
          let deletedElement = iterable[lastElement];
          delete iterable[lastElement];
          iterable.length--;
          return deletedElement;
      }
  } else {
      throw new TypeError("pop should take an array or iterable object");
  }
}