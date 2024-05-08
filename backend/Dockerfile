FROM node:17-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Install nodemon globally
RUN npm install -g nodemon

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]