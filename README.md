# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Fs
- morgan
- dotenv
- axios
- uuid

---

## URL

_Server_

```
http://localhost:4100
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "status": "Internal Server Error",
  "message": "Something wen't wrong"
}
```

---

## RESTful endpoints

### POST /api/pokemon/catch/:pokemonName

> Catch pokemon

_Request Header_

```
not needed
```

_Request Params_

```
/<pokemon_name>

```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Created",
    "data": [<pokemon_list>]
}
```

_Response (200) no content_

```
{
    "status": "No Content",
    "message":"Failed to catch the Pokemon"
}
```

_Response (404)_

```
{
    "status": "Not Found",
    "message": "Pokemon Not Found"
}
```

---

### GET /api/pokemon

> Get all pokemon

_Request Params_

```
not needed

```

_Request Query Params_

```
pageSize=<number>
pageNumber=<number>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200) With Out query_

```
{

    "message": "Ok",
    "data": {
        "count": <data_count>,
        "next": <url_next_page>,
        "previous": <url_prev_page>,
        "results":[<data_pokemon>]
        },

}
```

---

### GET /api/pokemon/:pokemonId

> Get detail pokemon

_Request Params_

```
/<pokemon_id>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {<detail_pokemon>},
}
```

_Response (404)_

```
{
    "status": "Not Found",
    "message": "Pokemon Not Found"
}
```

---

### PUT /api/pokemon/rename/:pokemonId

> Rename pokemon by pokemonId

_Request Params_

```
/<pokemon_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "<name>"
}
```

_Response (200)_

```
{
    "message": "Updated",
    "data": [
        <pokemon_list>
    ],
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

_Response (404 - Error Not Found)_

```
{
    "status": "Not Found",
    "message": "Pokemon not found in your list"
}
```

---

### DELETE /api/pokemon/release/:pokemonId

> Release pokemon by pokemonId

_Request Params_

```
/<pokemonId>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Release",
    "data": [<pokemon_list>]
}
```

_Response (200) with out prime number_

```
{
    "status": "Release failed",
    "message": "Pokemon number is not a prime number"
}
```

_Response (404 - Error Not Found)_

```
{
    "status": "Not Found",
    "message": "Pokemon not found in your list"
}
```

---
