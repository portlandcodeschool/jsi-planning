
## Objects and Properties

1. Make an object representing yourself.  First declare a variable holding an empty object, then incrementally assign it 3 properties with keys and values of your choice.

2. Use "object literal notation" to make similar objects for each other person at your table, using a different variable for each.

3. Make an object for the entire table, stored in variable `table`, with a property for each person.  The property name should be the person's name, and its value should be the person's object.

4. Write four "chained" expressions, each referencing one property of each person at the table.  Each expression should start with variable `table` and contain no other variables, only property names.

## Looping over properties

5. Write a function `personIsAt(name,tableObj)` which returns a Boolean: `true` if a person named `name` is at table `tableObj`, otherwise `false`.

6. Write a function `peopleAt(tableObj)` which returns a string listing all the names of people at your table `tableObj`.  Separate each name with a newline ('\n').

7. Write a function `whoHasKey(tableObj,key)` to return the name of any person at your table (parameter `tableObj`) who has a key matching parameter `key`.

8. Write a function `whoHasVal(tableObj,val)` to return the name of any person at your table who has a property with value `val`.

9. *Bonus Challenge*: Modify your functions `whoHasKey` and `whoHasVal` to return a list of _all_ people matching the key or value, respectively.

## JSON transmission

1. Use `JSON.stringify()` to convert your table object (and all its people) to a JSON string.  Then have one person per group post that string in a snippet on Slack.

2. Everyone: collect the JSON strings from all four groups and put them together into a single array, representing four tables.

3. Use your `whoHasVal(table,val)` function to find the name of someone _at another table_ who has a property with a value of your choice.

## Properties vs. Variables

Discuss with your team the difference between variables and properties in each of the following behaviors:

* Where they're stored

* How they're created

* What happens if they're used before being created

* When and how they're destroyed

* How they appear in expressions

* Constraints on what they may be named

---

## Testing and Simulating Arrays

Write some code to verify that Arrays behave as advertised.  Specifically, write three different functions, each testing one method of Arrays:

* `testPush(array)` should verify that `array.push(val)` adds _val_ to the end of _array_ and returns its new length;

* `testPop(array)` should verify that `array.pop()` removes and returns the last element of _array_;

* `testJoin(array)` should verify that `array.join(delim)` concatenates all elements of _array_ into a single string, with string _delim_ inserted between each element.


Each function should do several tests:  adding, removing, or joining values under various conditions to ensure that _array_ produces the correct outcome.  Each outcome may require multiple assertions to verify.  For each function, make sure one test is for how an empty array behaves.
Any assertion which fails should log a message to the console, but your test functions don't need return values.

More detailed instructions are in the [template file](array-test-template.js).

**b)** Now that you have a testing suite, implement your own version of Arrays!

Create a pseudo-array, an ordinary object which is not an actual Array but behaves
(somewhat) like one.  You may use a global variable _array_ to store
your pseudo-array.
It will have a property _length_, which is initially zero but needs to be adjusted as elements are added or removed.
The elements of _array_ will be stored as properties named by their index numbers.
So for example, an _array_ representing `[5,9]` would have three properties named "length", "0", and "1" whose values are 2, 5, and 9.

For this exercise, you don't need to delete any _array_ elements beyond its length if the length shrinks; just ignore them.  Setting _array.length_ to 0 is enough to reset it to "empty".

In addition to property _length_ and the element properties, give _array_ three more properties _pop_, _push_, and
_join_ which are functions (i.e. methods) behaving exactly like (and returning the same values as) the
corresponding methods of real Arrays.  When your _pop_ and _push_ methods modify the array, _length_ should change accordingly.

You may use the enclosed [template file](pseudo-array-template.js) to get started.

_Hint:_ Within each method, use the keyword `this` to refer to your array object.

**c)**  Test your pseudo-array implementation using your tests from part **a)**.  Your pseudo-array should be able to pass the same tests of push, pop, and join as a real Array.

---

## Comparing and Copying Objects


Write a function `copy(obj)`, which duplicates an object (not just copying a reference to it).  You only need a _shallow_ copy, duplicating only the top level of properties.  That is, if `obj` contains another object _inner_, the duplicate may share a reference to _inner_ rather than copying all of _inner_ too.

Write another function to compare two objects:
`equal(objA,objB)` should return true only when `objA` and `objB` have exactly the same properties with the same values.  You only need _shallow_ equality: if `objA` and `objB` each have a property _inner_ referring to an object, check only that both _inner_ objects are identical (references to the same object); don't try to compare their properties.
Note that two empty objects should be considered equal (by this function, not by the `==` operator).

Write a third function:
`similar(objA,objB)` should return true only when `objA` and `objB` have exactly the same properties, regardless of their values.

## Combining Objects as Sets

We can interpret objects as _sets_ of properties, and merge those sets in various ways.  Let's define three such merges:

*Union*: The union of objects A,B is a new object which contains all the properties found in either A or B.  If a property is found in both, the merged property gets the shared key and the value `(A[key] || B[key])`.
For example: the union of `{a:1,b:0}` and `{a:0,c:0}` is `{a:1,b:0,c:0}`.

*Intersection*: The intersection of objects A,B is a new object which contains only those properties found in BOTH A and B.  The value of each intersecting property is `(A[key] && B[key])`.
For example, the intersection of `{a:1,b:0}` and `{a:0,c:0}` is `{a:0}`.

*Subtraction*: The subtraction of B from A, aka "A minus B", is an object which contains all the properties of A which are NOT in B.  Note that this merge is usually not symmetric: _A minus B_ doesn't equal _B minus A_ (except in one case, which you should identify!)
For example, `{a:1,b:0}` minus `{a:0,c:0}` is `{b:0}`, and the reverse subtraction is `{c:0}`.

Using those definitions, implement a function for each:

* `union(objA,objB)`

* `intersect(objA,objB)`

* `subtract(objA,objB)`

Each function should return a new object, or _undefined_ if either of their arguments is not an object.



