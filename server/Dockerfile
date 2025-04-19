FROM node:18-bullseye

# Çalışma dizini
WORKDIR /app

# Paketleri yükle
COPY package*.json ./
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Prisma client'ı generate et (doğru ortam için)
RUN npx prisma generate --schema ./src/prisma/schema.prisma

# TypeScript build
RUN npx tsc

# Uygulama portu
EXPOSE 5000

# Başlatma komutu
CMD ["node", "dist/app.js"]
