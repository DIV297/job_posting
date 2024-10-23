# Getting Started with Create React App With node



## Available Scripts

## Prerequisite 
install node in local pc
also update .env file present in backend folder to run perfectly
There are fields you need to set up
DATABASE_URL = 
PORT = 5000
TWILIO_AUTH_TOKEN = 
TWILIO_ACCOUNT_SID = 
TWILIO_PHONE_NUMBER = 
EMAIL_NODEMAILER = 
EMAIL = 
JWT_SECRET = secret
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

**Features**
Company Registration: Companies can register by providing necessary details.
Email & Phone Verification: Two-step verification process for registering companies.
Company Login: After verification, companies can log in using their credentials.
Job Posting: Companies can add job listings after logging in.
Company Dashboard: Registered companies can see the jobs they have posted.
Notifications: Users will get notifications about new job postings.

## Implementation 
Twilio account is used for mobile number verification
Nodemailer is user for email sending and verification
JWT token are used for authentication
React redux is build for storing tokens and verifications
Modularization of code is done - seperate folders for middlewares, twilio and nodemailer




