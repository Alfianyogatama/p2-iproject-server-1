# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /users/register

> Register User

_Request Header_
```
not needed

```

_Request Body_
```
{
    "name" : "<string>",
    "email" : "<string>",
    "password" : "<string>",
    "gender" : "<string>",
    "image" : "<image upload>"
}
```

_Response (201 - created)_
```
{
    "user": {
        "availabilityText": null,
        "createdAt": 1632381342834,
        "custom": {},
        "email": [
            "newtestreg@mail.com"
        ],
        "id": "20218231415621",
        "locale": null,
        "name": "newtestreg",
        "phone": null,
        "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_newtestreg_AzngLKyrue",
        "role": "user",
        "welcomeMessage": null
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImVtYWlsIjoibmV3dGVzdHJlZ0BtYWlsLmNvbSIsImNoYXRJZCI6IjIwMjE4MjMxNDE1NjIxIiwiaWF0IjoxNjMyMzgxMzQzfQ.-CuAHTQnexGjSZkRbSk_5uUSZaSN_2DwMHbLnC4_kbE",
    "chats": {
        "data": []
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": [<field> is required]
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Email already registered"
}
```

### POST /login

> Register User

_Request Header_
```
not needed

```

_Request Body_
```
{
    "name" : "<string>",
    "email" : "<string>",
    "password" : "<string>",
    "gender" : "<string>",
    "image" : "<image upload>"
}
```

_Response (200 - ok)_
```
{
    "user": {
        "availabilityText": null,
        "createdAt": 1632381342834,
        "custom": {},
        "email": [
            "newtestreg@mail.com"
        ],
        "id": "20218231415621",
        "locale": null,
        "name": "newtestreg",
        "phone": null,
        "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_newtestreg_AzngLKyrue",
        "role": "user",
        "welcomeMessage": null
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImVtYWlsIjoibmV3dGVzdHJlZ0BtYWlsLmNvbSIsImNoYXRJZCI6IjIwMjE4MjMxNDE1NjIxIiwiaWF0IjoxNjMyMzgxMzQzfQ.-CuAHTQnexGjSZkRbSk_5uUSZaSN_2DwMHbLnC4_kbE",
    "chats": {
        "data": []
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": [<field> is required]
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Email already registered"
}
```

