# Use Node.js as the base image
FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose the application port
EXPOSE 3000

CMD ["npm", "run", "start"]
