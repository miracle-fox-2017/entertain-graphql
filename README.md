# entertain-graphql
> CRUD using graphql, express, & mongodb

## Url endpoint
`server running on localhost:4000`

| Endpoint | HTTP | Description |
|----------|------|-------------|
| localhost:4000/ | GET  | server status |
| localhost:4000/graphql | GET  | to graphiql |

## Use me?
```
$ npm install
$ sudo service mongod start
$ npm run dev
```

## Query List
### createUser mutation
```
mutation{
  createUser(input: {
    name: "semut",
    address: "jakarta",
    age: 20
  })
  {
    msg
    err
  }
}
```

### getAllUser query
```
query{
  user {
    name
    address
    age
  }
}
```

### editUser mutation
```
mutation{
  editUser(input: {
    _id: "5a53019fbe51e55777834bf9",
    name: "lebah ganteng",
    address: "jakarta",
    age: 20
  })
  {
    msg
    err
  }
}
```

### deleteUser mutation
```
mutation{
  deleteUser(input: {
    _id: "5a5301e94ee7ff57d97f2d49"
  })
  {
    msg
    err
  }
}
```
