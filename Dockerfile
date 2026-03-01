# Build Frontend
FROM node:22-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build Backend
FROM node:22-alpine as backend-build
# Install build tools for native modules like sqlite3 and bcrypt
RUN apk add --no-cache python3 make g++
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# Production Stage
FROM node:22-alpine
WORKDIR /app

# Copy Backend build files and only production dependencies
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package.json ./backend/package.json

# Copy Frontend build artifacts
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Create persistent storage directories
RUN mkdir -p /app/data /app/uploads

# Set Environment Variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the single port
EXPOSE 8080

# Start the application from the app root
CMD ["node", "backend/dist/main"]
