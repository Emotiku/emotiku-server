# Emotiku
group project Emotiku web application using javascript


# BACKEND SERVER
Backed use Express, NodeJs, google vision api, google cloud storage, multer
# BACKEND SERVER REST API DOCUMENTATION

List of user routes:

Route | HTTP | Description | Body Attributes | Headers
--- | --- | --- | --- | ---
/users/register | POST | Register a user | name (string required) : user name,<br/>email (string required) : user email,<br/>password (string required) : user plain password |
/users/login | POST | User login | email (string required) : user email,<br/>password (string required) : user plain password |


List of image routes:

Route | HTTP | Description | Attributes | Headers
--- | --- | --- | --- | ---
/images | POST | Upload new image to database | userId (string required) : user objectId,<br/>image (file required) : file image | token : a valid user token
/images | GET | Get current user image | | token : a valid user token
/images/id/:id | GET | Get image by id| | token : a valid user token
/images/user?name=(username) | GET | Get image by username| | token : a valid user token
/images/alluser | GET | Get all user image| | token : a valid user token
/images/:id | DELETE | Delete user image by id| | token : a valid user token


## Usage
Create new .env file in /server and add below env config, set your own config here
```
MONGO_URI = (your mongodb db url)
JWT_KEY= (secret key for jwt)
CLOUD_BUCKET= (your bucket storage)
GCLOUD_PROJECT= (your cloud project)
KEYFILE_PATH= (your storage key )
GOOGLE_APPLICATION_CREDENTIALS= (google application api key)

```

With only npm:
```
npm install
npm run dev
```

## Response 
### User Route
#### User Register
  Response to : POST/users/register
```
{
	"message": "user sucessfully registered",
	"data": {
		"_id": "5b74dd343555d727491d4d47",
		"name": "adi2",
		"email": "adi2@mail.com",
		"password": "$2a$10$QOzTyzT5bMBM7EBGwae/2uAd4APnhKu4MqJbQo/1M713dtDJoaiGi",
		"createdAt": "2018-08-16T02:11:00.205Z",
		"updatedAt": "2018-08-16T02:11:00.205Z",
		"__v": 0
	}
}

```
#### User Login
  Response to : POST /users/login
```
{
	"message": "User successfully login",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNzQxZDM5OWYzYzVkN2M1NTM0ZDBmZCIsIm5hbWUiOiJhZGkiLCJlbWFpbCI6ImFkaUBtYWlsLmNvbSIsImlhdCI6MTUzNDM4MzE4N30.x8-7JshdKDPqbsX2tg4FTSFtCdsql33HKsgs8gL8N7k"
}

```
### Image Route
#### Upload user image to gcp and save to db
  Response to : POST /images
```
{
	"message": "photo successfully saved to database",
	"data": {
		"_id": "5b74d8907e4b31248caafff4",
		"user": "5b741d399f3c5d7c5534d0fd",
		"url": "https://storage.googleapis.com/storage-madeadi/1534384268733cry.jpeg",
		"emotion": "Sorrow",
		"numberFaces": 1,
		"__v": 0
	}
}

```

#### Get current user image
  Response to : GET /images
```
{
	"message": "successfully get photos",
	"data": [
		{
			"_id": "5b74d484f6fedb21fbc3f01f",
			"user": {
				"_id": "5b741d399f3c5d7c5534d0fd",
				"name": "adi",
				"email": "adi@mail.com",
				"password": "$2a$10$cwvyBXJhg9n87FsTEBRMQelRv1CmxAMEwirnN8YViSrrwbT.Hhw.C",
				"createdAt": "2018-08-15T12:31:53.284Z",
				"updatedAt": "2018-08-15T12:31:53.284Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534383233322person.jpeg",
			"emotion": "Joy",
			"numberFaces": 1,
			"__v": 0
		},
		{
			"_id": "5b74d8907e4b31248caafff4",
			"user": {
				"_id": "5b741d399f3c5d7c5534d0fd",
				"name": "adi",
				"email": "adi@mail.com",
				"password": "$2a$10$cwvyBXJhg9n87FsTEBRMQelRv1CmxAMEwirnN8YViSrrwbT.Hhw.C",
				"createdAt": "2018-08-15T12:31:53.284Z",
				"updatedAt": "2018-08-15T12:31:53.284Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534384268733cry.jpeg",
			"emotion": "Sorrow",
			"numberFaces": 1,
			"__v": 0
		}
	]
}

```
#### Upload user image to gcp and save to db
  Response to : POST /images
```
{
	"message": "photo successfully saved to database",
	"data": {
		"_id": "5b74d8907e4b31248caafff4",
		"user": "5b741d399f3c5d7c5534d0fd",
		"url": "https://storage.googleapis.com/storage-madeadi/1534384268733cry.jpeg",
		"emotion": "Sorrow",
		"numberFaces": 1,
		"__v": 0
	}
}

```
#### Get image by image id
  Response to : GET /images/id/:id
```
{
	"message": "successfully get photo",
	"data": [
		{
			"_id": "5b74d40649615d21925a0932",
			"user": {
				"_id": "5b7435d746aebf0f99726bf0",
				"name": "oq",
				"email": "oq@mail.com",
				"password": "$2a$10$n1fnGNxwCZiGSD3upwwoXeNP9FEhC0RtRcI/.HhW8oJb2XITYwfrK",
				"createdAt": "2018-08-15T14:16:55.069Z",
				"updatedAt": "2018-08-15T14:16:55.069Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534383108203anger1.jpeg",
			"emotion": "Anger",
			"numberFaces": 1,
			"__v": 0
		}
	]
}

```
#### Get image by username
  Response to : GET /images/user?name=(username)
```
{
	"message": "successfully get photo",
	"data": [
		{
			"_id": "5b74d484f6fedb21fbc3f01f",
			"user": {
				"_id": "5b741d399f3c5d7c5534d0fd",
				"name": "adi",
				"email": "adi@mail.com",
				"password": "$2a$10$cwvyBXJhg9n87FsTEBRMQelRv1CmxAMEwirnN8YViSrrwbT.Hhw.C",
				"createdAt": "2018-08-15T12:31:53.284Z",
				"updatedAt": "2018-08-15T12:31:53.284Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534383233322person.jpeg",
			"emotion": "Joy",
			"numberFaces": 1,
			"__v": 0
		},
		{
			"_id": "5b74d8907e4b31248caafff4",
			"user": {
				"_id": "5b741d399f3c5d7c5534d0fd",
				"name": "adi",
				"email": "adi@mail.com",
				"password": "$2a$10$cwvyBXJhg9n87FsTEBRMQelRv1CmxAMEwirnN8YViSrrwbT.Hhw.C",
				"createdAt": "2018-08-15T12:31:53.284Z",
				"updatedAt": "2018-08-15T12:31:53.284Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534384268733cry.jpeg",
			"emotion": "Sorrow",
			"numberFaces": 1,
			"__v": 0
		}
	]
}
```
#### Get all user image
  Response to : GET /images/alluser
```
{
	"message": "successfully get photos",
	"data": [
		{
			"_id": "5b74cac783cb9f1601911a0e",
			"user": {
				"_id": "5b7435d746aebf0f99726bf0",
				"name": "oq",
				"email": "oq@mail.com",
				"password": "$2a$10$n1fnGNxwCZiGSD3upwwoXeNP9FEhC0RtRcI/.HhW8oJb2XITYwfrK",
				"createdAt": "2018-08-15T14:16:55.069Z",
				"updatedAt": "2018-08-15T14:16:55.069Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534380739884surprise1.jpg",
			"emotion": "Surprise",
			"numberFaces": 1,
			"__v": 0
		},
		{
			"_id": "5b74cb6283cb9f1601911a0f",
			"user": {
				"_id": "5b7435d746aebf0f99726bf0",
				"name": "oq",
				"email": "oq@mail.com",
				"password": "$2a$10$n1fnGNxwCZiGSD3upwwoXeNP9FEhC0RtRcI/.HhW8oJb2XITYwfrK",
				"createdAt": "2018-08-15T14:16:55.069Z",
				"updatedAt": "2018-08-15T14:16:55.069Z",
				"__v": 0
			},
			"url": "https://storage.googleapis.com/storage-madeadi/1534380895625surprise3.jpg",
			"emotion": "Surprise",
			"numberFaces": 1,
			"__v": 0
    }
  ]
}

```


With only npm:
```
npm install
npm run dev
```

Access the API via `http://localhost:3000/`
<br>
or
<br>
Access end point server via : http://35.240.209.66/

