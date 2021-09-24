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

```json
{
    "name" : "<string>",
    "email" : "<string>",
    "password" : "<string>",
    "gender" : "<string>",
    "image" : "<image upload>"
}
```

_Response (201 - created)_

```json
{
    "user": {
        "id": 51,
        "name": "newuser1",
        "email": "newuser1@mail.com",
        "chatId": "20218241019816",
        "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_newuser1_hH1isjfo_-"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImVtYWlsIjoibmV3dXNlcjFAbWFpbC5jb20iLCJjaGF0SWQiOiIyMDIxODI0MTAxOTgxNiIsImlhdCI6MTYzMjQ1MzU4OX0.p5fpKB539HkTzc3smBssP2rmFXF3ochsY8yb1mV6ijk",
    "chats": {
        "data": []
    }
}

```

_Response (400 - Bad Request)_

```json
{
  "message": ["<field> is required"]
}

```

_Response (400 - Bad Request)_

```json
{
  "message": ["Max image size 255kb"]
}

```

_Response (400 - Bad Request)_

```json
{
    "message": "Email already registered"
}
```

### POST /login

> Login User

_Request Header_
```
not needed

```

_Request Body_

```json
{
    "email" : "<string>",
    "password" : "<string>",
}

```

_Response (200 - ok)_

```json
{
    "user": {
        "id": 51,
        "name": "newuser1",
        "email": "newuser1@mail.com",
        "chatId": "20218241019816",
        "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_newuser1_hH1isjfo_-"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImVtYWlsIjoibmV3dXNlcjFAbWFpbC5jb20iLCJjaGF0SWQiOiIyMDIxODI0MTAxOTgxNiIsImlhdCI6MTYzMjQ1MzU4OX0.p5fpKB539HkTzc3smBssP2rmFXF3ochsY8yb1mV6ijk",
    "chats": {
        "data": []
    }
}

```

_Response (400 - Bad Request)_

```json
{
  "message": ["Wrong emai;/password"]
}

```

'''
### POST /chats/join

> User join created group

_Request Header_

```json

"access_token" : "<created access_token>"

```

_Request Body_

```json
{
    "conversationId" : "GGMU"
}

```

_Response (200 - Ok)_

```json
{
    "createdAt": 1632356721280,
    "custom": {
        "tag": "sport"
    },
    "id": "MU-id",
    "lastMessage": {
        "attachment": {
            "size": 358396,
            "url": "https://firebasestorage.googleapis.com/v0/b/klets-3642/o/user_files%2FtwoPwBx0%2F67d60306c48c4de99187fecd0e60436f%2Fbayer-muenchen.png?alt=media&token=8fa7d02e-3f30-4ff2-b3d7-ae78b5c0447a"
        },
        "conversationId": "MU-id",
        "createdAt": 1632424922646,
        "custom": {},
        "id": "msg_0vUvk1A2QKO810um3Qvp24",
        "location": null,
        "origin": "web",
        "readBy": [],
        "senderId": "2021823740159",
        "text": "",
        "type": "UserMessage"
    },
    "participants": {
        "20218221415781": {
            "access": "ReadWrite",
            "notify": true
        },
    },
    "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_MU-id_BsUqhd2Tq",
    "subject": "MU indonesia",
    "topicId": null,
    "welcomeMessages": [
        "Wellcome to MU indonesia"
    ]
}

```

_Response (401 - Unauthorized)_

```json
{
    "message": [
        "Invalid token/login"
    ]
}

```


_Response (400 - Bad Request)_

```json
{
    "message": "Not Found"
}

```

'''
### POST /chats/groups

> Create new group

_Request Header_

```json
{
    "access_token": "<string>"
}

```

_Request Body_

```json
{
   "name": "<string>",
   "subject": "<string>",
   "topic": "<string>",
   "welcomeMessages": "<string>",
   "image": "<input file: jpg/png/gif>" 
}

```

_Response (201 - Ok)_

```json
{
    "message": "New Group with id <name> created successfully"
}

```

_Request (400 - Bad request)_

```json

{
    "message": [
        "<Field> is required"
    ]
}


```

_Request (400 - Bad request)_

```json

{
    "message": ["Group name already taken"]
}

```

_Request (400 - Bad request)_

```json

{
    "message": ["Max file size 255kb"]
}

```

_Response (401 - Unauthorized)_

```json
{
    "message": [
        "Invalid token/login"
    ]
}

```


'''
### GET /chats/groups/info/:id

> Get detail info group

_Request Header_ 

```json
{
    "access_token": "<string>",
    "params": {
        "id" : "<string>"
    }
}

```

_Request Body_

```json
not needed

```

_Response (200 - Ok)_

```json

{
    "name": "<string>",
    "tag": "<string>",
    "photoUrl": "<string>",
    "subject": "<string>",
    "welcomeMessages": [
        "<string>"
    ],
    "participants": "<integer>"
}

```

_Response (404 - Not found)_

```json
{
    "message": "Not Found"
}

```

_Response (401 - Unauthorized)_

```json
{
    "message": [
        "Invalid token/login"
    ]
}

```

### GET /chats/lists

> Get list conversation user joined

_Request Header_ 

```json
{
    "access_token": "<string>",
}

```

_Request Body_

```json

not needed

```

_Response (200 - Ok)_


```json
{
    "data": [
        {
            "name": "SpursId",
            "tag": "Cooking",
            "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_SpursId___7Nizk46V",
            "subject": "Tottenham Hotspurs Fans",
            "welcomeMessages": [
                "Spurs Indonesia"
            ],
            "participants": 1
        },
        {
            "name": "Persebaya1927",
            "tag": "football",
            "photoUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_Persebaya1927_wOxHJQ6uViB",
            "subject": "Bonek Internasional",
            "welcomeMessages": [
                "Wellcome to Bonek Internasional"
            ],
            "participants": 3
        }
    ]
}

```

_Response (401 - Unauthorized)_

```json
{
    "message": [
        "Invalid token/login"
    ]
}

```

### GET /chats/groups/:id

> Search group by name

_Request Header_ 

```json
{
    "access_token": "<string>",
}

```

_Response (200 - Ok)_

```json
[
    {
        "id": 10,
        "name": "GGMU",
        "subject": "MU FansClub",
        "imageUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_GGMU_g6TE-ysjI1v"
    },
    {
        "id": 26,
        "name": "MUindonesia",
        "subject": "Seputar MU",
        "imageUrl": "https://ik.imagekit.io/61kwqbplekv7/branded_product/branded_MUindonesia_UX4gtE7zlW"
    }
]

```

_Response (401 - Unauthorized)_

```json
{
    "message": [
        "Invalid token/login"
    ]
}

```

### GET /feature/leagues/standings/:id

> Get standing football leagues

_Request Header_ 

```json
{
    "access_token": "<string>",
    "params": {
        "id": "<string>"
    }
}

```

_Request Body_

```json
not needed

```

_Response (200 - Ok)_

```json
{
    "league": "English Premier League",
    "season": 2021,
    "top-one": {
        "id": "363",
        "uid": "s:600~t:363",
        "location": "Chelsea",
        "name": "Chelsea",
        "abbreviation": "CHE",
        "displayName": "Chelsea",
        "shortDisplayName": "Chelsea",
        "isActive": true,
        "logos": [
            {
                "href": "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
                "width": 500,
                "height": 500,
                "alt": "",
                "rel": [
                    "full",
                    "default"
                ]
            }
        ]
    }
}

```

_Response (401 - Unauthorized)_

```json
{
    "message": [
        "Invalid token/login"
    ]
}

```
