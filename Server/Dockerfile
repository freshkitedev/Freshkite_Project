# ========================
# Stage 1: Build Stage
# ========================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# ============================
# Stage 2: Production Stage
# ============================
FROM node:18-alpine

WORKDIR /app

# Only copy necessary files from builder stage
COPY --from=builder /app /app

EXPOSE 5000

CMD ["npm", "run", "dev"]
