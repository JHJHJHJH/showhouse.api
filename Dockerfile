FROM node:18-alpine As development

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install --only=development

COPY . .

# Expose port to access server
EXPOSE 8080

RUN npm run build

FROM node:18-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/backend/dist ./dist

CMD ["node", "dist/main"]