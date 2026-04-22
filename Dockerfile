FROM node:22-alpine

WORKDIR /app

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia apenas manifests primeiro (cache de layers)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]
