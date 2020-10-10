FROM node:latest
WORKDIR /.xx
COPY . .
RUN yarn install
CMD ["npm", "run", "test"]