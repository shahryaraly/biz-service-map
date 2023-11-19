# Draggable List Items Project
### A complete project to build a monorepo project where custom kanban board can be created

<br>

# Project Highlights 
1. Node.js
2. Nest.js
3. React.js
3. Typescript
4. mssql 
5. Monorepo

# About The Project
This project is designed to create a dynamic kanban board for various use cases e.g: tracking progress, queue management, status identification & e.t.c


## Setting Up Application & Running in local machine

#### Prerequisites
 
1. Download visual studio code or any JS supported IDE in working machine
 </br>
 [vs-code](https://code.visualstudio.com/download)

2. Download Git in working machine
 [git](https://git-scm.com/downloads)

3. Downlaod Docker & run docccker engine
 [docker](https://www.docker.com/products/docker-desktop/)
 [run docker](https://docs.docker.com/desktop/)

4. Install and Run ms-sq-server image for database operations
 ```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password@123" -p 1433:1433 --name cards -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
```

 ```bash
docker start biz-mssql
```

5. Download any database client or dbeaver and connect to above image 
[Database Client](https://dbeaver.io/download/)

6. Execute database script provided in resource folder
**./resources/draggable-list.sql**

7. Install nodejs 18.18.2 version in working machine
  </br>
 [node.js](https://nodejs.org/en/blog/release/v18.18.2)

8. Clone project in your workspace directory by executing below command in shell/cmd
 ```bash
 git clone https://github.com/shahryaraly/biz-draggable-list.git
```

#### Bootstrap Projects

Install all the npm packages. 
Go into the root directory(biz-draggable-list) of project folder and type the following command to install all npm packages
```bash
npm install
```

Install lerna to run all packages
```bash
npm install -g lerna
```

In order to run the application the following command
```bash
lerna run start
```

This will run ReactJs application **localhost:3000** && will run NodeJs application on **localhost:3005**

## Application design 

1. **List**
**Component** : renders the list which is tightly coupled with GET API "/api/v1/biz-draggable-list/list" which is binded with database table **list** under schema **draggablelist**.</br>below actions applicable for subject componenet.

- Add a List
- Edit a List
- Delete List

2. **Draggable Item**
**Component** : Renders the items associated with list, tightly coupled with list as an parent-child (associations) relationship. depended on GET API which is binded with database table **list_item** under schema **draggablelist**.</br>below actions applicable for subject componenet.

- Add a List Item under a List
- Edit a List Item
- Delete List Item


<!-- CONTRIBUTING -->
## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact
Shahriyal Ali- [linkedin](https://www.linkedin.com/in/shahryaraly/) && [mail](shahryaraly@live.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>