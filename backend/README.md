# Backend Project

The project is based on **[Nest](http://nestjs.com/)**

Database: **[PostgreSQL](https://www.postgresql.org/)** with **[Sequelize](https://sequelize.org/)**

Container based on **[Docker](https://www.docker.com/)**

## How to run a project via **yarn**

**\_Before start need install Docker**

1. yarn (_on first launch_)
2. yarn start:docker
3. yarn serve

## How to open local database

1. Go to localhost:5803
2. In field **email** enter _`pgadmin4@pgadmin.org`_ , in field **password** : _`admin`_
3. In dashboard click _Add New Server_
4. In section **General** add name _(no value what name)_
5. In section **Connection** in field **Host name/address** enter _`db`_ , in field **Username** change on _`postgres`_, in field **Password** add _`7514`_, after click button _Save_
