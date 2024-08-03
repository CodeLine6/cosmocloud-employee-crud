# Base image
FROM node:16-alpine AS builder

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Start development server
CMD ["npm", "run", "dev"]