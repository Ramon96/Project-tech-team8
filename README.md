# Zodimaniac
![Zodimaniac's App Icon](https://github.com/Ramon96/project-tech/blob/master/Assets/app_icon.png?raw=true)
> Zodimaniac is a dating platform designed to match singles based on their zodiac signs. The user is able to tell a little bit about 
> themselves, post a picture and most importantly be able to match with others based on their zodiac signs.
> If both users like each other than they have a match!

> Both party's can engage a conversation whenever they like. Zodimaniac will make sure to provide the latest horoscope so that the users  are able to plan their date ahead on the most desired day.
>Unmatching at any point in time is also possibile.

Some of the actions a user can take are: 
* Register
* Login
* Edit profile
* Find matches
* Like person
* Dislike person
* Unmatch

# Installation

**Cloning the project** 
`git clone https://github.com/Ramon96/project-tech.git `

**Installing node modules**
`npm install`

**Dotenv**
This project makes use of the dotenv extension.
When you try to install the project, you will most likeley get some errors. 
This is because we are using a .env file that contains valueable information.
Make sure to contact the repository owner to recieve the dotenv details

# This App is build using
* [Express](https://expressjs.com/) - Web framework for NodeJS
* [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - Templating engine for express
* [Express-sessions](https://www.npmjs.com/package/express-session) - Create a session
* [Express-validator](https://express-validator.github.io) - Collection of form validators 
* [Mongoose](https://mongoosejs.com/) - Layer on top of MongoDB to make MondoDB eassier to use
* [Multer](https://github.com/expressjs/multer) - Middleware for multipart form/data
* [dotenv](https://www.npmjs.com/package/dotenv) - zero-dependency module that loads environment variables from a .env
* [body-parser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware before your handlers
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for password hashing

# Eslint
To check for linting errors run
`eslint ./`
Please resolve all the errors and warnings before pushing your work.

# .gitignore
Settings up your .gitignore file is very important to prevent sensitive data from being pushed into the Git repo.
Your gitignore shouls look something like this:
```
node_modules
.DS_Store
.env
```

# Wiki
For the research, technical research and collaboration please check out our [Wiki](https://github.com/Ramon96/Project-tech-team8/wiki)

# Author(s)
Ramon Meijers

# Contributors 
Wouter Bijnsdorp, Joeri Bouwman

# Used resources
https://www.youtube.com/watch?v=65a5QQ3ZR2g&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR
I used this playlist to learn how to use Node.JS, Express, Mongo and Mongoose

https://www.youtube.com/watch?v=9Qzmri1WaaE
This video guide was used to learn howto store a Image on a local folder, and how to change the current user profile

# License
```MIT License

Copyright (c) 2019 Ramon96

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
