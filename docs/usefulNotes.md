# ساعدني أساعدك

> If you encounter any useful tips from the documentation or working, share them here

## DATABASE

### Many-to-many Relations

To have a many to many relation you need to create a model for the relation (a junction table)

### A One-to-many Relation Shortcut

When you have a many to one relation, if you go to the model that includes the many part it automatically adds the relation in the other model.

FOR EXAMPLE:

In the model `User` there is a relation `Reviews[]`, just by writitng that it automatically adds the `userID` and `user` refrence in the model `Review`.

## Parameters in the API

Parameters in the API can be fetched in two ways:
1- Query Parameters
2- Path Variables

#### Query Parameters:

They are fetched using req.query in the controller
They are added in postman "Params" part and the info gets appended to the endpoint (URL)

#### Path Variables

They make the parameters required dynamic and need a colon to be added before them in the endpoint
You can also add the paramater value right away instead for example: instead of :id you add 15

## FUN SHORTCUTS

not just fun but they make things easier
[1] RENAMING MORE THAN ONE ITEM
F2: renames it in the same scope
CRTL + H: renames it across the whole file
If you click just enter it passes you through each item present while ctrl + alt + enter finishes the job at once
[2] NAVIGATION
CTRL +P: search any file name you want to go to

## GIT COMMANDS THAT YOU NEED

### Basic steps required when you work

- Step 1:
  Clone the remote repo onto your local to be able to work on it
  --> open cmd, cd to where you want on your laptop, write `git clone <repo url>`
  where repo url is fetched from gitHub itself
  _NOTE_: if previously cloned don't forget to pull to get your local up-to-date with the main
- Step 2:
  Create your own branch
  --> on the terminal on VS code or your code editor, write `git checkout -b <branch name>`
  this creates a new branch for you to work on
  _it is advised to make the branch name close to the issue name_
  --> To make sure you are on the new branch use, `git branch` it tells you what branch you are on
- Step 3:
  after you are done working you should add (stage) the edits on to your branch
  --> `git status` will show you what files were modified and need staging
  --> `git add .` will stage all the modified files
- Step 4:
  --> You should then commit these changes by `git commit -m <commit message>`
  where the commit message should be clear and follows conventions {will add summary of it later}
- Step 5:
  Now that you have committed you are free to fly whether to push the branch on the remote repo and create a pull request to it or go to a different branch
  --> How to push: `git push origin main`
  --> How to go to a different branch: `git checkout <branchname>`

### Bonus and useful

--> `git stash`
When you want to switch to a new branch or a new task on a different branch than the one you are working on you can "stash" your changes and then switch branches
I used it to switch to the main so that I can pull the differences and then apply the stashed code (which included my changes) to the pulled one
I did that so that I dont lose my changes when I pull and to have a clear view of the conflicts and it was useful
Note: read more about it as I still dont grasp it completely but it is useful
It is like a stack that has your changes in it

## USEFUL JS LIBRARY FOR ARRAY

### LODASH

Lodash is a popular JavaScript utility library that provides a wide range of functions to help with common programming tasks. It's designed to work well with arrays, collections, and objects, and it provides functions to simplify and optimize many common operations.

Here are some key features and functions provided by Lodash:

1. **Utility Functions**: Lodash includes many utility functions that are missing in native JavaScript, such as `_.isEmpty()`, `_.isEqual()`, `_.clone()`, and `_.noop()`. These functions help with tasks like checking for empty values, comparing objects, cloning objects, and creating no-operation functions.

2. **Array Manipulation**: Lodash provides functions for manipulating arrays, such as `_.map()`, `_.filter()`, `_.reduce()`, `_.sortBy()`, and `_.uniq()`. These functions make it easier to work with arrays by providing concise and efficient ways to perform common operations like mapping, filtering, reducing, sorting, and finding unique values.

3. **Object Manipulation**: Lodash also includes functions for manipulating objects, such as `_.keys()`, `_.values()`, `_.merge()`, `_.omit()`, and `_.pick()`. These functions allow you to work with objects more easily by providing functions for extracting keys and values, merging objects, and manipulating object properties.

4. **Function Manipulation**: Lodash provides functions for working with functions, such as `_.debounce()`, `_.throttle()`, and `_.bind()`. These functions allow you to manipulate the behavior of functions, such as debouncing and throttling function calls, and binding the context of functions.

5. **String Manipulation**: Lodash includes functions for manipulating strings, such as `_.capitalize()`, `_.trim()`, `_.startsWith()`, and `_.endsWith()`. These functions provide utilities for working with strings, such as capitalizing words, trimming whitespace, and checking for the start or end of a string.

6. **Collection Functions**: Lodash provides functions for working with collections, such as `_.forEach()`, `_.map()`, `_.filter()`, and `_.reduce()`. These functions allow you to iterate over collections like arrays and objects, performing operations on each item.
