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
* Code editor of choice
* HTML
* CSS
* Javascript
* NodeJS
* MongoDB
* Lots of coffee ☕

# Eslint
To check for linting errors run
`eslint ./`
Please resolve all the errors and warnings before pushing your work.

# Code conventions
```
It is important to note to-do's like so:
`// TODO: Do the dishes`
During development we use VSCode and our code editor picks these Todo's up using the [TODO Parser](https://marketplace.visualstudio.com/items?itemName=minhthai.vscode-todo-parser) plugin.

Please document your code using comments, and specify what a function does.

```
// This function makes the duck quack.
Function Quack(duck){
...
}

```

During this project we make use of [{{handlebars}}](https://handlebarsjs.com/)

# Merging
When Merging to the master branch, review with atleast 1 other programmer is required. 
Your commit message should append the [gitmoji](https://gitmoji.carloscuesta.me/) notation style followed with a description of the work you are going to append to the project.

## Gitmoji cheatsheet
```
🎨 improving structure / format
⚡ performance
🔥 deletion
🐛 bug
✨ new feature(s)
📝 docs
🚀 deploying
💄 updating ui / style files
🚧 WIP
➕ add dependency
➖ remove dependency
💩 writing shit that needs improvement
✏ typo fix
🔧 changing config files
🚚 moving /renaming
📱 working on responsive design
```

# File structure
Try to follow the following file structure
```
// Import dependencies
var express = require('express');
var router = express.Router();

//Variable declerations
var variable = "variable"

// Your routes in logicall order

router.get('/', function(req, res){
    res.render('index', {
        title: "hello world!"
    });
});

router.post('/insert', function(req, res){
    // do something
});

//function declerations

function Something(){
    //...
}

//Export the module
module.exports = router;

```

# Folder structure
Your folder structure should look something like this:
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
Settings up your .gitignore file is very important to prevent sensitive data from being pushed into the Git repo.
Your gitignore shouls look something like this:
```
node_modules
.DS_Store
.env
```

# Author(s)
Ramon Meijers

# Contributors 
Wouter Dijnsdorp, Joeri Bouwman

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
