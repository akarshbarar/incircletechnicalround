
# NodeJs Basic Crud App

This is a basic CRUD (Create, Read, Update, Delete) app built with Node.js and Express. It allows users to add, view, search, update, and delete articles. Here we are using Mongodb atlas as a  database.
## Prerequisites

    - NodeJs Must be Installed in your system
    
## Installation

Install project with npm

```bash
    git clone https://github.com/akarshbarar/incircletechnicalround
    cd incircletechnicalround
    npm install
```
    
## Deployment

Firstly create a .env file in the root of your project and have following data NODE_ENV, PORT and DB_URI. 
 
To deploy this project run

```bash
  npm run start:dev
```


## Swagger

You can see the Swagger Documnetaion of the project by visiting the URL

Assuming that your app is running on 8080 port

http://localhost:8080/api-docs

## API Reference

#### Get all Articles

```http
  GET /api/v1/article/getall
```
#### cURL
```bash
curl --location --request GET 'localhost:8080/api/v1/article/getall'
```

#### Add  Articles

```http
  POST /api/v1/article/add
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title to be added |
| `content`      | `string` | **Required**. Content to be Added |

#### cURL
```bash
curl --location --request POST 'localhost:8080/api/v1/article/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Delete",
    "content":"Delete"
}'
```

#### Search in an  Articles

```http
  POST /api/v1/article/search
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Content to be search in  title or content |

#### cURL
```bash
curl --location --request POST 'localhost:8080/api/v1/article/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"="
}'
```


#### Delete  an  Articles

```http
  Delete /api/v1/article/delete
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Article to be deleted |

#### cURL
```bash
curl --location --request DELETE 'localhost:8080/api/v1/article/delete' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Delete"
}'
```

#### Update  Articles

```http
  put /api/v1/article/update
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title  |
| `content`      | `string` | **Required**. Content to be Updated |

#### cURL
```bash
curl --location --request PUT 'localhost:8080/api/v1/article/update' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Delete",
    "content":"updated Content te"
}'
```
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Contributing

Contributions are always welcome!




## License

[MIT](https://choosealicense.com/licenses/mit/)

