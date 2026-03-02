# Stage 1: build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ▶️ Give local binaries execute permission
RUN chmod -R +x node_modules/.bin

# Now build
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
