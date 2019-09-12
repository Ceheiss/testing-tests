/**
 * Modification to TinyTest called SimpleTest
 * Functionality is the same one, so I will keep the description below:
 * 
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */


const SimpleTestHelper = {
  renderStats: function(failures, successes){
    // General styling
    document.body.style.fontFamily = "arial";
    document.body.style.textAlign = "center";
    // Message
    let numberOfTests = failures + successes;
    let statisticsText = "Ran " + numberOfTests + " tests: " + successes + " passed, and " + failures + " failed."
    // Display in DOM
    let informationContainer = document.createElement("h1");
    let information = document.createTextNode(statisticsText); 
    informationContainer.appendChild(information);
    informationContainer.style.color = "#333";
    document.body.appendChild(informationContainer);
  }
}

const SimpleTest = {

  run: function(tests) {
      let failures = 0;
      let successes = 0;
      for (let testName in tests) {
          let testAction = tests[testName];
          try {
              testAction.apply(this);
              successes++;
              console.log('%c' + testName, 'color: green; font-family: arial;');
          } catch (e) {
              failures++;
              console.groupCollapsed('%c' + testName, 'color: red; font-weight: bold;font-family: arial;');
              console.error(e.stack);
              console.groupEnd();
          }
      }
      setTimeout(function() { // Give document a chance to complete
          if (window.document && document.body) {
              document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
              SimpleTestHelper.renderStats(failures, successes);
          }
      }, 0);
  },

  fail: function(msg) {
      throw new Error('fail(): ' + msg);
  },

  assert: function(value, msg) {
      if (!value) {
          throw new Error('assert(): ' + msg);
      }
  },

  assertEquals: function(expected, actual) {
      if (expected != actual) {
          throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
      }
  },

  assertStrictEquals: function(expected, actual) {
      if (expected !== actual) {
          throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
      }
  },

};

const fail               = SimpleTest.fail.bind(SimpleTest),
  assert             = SimpleTest.assert.bind(SimpleTest),
  assertEquals       = SimpleTest.assertEquals.bind(SimpleTest),
  eq                 = SimpleTest.assertEquals.bind(SimpleTest), // alias for assertEquals
  assertStrictEquals = SimpleTest.assertStrictEquals.bind(SimpleTest),
  tests              = SimpleTest.run.bind(SimpleTest);