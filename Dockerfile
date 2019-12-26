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
