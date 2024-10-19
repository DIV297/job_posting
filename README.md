# Getting Started with Create React App With node



## Available Scripts

## Prerequisite 
install node in local pc
# How to Run
## Frontend
### Install nodemodules
to install nodemodules - write npm install in terminal
### start frontend
to run frontend write following command in terminal
npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend
### Move to backend folder 
open new terminal and write following command
cd backend
npm install 

### run backend
to run backend write following command
node index.js

## Deployed url 
https://jobposting-frontend-five.vercel.app/
backend is deployed in render.com and frontend is deployed in vercel

## Features
Companies can register by filling details
Companies needs to under email and phoneNumber verification
after that companies can login by using their password
Companies can add job after login which users will will getting notifications
There are 3 email templates (basic, intermediate and advanced) for emails
Logged In company can see the added jobs in dashboard

## Implementation 
Twilio account is used for mobile number verification
Nodemailer is user for email sending and verification
JWT token are used for authentication
React redux is build for storing tokens and verifications
Modularization of code is done - seperate folders for middlewares, twilio and nodemailer




