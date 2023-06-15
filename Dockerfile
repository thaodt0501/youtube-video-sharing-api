
FROM node:16.16.0-alpine as builder

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

###################
# PRODUCTION
###################

FROM node:16.16.0-alpine as production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]
