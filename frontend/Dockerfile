# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm ci
RUN npm install -g @angular/cli@17.0.0
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy built files from previous stage
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]