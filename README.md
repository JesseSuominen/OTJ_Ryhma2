# OTJ_Ryhma2

Authors:
Miika Hupli, Jesse Suominen, Markus Heinonen

# Introduction

This is a website project that will be run locally on your computer.
By following the steps below, you can start the backend and frontend servers.
After the servers are running, you can access the application by visiting site
localhost:3000 in your browser.

## Frontend
based on "npx create-react-app frontend" -template
- see Readme on the directory for further details
- DO NOT "npm audit fix --force" IT INTRODUCES MORE VULNERABILITES THANKS TO MUI

ON FRESH CLONE DO THESE:
- "npm i" install packages
- "npm start" start server

Extra libraries and its command ("npm i" installs these too):
- Material UI: "npm install @mui/material @emotion/react @emotion/styled"
    - https://mui.com/material-ui/getting-started/

## Backend:
based on "npx create-express-api -d backend" -template
- see Readme on the directory for further details

ON FRESH CLONE DO THESE:
- "npm i" install packages
- "npm start" start server
- change your .env JWT_KEY value to encrypt user passwords with a private key

## Packages for npm:
- necessary packages will be installed automatically with "npm i"

## Test data
There is test data on fresh install:
- username: testuser
- password: testpassword
- 1 chatroom, event, workhour and message
- you can read more in sql/README.md
