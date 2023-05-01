# BanderaShop-Back

## Installation
```bash
git clone https://github.com/Glubin-yep/BanderaShop-Back
cd BanderaShop-Back
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_URL`

`JWT_ACCESS_SECRET`

`JWT_REFRESH_SECRET`

`SMTP_HOST`

`SMTP_PORT`

`SMTP_USER`

`SMTP_PASSWORD`

`CLIENT_NAME`

`API_URL`

`CLIENT_URL`

## For start
```sh
npm run dev
```

## API Reference

#### Get all items

```http
  GET /api/getAll
```

#### Get item

```http
  GET /api/${productType}/${productId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productType`      | `string` | **Required**. Product type of item to fetch |
| `productId`      | `string` | **Required**. Id of item to fetch |

#### Get all items in category

```http
  GET /api/category/${category}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. The category to fetch |

#### Get all users
```http
  GET /api/users
```

#### Confirmation of user mail

```http
  GET /api/activate/${link}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `link`      | `string` | **Required**. Confirmation link to the user's email |

#### Registering a new user

```http
  POST /api/registration
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the new user |
| `password`      | `string` | **Required**. Password of the new user |

#### User login

```http
  POST /api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the  user |
| `password`      | `string` | **Required**. Password of the  user |

#### User logout

```http
  POST /api/logout
```

#### Add a new product

```http
  POST /api/addProduct
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. New product category |
| `name`      | `string` | **Required**. New product name |
| `shortDescription`      | `string` | **Required**. New product shortDescription |
| `fullDescription`      | `string` | **Required**. New product fullDescription |
| `price`      | `double` | **Required**. New product price |
| `availableSizes`      | `string` | **Required**. New product availableSizes |
| `photo`      | `string` | **Required**. New product photo |

#### Update the product

```http
  POST /api/updateProduct
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | New product category |
| `name`      | `string` | New product name |
| `shortDescription`      | `string` | New product shortDescription |
| `fullDescription`      | `string` | New product fullDescription |
| `price`      | `double` |New product price |
| `availableSizes`      | `string` |  New product availableSizes |
| `photo`      | `string` |New product photo |

####  Delete the product

```http
  POST /api/deleteProduct
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. Category of the item to be deleted |
| `id`      | `string` | **Required**. Id of the item to be deleted|
