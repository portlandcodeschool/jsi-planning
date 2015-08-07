## Callbacks

A callback is just a function passed as an argument to another function.  The receiving function is reponsible for calling it at the right time,
but that receiver has no idea what the callback function does.  Conversely, the callback knows how to process its own arguments,
but it has no idea when it will be called nor precisely what its arguments will be.

He is a simple example to illustrate the idea:

```
// Example Callback Functions:
function shout(str) {
	var output = str.toUpperCase()+'!';
	console.log(output);
	return output;
}
function spell(str) {
	var output = str.split('').join('...');
	console.log(output);
	return output;
}

// Example Receiver Functions:
function withThird(array,callback) {
	for (var i=0; i<2; ++i)
		console.log(array[i]);
	callback(array[i]);
}
function withThirdFromEnd(array,callback) {
	for (var i=array.length-1; i>array.length-3; --i) {
		console.log(array[i]);
	}
	callback(array[i]);
}

var fruits = ['apple','banana','cranberry','plum'];

withThird(fruits,shout);
withThird(fruits,spell);

withThirdFromEnd(fruits,shout);
withThirdFromEnd(fruits,spell);

```

### forEach

All arrays have a method called `forEach` which run a callback you provide on every element of the array.
No value is returned, so the callback must have some side-effect when it's called.


1. Use `forEach` to `shout` every string in an array of strings.

2. Now use it to `spell` a series of strings.

3. Pretend that `forEach` doesn't yet exist and you have to write it yourself.  Complete the following template to implement it:

```
function forEach(array,callback) {
	// do callback on every element of array...
}
```

### map

All arrays have a method called `map`.  `map`, like `forEach`, runs its callback on each array element, but it requires the callback to return a value each time.
The result of `map` is a new array build from those individual return values, one per element.

1. Use `map` to build an array of shouted strings.

2. Use `map` to build an array of spelled strings.

3. Pretend that `map` doesn't yet exist and you have to write it yourself.  Complete the following template to implement it:

```
function map(array,callback) {
	// build a new array using callback to transform each element of array
}
```

### sort

Finally, any array can 	`sort` itself.  The callback to `sort` has *two* parameters, which are different, unknown elements of array,
 and the callback indicates which is greater by returning either a positive or negative number.
