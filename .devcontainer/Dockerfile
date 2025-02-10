FROM node:20.18.2

RUN mkdir -p /workspace
RUN chown -R node:node /workspace
USER node
WORKDIR /workspace

COPY --chown=node:node . .

RUN npm install

RUN cd frontend && npm install
RUN cd backend && npm install

CMD ["npm", "run", "dev"]
