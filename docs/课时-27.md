## 课时 27：docker 配置及使用

### 添加 Dockerfile

```bash
# 指定这个镜像的基础是什么，我们选择了node: 11.12.0这个版本作为基础镜像
FROM node:11.12.0
# 在容器中创建一个目录
RUN mkdir -p /usr/src/webpack-box/
RUN mkdir -p /usr/src/app/

# 定位到容器的工作目录
WORKDIR /usr/src/webpack-box/

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app/
RUN npm i

# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/webpack-box/ 目录下
COPY . /usr/src/webpack-box/

EXPOSE 8889
CMD npm run dev
```

### 添加 .dockergitnore

```bash
.git
node_modules
```

### 执行命令

```json
{
  "script": {
    "dev:docker": "docker run -v \"$(PWD)\":/usr/src/webpack-box/ docker-webpack-box npm run dev",
    "build:docker": "docker build -t docker-webpack-box ."
  }
}
```

docker 常用命令

```bash
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签] # 获取镜像
docker image rm [选项] <镜像1> [<镜像2> ...] # 删除镜像
docker image ls # 列出镜像
docker image prune # 删除 REPOSITORY 为 <node> 的虚悬镜像

# 浏览器中访问 http://localhost/
docker run --name webserver -d -p 80:80 nginx
docker exec -it webserver bash # 以交互式终端方式进入 webserver 容器，并执行了 bash 命令
echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
exit

# 查看容齐具体的改动
docker diff CONTAINER

docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]
docker commit \
    --author "Xue Luo <17801048701@163.com>" \
    --message "修改了默认网页" \
    webserver \
    nginx:v2

# 具体查看镜像内的历史记录
docker history nginx:v2

# 新的镜像定制好后，我们可以来运行这个镜像，访问 http://localhost:81/
docker run --name web2 -d -p 81:80 nginx:v2

# 镜像构建
docker build [选项] <上下文路径/URL/->

docker build -t docker-webpack-box .

docker container ls # 所有容齐列表
docker container ls -a # 查看所有已经创建的包括终止状态的容器

docker container rm  trusting_newton # 删除容器
```

### 学习资料

https://docker_practice.gitee.io/zh-cn/introduction/what.html
