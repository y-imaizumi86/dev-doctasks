FROM node:20.18.2

# ワークスペースディレクトリを作成
RUN mkdir -p /workspace

# nodeユーザーにワークスペースの所有権を与える
RUN chown -R node:node /workspace

# nodeユーザーに切り替える
USER node

WORKDIR /workspace

# プロジェクトのpackage.jsonをコピー
COPY --chown=node:node package*.json ./

# dev-doctasksのnode_modulesをインストール
RUN npm install

# frontendとbackendのpackage.jsonをコピー
COPY --chown=node:node frontend/package*.json ./frontend/
COPY --chown=node:node backend/package*.json ./backend/

# frontendとbackendのnode_modulesをインストール
RUN cd frontend && npm install
RUN cd backend && npm install

# プロジェクト全体をコピー
COPY --chown=node:node . .

CMD ["npm", "run", "dev"]
