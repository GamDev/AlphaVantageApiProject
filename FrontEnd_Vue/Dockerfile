# Use Node.js as the base image for building
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files and build the Vue app
COPY . .
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
