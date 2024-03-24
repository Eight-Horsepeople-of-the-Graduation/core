# ساعدني أساعدك

> If you encounter any useful tips from the documentation or working, share them here

## DATABASE

### Many-to-many Relations

To have a many to many relation you need to create a model for the relation (a junction table)

### A One-to-many Relation Shortcut

When you have a many to one relation, if you go to the model that includes the many part it automatically adds the relation in the other model.

FOR EXAMPLE:

In the model `User` there is a relation `Reviews[]`, just by writitng that it automatically adds the `userID` and `user` refrence in the model `Review`.

## Random things idk the title for

### Adding a service to view author with his books

view author with books - HOW TO: this is an example from the documentation that shocases a user with all his posts

```javascript
const userWithPosts = await prisma.user.findUnique({
  where: {
    id: 1,
  },
  include: {
    posts: {
      orderBy: {
        title: "desc",
      },
      select: {
        title: true,
        published: true,
      },
    },
  },
});
```

### Testing API on postman with queries

Add Query Parameters (if any):

If your API endpoint requires query parameters, you can add them by clicking on the **"Params"** tab below the request URL. Enter the query parameter name and value.
