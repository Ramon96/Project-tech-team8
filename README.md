# About Zodimaniac
Zodimaniac is a dating platform designed to match singles based on their zodiac signs. The user is able to tell a little bit about themselves, Post a picture and most importantly match with others based on their zodiac signs.
If both users like each other than it is a match!

Both party's can engage a conversation whenever they like. Zodimaniac will make sure to provide the latest horoscope so that the users are able to plan their date ahead on the most desired day.
unmatching at any point is also a possibility.

Some of the actions a user can take are: 
* Register
* Fill profile.
* Edit profile.
* Find matches.
* Like person
* Dislike person
* Chat with matches.
* unmatch
* Upgrade profile .
* Receive notifications.

# Focused feature
During this project I will focus on profile customization functionality.
**Job story**: When I sign up for a Dating site, I want to be able to create and edit my profile, So other singles can see who I am.

# Installation

**Cloning the project** 
`git clone https://github.com/Ramon96/project-tech.git `

**installing node modules**
`npm install`

# This App is build using
* Code editor of choice
* HTML
* CSS
* Javascript
* NodeJS
* MongoDB
* Lots of coffee ☕

# Documentation 
The app is build on a Express server. We use mongoose to connect to a MongoDB database.
Database settings are stored the dotenv file.

Your dotenv should look something like this
```
DB_HOST = yourhost
DB_PORT = yourport
DB_NAME = yourdbname
USER_ID = 'youruserid';
```

During this project we make use of es5 notation.
The reasoning for this is that the dev team has more experience with this kind of notation.
Your Eslint should look something like this.
```
{
    "env": {
        "browser": true,
        "es5": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": "error"
    }
}
```
It is important to note to do's like so
`// TODO: Do the dishes`
During development we use VSCode and our code editor picks these Todo's up using the [TODO Parser](https://marketplace.visualstudio.com/items?itemName=minhthai.vscode-todo-parser) plugin.

Please document your code using comments.
Specify what a function does

```
// This function makes the duck quack.
Function Quack(duck){
...
}

```

# Folder structure
Your folder structure should look something like this
```
Assets
 - ....png
bin
 - www
.node_modules
public
 - images
 - javascript
 - styles
 - uploads
routes
 - index.js
views
 - layouts
    - layouts.hbs
 - partials
    - header.hbs
 - editprofile.hbs
 - error.hbs
 - index.hbs
 - settings.hbs
 - testarea.hbs
.eslintrc.json
.gitignore
app.js
package-lock.json
package.json
README.md

```

# .gitignore
settings up your gitignore file is very important to prevent sensitive data being leaked
your gitignore shouls look something like this.
```
node_modules
.DS_Store
.env
```

# Author(s)
Ramon Meijers

# Used resources
https://www.youtube.com/watch?v=65a5QQ3ZR2g&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR
I used this playlist to learn how to use Node.JS, Express, Mongo and Mongoose

https://www.youtube.com/watch?v=9Qzmri1WaaE
I Used this video guide to store a Image on a local folder, And change the current user profile

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
