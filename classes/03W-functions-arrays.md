
## Arrays
```
var x;
var nums = [3, 1, 4, 1, 5, 9, 2, 7]
```

Find the outcome of each of the these expressions:

```
nums[3];
nums[nums.length-1];
nums[nums[4]];

x = nums.concat(nums);
x[x[x[nums[2]]]];
nums[x[x[x[2]]]];

nums.push(x.pop());
x.push(nums.length);
x.push(x.push(0));

x.length = x[6];
```

## Arrays with Loops 1

Examine the following code and step through it by hand. Explain, in words, what this program does. Compare your answer with other members of your group.

```
var x = [1,2,3,4,5];

for (var i=0; i < x.length; i = i + 1){
    if (i % 2 == 0){
        console.log(i + " : " + x[i]);
    }
}
```

Now, write a small program that

1.  declares a variable holding an empty array;
2.  iterates from 1 through 10 and puts each odd number in the array;
3.  prints out the array.

Evaluate it by hand when you're done (at least for a couple of iterations) and confirm that it works correctly.


## Arrays with Loops 2

Given the following array definition:
```
var nums = [3, 1, 4, 1, 5, 9, 2, 7];
```

1. Write a loop to console.log all the elements of `nums`.

2. Write a loop to change `nums` so that each of its elements is doubled.

3. Write a loop to duplicate `nums`, copying each element of `nums` into a different array.


## Intermission: Capstone Fair!

---

# Afternoon

## Fun with Functions

1. Write a function which receives a number parameter and returns the square of that number.

2. Write a function which receives one parameter, an array of numbers, and returns the mean of those numbers.  (Hint: you'll need a loop.)

3. Write a function which receives an integer up to 10 and returns the corresponding word (i.e. 'one', 'two', 'three', etc).  (Hint: you'll need an array.)

4.  Use your three functions together to print the word for the square of the mean of these numbers: [2,4,7,-1]

<!-- POSTPONE until 08-functions2?
## Still More Fun

Examine the following code and execute it by hand.

```
var thing = function (fun, arg, num) {
	var result = arg;
	for (var i = 0; i < num; i = i+1) {
		arg = fun(arg);
	}
	return arg;
}

var mult = function (num){
	return num*num;
}

console.log(thing(mult,2,3));
```

Explain in words what this program does.

-->


## Playing Cards, version 1


## Days of Xmas


## Summary

Explain, in your own words, the following programming constructs and concepts:

-	arrays
-	functions
-	parameters and arguments
-	return values

After you're done, share your answers within your group and discuss them.