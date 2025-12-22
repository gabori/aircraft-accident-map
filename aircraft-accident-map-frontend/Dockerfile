# ---------- BUILD ----------
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build aircraft-accident-map-frontend --configuration=production

# ---------- NGINX ----------
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🔥 FONTOS: /browser !
COPY --from=build /app/dist/aircraft-accident-map-frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
