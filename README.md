# To-Do App

Gujar Parth Shailesh\
A023354H

An app to track your pending tasks.

The final submission is [here.](GujarParthShailesh_A0235354H_FinalWriteup.pdf)

The live app is [here.](https://dev.d3saygurv1bu0j.amplifyapp.com/)

This project is hosted on AWS Amplify and  was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack
1. AWS - Amplify (hosting) + DynamoDB (database) + Lambda (serverless function) + Cogito (authentication)
2. GraphQL (Appsync) + Go for the backend

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