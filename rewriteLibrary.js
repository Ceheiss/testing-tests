(function(root) {
  const rewritenFunctions = {

    arrayFrom: function(iterable, callback, optionalThisObject) {
      let transformedArray = [];
      if (typeof iterable === "object" && !iterable.hasOwnProperty(length)) {
        return transformedArray;
      }
      for (let i = 0; i < iterable.length; i++) {
        this.push(transformedArray, iterable[i]);
      }
      // if second parameter is provided
      if (callback) {
        if (optionalThisObject) {
          return this.map(transformedArray, callback, optionalThisObject);
        }
        return this.map(transformedArray, callback);
      }
      return transformedArray;
    },

    arrayToObject: function(array) {
      let arrayLength = array.length;
      let returnedObject = {};
      if (Array.isArray(array)) {
        for (let i = 0; i < arrayLength; i++) {
          returnedObject[i] = array[i];
        }
        returnedObject.length = arrayLength;
      } else {
        throw new TypeError("Please provide an array");
      }
      return returnedObject;
    },

    concat: function(originalArray) {
      let returnedArray = [];
      // returns a shallow copy of the original array
      for (let i = 0; i < originalArray.length; i++) {
        this.push(returnedArray, originalArray[i]);
      }
      // handles all the possible extra arguments
      for (let i = 1; i < arguments.length; i++) {
        let currentArgument = arguments[i];
        // handle if it's array
        if (Array.isArray(currentArgument)) {
          for (let i = 0; i < currentArgument.length; i++) {
            this.push(returnedArray, currentArgument[i]);
          }
          // handle if it's not an array
        } else {
          this.push(returnedArray, currentArgument);
        }
      }
      return returnedArray;
    },

    every: function(array, callback, optionalThis) {
      let newCallback = callback;
      let validIndexArray = Object.keys(array);

      if (optionalThis) {
        newCallback = newCallback.bind(optionalThis);
      }

      if (validIndexArray.length === 0) {
        return true;
      }

      for (let i = 0; i < array.length; i++) {
        // check for unassigned values (holes)
        if (i in array) {
          if (!newCallback(array[i], i, array)) {
            return false;
          }
        }
      }
      return true;
    },

    filter: function(array, callback, optionalThisObject) {
      if (optionalThisObject) {
        callback = callback.bind(optionalThisObject);
      }
      let filteredArray = [];
      for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
          this.push(filteeredArray, array[i]);
        }
      }
      return filteredArray;
    },

    find: function(array, callback, optionalThis) {
      let newCallback = callback;
      if (optionalThis) {
        newCallback = newCallback.bind(optionalThis);
      }
      let returnedValue;
      for (let i = 0; i < array.length; i++) {
        returnedValue = newCallback(array[i], i, array);
        if (returnedValue) {
          return array[i];
        }
      }
      return undefined;
    },

    findIndex: function(array, callback, optionalThis) {
      let newCallback = callback;
      if (optionalThis) {
        newCallback = newCallback.bind(optionalThis);
      }
      for (let i = 0; i < array.length; i++) {
        if (newCallback(array[i], i, array)) {
          return i;
        }
      }
      return -1;
    },

    forEach: function(array, callback, optionalThisObject) {
      if (optionalThisObject) {
        callback = callback.bind(optionalThisObject);
      }
      for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
      }
    },

    includes: function(array, valueToFind, fromIndex) {
      let startingFrom = 0;
      if (fromIndex) {
        startingFrom = fromIndex;
      }
      if (Array.isArray(array)) {
        for (let i = startingFrom; i < array.length; i++) {
          if (array[i] === valueToFind) {
            return true;
          }
        }
        return false;
      } else {
        throw new TypeError("First argument should be an array");
      }
    },

    indexOf: function(array, searchElement, fromIndex) {
      if (Array.isArray(array)) {
        // default value
        let startingIndex = 0;
        if (fromIndex) {
          fromIndex = parseInt(fromIndex);
          // check if it's NaN
          if (fromIndex !== fromIndex) {
            startingIndex = 0;
          } else {
            startingIndex = fromIndex;
          }
        }
        let returnedValue;
        if (fromIndex >= array.length) {
          return -1;
        }
        for (let i = startingIndex; i < array.length; i++) {
          if (array[i] === searchElement) {
            returnedValue = i;
            return returnedValue;
          }
        }
        return -1;
      } else {
        throw new TypeError("First argument should be an array");
      }
    },

    join: function(array, separator) {
      let separatingValue = ",";
      if (separator) {
        separatingValue = separator;
      }
      let returnedString = "";
      for (let i = 0; i < array.length; i++) {
        returnedString += array[i];
        if (i < array.length - 1) {
          returnedString += separatingValue;
        }
      }
      return returnedString;
    },

    lastIndexOf: function(array, searchElement, fromIndex) {
      if (Array.isArray(array)) {
        if (fromIndex === 0) {
          return -1;
        }
        let startingIndex = array.length - 1;
        if (fromIndex) {
          if (fromIndex > 0) {
            startingIndex = fromIndex;
          }
        }
        for (let i = startingIndex; i > -1; i--) {
          if (array[i] == searchElement) {
            return i;
          }
        }
        return -1;
      } else {
        throw new TypeError("First argument should be an array");
      }
    },

    map: function(array, callback, optionalThis) {
      let mappedArray = [];
      let mapCallback = callback;
      if (optionalThis) {
        mapCallback = callback.bind(optionalThis);
      }
      for (let i = 0; i < array.length; i++) {
        // propertyName in object; --> name in person;
        // We use that to skip unassigned properties
        if (i in array) {
          let mappedValue = mapCallback(array[i], i, array);
          mappedArray[i] = mappedValue;
        }
      }
      return mappedArray;
    },

    objectUnshift: function(object) {
      let acceptableObject =
        typeof object === "object" && object.length && !Array.isArray(object);
      let newElementsNumber = arguments.length - 1;
      let originalObjectLength = object.length;
      let newLength = newElementsNumber + originalObjectLength;
      delete object.length;
      if (acceptableObject) {
        for (let i = originalObjectLength; i > -1; i--) {
          object[i + newElementsNumber - 1] = object[i - 1];
        }
        for (let i = newElementsNumber - 1; i > -1; i--) {
          object[i] = arguments[i + 1];
        }
        object.length = newLength;
      }
      return object.length;
    },

    pop: function(iterable) {
      let nonArrayAcceptableObject =
        typeof iterable === "object" &&
        iterable.length &&
        !Array.isArray(iterable);
      let acceptableIterable =
        Array.isArray(iterable) || nonArrayAcceptableObject;

      if (acceptableIterable) {
        // handling array iterables
        if (Array.isArray(iterable)) {
          if (iterable.length === 0) {
            return undefined;
          } else {
            let lastElement = iterable[iterable.length - 1];
            iterable.length = iterable.length - 1;
            return lastElement;
          }
        }
        // handling iterables that are not arrays
        if (nonArrayAcceptableObject) {
          let lastElement = iterable.length - 1;
          let deletedElement = iterable[lastElement];
          delete iterable[lastElement];
          iterable.length--;
          return deletedElement;
        }
      } else {
        throw new TypeError("pop should take an array or iterable object");
      }
    },

    push: function(iterable) {
      let isAnAcceptableObject =
        typeof iterable === "object" && iterable.length;
      let isIterableAcceptable =
        Array.isArray(iterable) || isAnAcceptableObject;

      if (isIterableAcceptable) {
        let startingPoint = iterable.length;
        if (arguments.length > 1) {
          for (let i = 1; i < arguments.length; i++) {
            iterable[startingPoint] = arguments[i];
            startingPoint++;
          }
        }
        // handling iterables that are not arrays
        if (!Array.isArray(iterable) && typeof iterable === "object") {
          iterable.length += arguments.length - 1;
        }
        return iterable.length;
      } else {
        throw new TypeError("Enter an array or an iterable object");
      }
    },

    reduce: function(array, callback, initialValue) {
      let resultSoFar = initialValue;
      let startingIndex = 0;
      let length = array.length;
      let validIndexArray = Object.keys(array);
      // If no initialValue
      if (arguments.length < 3) {
        if (validIndexArray.length === 0) {
          // constructor to make a TypeError
          throw new TypeError("Reduce of empty array with no initial value");
        }
        // If array has one element, just return it (checks holes)
        if (validIndexArray.length === 1) {
          let onlyIndex = validIndexArray[0];
          let onlyElement = array[onlyIndex];
          return onlyElement;
        }
        // this checks that if no initialValue, we don't start with a hole
        // index in array returns a boolean (results depend whether there is a value to that index, that is why is useful for fixing holes)
        while (startingIndex in array === false && startingIndex < length) {
          startingIndex++;
        }
        resultSoFar = array[startingIndex];
        startingIndex++;
      } else {
        // Return if no array
        if (validIndexArray.length === 0) {
          return resultSoFar;
        }
      }

      for (let i = startingIndex; i < length; i++) {
        // if in array checks for holes
        if (i in array) {
          resultSoFar = callback(resultSoFar, array[i], i, array);
        }
      }
      return resultSoFar;
    },

    reverse: function(iterable) {
      let usedToBeObject = false;
      if (typeof iterable === "object" && !Array.isArray(iterable)) {
        usedToBeObject = true;
        iterable = this.arrayFrom(iterable);
      }
      if (Array.isArray(iterable)) {
        let reversedArray = [];
        for (let i = iterable.length - 1; i > -1; i--) {
          this.push(reversedArray, iterable[i]);
        }
        // Hacky way to mutate the original array
        for (let i = 0; i < reversedArray.length; i++) {
          iterable.shift();
          this.push(iterable, reversedArray[i]);
        }
        // Back to object
        if (usedToBeObject) {
          iterable = this.arrayToObject(iterable);
        }
        return iterable;
      } else {
        throw new TypeError("First argument must be iterable");
      }
    },

    shift: function(iterable) {
      let returnedValue = iterable[0];
      reverse(iterable);
      pop(iterable);
      reverse(iterable);
      return returnedValue;
    },
    slice: function(array, begin, end) {
      let endingValue = array.length;
      let startingValue = 0;
      let slicedArray = [];
      if (begin) {
        startingValue = begin;
        if (begin > array.length) {
          return slicedArray;
        }
        if (begin < 0) {
          startingValue = Number(begin) + Number(array.length);
        }
      }
      // Take care of negatives values
      if (end && end < endingValue) {
        if (end < 0) {
          endingValue = array.length - end;
        } else {
          endingValue = end;
        }
      }
      for (let i = startingValue; i < endingValue; i++) {
        slicedArray.push(array[i]);
      }
      return slicedArray;
    },

    some: function(array, callback, optionalThisObject) {
      let someCallback = callback;
      if (optionalThisObject) {
        someCallback = callback.bind(optionalThisObject);
      }
      for (let i = 0; i < array.length; i++) {
        // checks for holes
        if (i in array) {
          if (someCallback(array[i], i, array)) {
            return true;
          }
        }
      }
      return false;
    },

    unshift: function(iterable) {
      let nonArrayAcceptableObject =
        typeof iterable === "object" &&
        iterable.length &&
        !Array.isArray(iterable);
      let acceptableIterable =
        Array.isArray(iterable) || nonArrayAcceptableObject;
      let passedArguments = [];
      for (let i = 1; i < arguments.length; i++) {
        this.push(passedArguments, arguments[i]);
      }
      if (acceptableIterable) {
        // handle if it's not an array;
        if (nonArrayAcceptableObject) {
          this.objectUnshift(iterable, ...passedArguments);
        } else {
          let iterableLength = iterable.length;
          let arr = [];
          for (let i = 0; i < passedArguments.length; i++) {
            this.push(arr, passedArguments[i]);
          }
          this.forEach(iterable, function(el) {
            this.push(arr, el);
          });
          for (let i = 0; i < iterableLength; i++) {
            this.pop(iterable);
          }
          this.forEach(arr, function(el) {
            this.push(iterable, el);
          });
        }
        return iterable.length;
      } else {
        throw new TypeError(
          "Enter an Array or an Array like Object as first parameter"
        );
      }
    }
  };
  root.rw = rewritenFunctions;
})(this);
