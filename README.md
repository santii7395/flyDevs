# CRUD USERS


## Required installations

- Node v14.15.5 is needed to run the program. You can download from here 
```
https://nodejs.org/en/
```
- Execute the following command in the project route

```
npm install
```

## Services
The url where you can call the services exposed is: 

```
http://localhost:4000/graphql
```
Five services are exposed and here are some examples of requests:

```
mutation {
    login(userId: "user", password: "pass")
}

query {
  user(id: "60736763f67a266c709a2dfc") {
    name
    lastname
  }
}

query {
	users(name: "Santiago"){
    name,
    lastname
  }
}

mutation {
   createUser(userId: "userId", name:"newName",lastname:"newLastname", age: 26, password: "password"){
    name,
    lastname
  }
}

mutation {
   updateUser(id: "6073a0d4db4b28645449149c", name:"newName",lastname:"newLastname", age: 26){
    name,
    lastname
  }
}

mutation{
    deleteUser (id: "6073a0dadb4b28645449149d")
}
```
