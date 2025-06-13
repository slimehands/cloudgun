# Use Bun official image
FROM oven/bun:1.1

# Create app directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN pnpm install

# Expose the port
EXPOSE 8765

# Run the server
CMD ["node", "server.js"]
