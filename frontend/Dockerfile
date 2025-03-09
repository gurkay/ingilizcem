# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=NQOSd8J/wnueoxrzwc9BzoSfxvn5vvT9d+pGowghpUA=
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
