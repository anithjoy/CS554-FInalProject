# GitHub repo

- https://github.com/anithjoy/CS554-FinalProject

# AWS Public DNS

- http://ec2-44-204-157-231.compute-1.amazonaws.com

## Installation Using Docker

Below command will start backend on 3000 port and frontend on 3003

Docker Installation - https://docs.docker.com/engine/install/

```sh
docker-compose build
docker-compose up
```

# WorkMate-Backend
## Features

- Create company, user, project, sprint and ticket
- List of user, project, sprint and ticket
- Send or update information about user, project, sprint and ticket
- Send email for creation, updation and deletion of project, sprint and ticket
- Send information about comments on ticket

## Tech

- [Node.js](https://nodejs.org/en/) - A JavaScript library for building an open-source server environment.

## Installation

WorkMate-Backend requires [Node.js](https://nodejs.org/) v10+ to run.

```sh
git clone git@github.com:anithjoy/CS554-FinalProject.git
cd CS554-FinalProject
cd backend 
git checkout master
npm install
npm run seed
npm start
```

# WorkMate-Frontend
## Features
- List of ticket and search ticket by name or email code
- List user, project, sprint and ticket
- Create/update user, project, sprint and ticket
- Give access according to user role
- Comment on ticket which will updated in realtime

## Tech

- [NextJS](https://nextjs.org/) - A JavaScript library for building user interfaces

## Installation

WorkMate-Frontend requires [NextJS](https://nextjs.org/) to run.

```sh
git clone git@github.com:anithjoy/CS554-FinalProject.git
cd CS554-FinalProject
cd frontend 
git checkout master
npm install
npm run build
npm start
```

## Credentials to access and view data in application

WorkMate-Frontend Admin Credentials

admin1.company1@gmail.com
Admin@123

WorkMate-Frontend Manager Credentials

manager1.company1@gmail.com
Manager@123

WorkMate-Frontend Developer Credentials

developer1.company1@gmail.com
Develop@123

WorkMate-Frontend Admin Credentials for company 2 which is new company with 0 user and project.

admin1.company2@gmail.com
Admin@123