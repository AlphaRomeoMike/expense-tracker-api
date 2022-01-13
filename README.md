# Welcome to Node JS Expense Tracker API

### For Windows
If you want custom snippets for `require()`, just open Powershell, and run command `cp documents/userfiles.json .vscode/vscode-snippets.code-snippets` and you will be able to use them. 

To run this app, you will need to run `npm i` in the root directory of your project after cloning. This will create a package.json. You will also be able to debug it by running `npm run dev`


### For Linux/Mac
To run this app, you will need to run `npm i` in the root directory of your project after cloning. This will create a package.json. You will also be able to debug it by running `npm run dev`

### Requirements
_Node JS version 17.*_
_NPM version 8.*_

For .env, just clone the `.env.example` file already provided with the name `.env` and you will be able to handle the environment variables

**KEYS required in environment file**
`DB_URI` will be a string providing an absolute path to a database
`PORT` will be an integer of any free port on your system
`JWT_SECRET` will be a string that is required to encode the JWT Token