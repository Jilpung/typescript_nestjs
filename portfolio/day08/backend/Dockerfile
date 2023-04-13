FROM node:17

WORKDIR /myfolder

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install

COPY . /myfolder/

CMD yarn dev