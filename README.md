# How to use my docker image

## 1. Download image

```bash
docker pull roger47/mysql:latest
```

```bach
docker pull roger47/new-yunnet-hw-backend:latest
```

```bach
docker pull roger47/new-yunnet-hw-frontend:latest
```

## 2. Start up docker

You need change to use your MySQL root password
```bach
docker run -d --name mysql_container -p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=admin \
-e MYSQL_DATABASE=yunnet_db \
-e MYSQL_USER=user \
-e MYSQL_PASSWORD=admin \
-e MYSQL_PORT=3306 \
roger47/mysql:latest
```

```bach
docker run -d --name backend_container -p 4001:4000 \
-e NODE_PORT=4000 \
-e DATABASE_URL="mysql://user:admin@mysql:3306/yunnet_db" \
-e JWT_SECRET=8f1d2a9b3c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0 \
-e PORT=4000 \
roger47/new-yunnet-hw-backend:latest
```

```bach
docker run -d --name frontend_container -p 3000:3000 \
-e NEXTJS_PORT=3000 \
-e API_URL=http://backend:4000 \
roger47/new-yunnet-hw-frontend:latest
```

## How to view container log

### View real-time logs
```bach
docker logs -f backend_container
```
**if you want exit, press Ctrl + C**

### View the most recent log
```bach
docker logs backend_container
```
**This will display all log but not update continuously**

### View only the latest 50 lines of logs
```bash
docker logs --tail 50 backend_container
```

## How to stop container

```bash
docker stop mysql_container
docker stop backend_container
docker stop frontend_container
```
**You can run "docker ps" to view which container is running**

## How to remove container

```bash
docker rm -f mysql_container
docker rm -f backend_container
docker rm -f frontend_container
```
