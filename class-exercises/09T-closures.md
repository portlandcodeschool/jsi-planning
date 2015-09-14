
**a)**  Write a user-registration tool, a factory function `makeUser(name,pwd)` which accepts a username and password and generates a user object.  Once we have a user object we should be able to do two things with it: retrieve the corresponding username and test to see if a provided password matches that user's password.  Each user will have these methods:

  + `getName()` returns the username;
  + `validate(str)` takes a string and returns true if it matches that user's password.

It should not be possible, however, to modify the username or password once created nor to directly see the password.

Here is a [template](users-template.js) to get you started.

**b)**  Now that we can make user objects, let's assume that our system needs some version of a "system log" that will record messages left by different users. This system log, being shared by all user objects created, will contain all the messages that users have recorded. You will need to modify the factory you made above to be a part of a module that has a private variable that holds the system log.

  + Each *user* object should have an additional method `record(message)` which writes an entry to the shared log in the format "_username: message_" and returns true.  If no message is provided, the `record` method should return undefined instead.

  + Reading from the log is a operation of the system and not of individual users.
  The factory itself should have a method `getLog(username)` whose argument _username_ is optional.  If _username_ is provided, _getLog_ should return a string of all log entries recorded by that user.  If _username_ is omitted (therefore undefined), return a string of all log entries from everyone.  In either case, log entries should be separated by newlines.

The log should not be able to be modified other than through a user's _record_ method.
