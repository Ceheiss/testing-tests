#### Testing tests
=======================================

This is a series of testing exercises using the super lightweight Javascript unit testing library: "Tinytest.js" and a modification of TinyTest called "SimpleTest.js" developed in the "Watch and Code" series and altered by myself.


The idea is to star reconstructing array methods such as forEach, filter, map and reduce, and continue with different ones in separate files.


The first four methods (forEach, filter, map, and reduce) are done following Watch and Code "Testing" section (although I try the exercises before the videos, so differences are expected). Whatever follows next are exercises on my own.


Finished means it passes all the tests, not perfect code. There are some solutions I think could be better and refactored, and I will in due time.


I've compiled all of the methods so far in a file called *rewriteLibrary.js*. The library is being used in some of these methods as a way of not repeating myself, and putting the former defined methods to the test.

--------------
## To be completed:
1. Array.prototype.forEach --> finished
2. Array.prototype.filter --> finished
3. Array.prototype.map --> finished
4. Array.prototype.reduce --> finished
5. Array.prototype.find --> finished
6. Array.prototype.findIndex --> finished
7. Array.prototype.every --> finished
8. Array.prototype.some --> finished
9. Array.prototype.reduceRight --> in process
10. Array.prototype.concat --> finished
11. Array.prototype.indexOf --> finished
12. Array.prototype.lastIndexOf --> finished 
13. Array.prototype.includes --> finished
14. Array.prototype.slice --> finished
15. Array.prototype.join --> finished
16. Array.prototype.push --> finished
17. Array.prototype.pop --> finished
18. Array.prototype.shift --> finished
19. Array.prototype.unshift --> finished
20. Array.prototype.fill --> in process
21. Array.prototype.reverse --> finished
22. Array.prototype.copyWithin
23. Array.prototype.sort
24. Array.prototype.splice
25. Array.prototype.from --> finished
26. *arrayToObject --> finished
26. *objectUnshift --> finished

* arrayToObject is a helper function that takes an  array and returns an iterable object:
```javascript
    let array = ['a','b','c'];
    let turnedIntoObject = arrayToObject(array);
    // now turnedIntoObject is:
    {0: 'a', 1: 'b', 2: 'c', index: 3};
```
* objectUnshift is another method to unshift objects. Is integrated into unshift, so there is no need to call it by it's own.

