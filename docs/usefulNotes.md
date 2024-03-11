# ساعدني أساعدك

> If you encounter any useful tips from the documentation or working, share them here

## DATABASE

### Many-to-many Relations

To have a many to many relation you need to create a model for the relation (a junction table)

### A One-to-many Relation Shortcut

When you have a many to one relation, if you go to the model that includes the many part it automatically adds the relation in the other model.

FOR EXAMPLE:

In the model `User` there is a relation `Reviews[]`, just by writitng that it automatically adds the `userID` and `user` refrence in the model `Review`.
