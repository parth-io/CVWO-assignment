# To-Do App

Gujar Parth Shailesh\
A023354H

An app to track your pending tasks.

The final submission is [here.](GujarParthShailesh_A0235354H_FinalWriteup.pdf)

The live app is [here.](https://dev.d3saygurv1bu0j.amplifyapp.com/)

This project is hosted on AWS Amplify and  was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local Set-up

### Dependencies for development

- [aws-cli 2.4.7](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- `npm install -g @aws-amplify/cli`(https://docs.amplify.aws/cli/start/install/#install-the-amplify-cli)

### Installation to run locally

You will require an AWS account.

```sh
~ git clone https://github.com/parth-io/CVWO-assignment.git
~ cd CVWO-assignment
~ npm install
~ amplify init
? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y
~ amplify push
? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N(o)
~ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Details
1. Frontend - AWS Amplify (hosting)
2. Backend - GraphQL (AWS Appsync), DynamoDB (database), Lambda (serverless function) in Golang, Cogito (authentication)

Some libraries used
1. React Router
2. Material UI
3. Lodash (for its `debounce` function)
4. Redux

AWS Cloudwatch Cron Job Rules are [here](https://github.com/parth-io/CVWO-assignment/blob/1551973ec6c0a0ab75a9bc3115b753d75c92e10a/amplify/backend/function/generateBackup/parameters.json).
