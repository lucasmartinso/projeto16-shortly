# <p align = "center">🤏 Shortly 🤏</p>

<p align="center">
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hn_90YkoJDP7CrpZoNOwuCuoL8SZvHBVMA&s" width="600" height="400" object-fit="cover"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-lucasmartinso-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/lucasmartinso/projeto16-shortly?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

This is a backend application to control the data flow of Basically a project that shortens links, we've all come across that huge link that you can't even read. In this way, a website emerged that quickly and practically shortens giant links into small ones, and the user can still see the history of the links he shortened.
***

## :computer:	 Tecnolgy and Concepts 

- Node.js
- JavaScript
- PostgresSQL

***

## :rocket: Routes

### 👥 Users 

```yml
POST /signup
    - Route to create a count
    - headers: {}
    - body:{
        "name": "lorem"
        "email": "lorem@domain.com",
        "password": "********",
        "confirmPassword": "*******"
}
```
    
```yml 
POST /signin
    - Route to make the login to acess app info
    - headers: {}
    - body: {
        "email": "lorem@domain.com",
        "password": "**********"
    }
```

### 🌐​ Urls  

```yml 
GET /urls/:id
    - Route to url info
    - headers: {}
    - params: id(number)
    - body: {}
```

```yml 
GET /urls/open/:shortUrl
    - Route to get shorted url
    - headers: {}
    - params: id(number)
    - body: {}
```

```yml 
POST /urls/shorten (autentify)
    - Route to create new shorted url  
    - headers: { "Authorization": `Bearer $token` }
    - body: {
        "url": "https://lorem.com"
    }
```

```yml 
DELETE /urls/:id
    - Route to delete shorted url 
    - headers: { "Authorization": `Bearer $token` }
    - params: id(number)
    - body: {}
```

### 💬​ Functions  

```yml 
GET /users/me (autentify)
    - Route to get all ptoject types
    - headers: { "Authorization": `Bearer $token` }
    - body: {}
```

```yml 
POST /ranking 
    - Route to add a new project type 
    - headers: {}
    - body: {}
```

## 🏁 Running the application locally

First, make the clone repository in your machine:

```
git clone https://github.com/lucasmartinso/projeto16-shortly.git
```

After, inside the folder, run the comand to install the dependencies.

```
npm install
```
Config the .env, .env.test and .env.development based on .env.example

To run the tests 
```
npm run test
```

To finish the process, to init the server
```
npm start or npm run dev
```

:stop_sign: Don't forget to repeat the sequence above with [repository](https://github.com/lucasmartinso/projeto16-shortly-front) that contains the interface of aplication, to test the project per complet.
