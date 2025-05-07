# ---------- Base Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# ---------- Dev Stage ----------
FROM node:18-alpine

WORKDIR /app

# Only copy necessary files from builder stage
COPY --from=builder /app /app

EXPOSE 5000

CMD ["npm", "run", "dev"]
