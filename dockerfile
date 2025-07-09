########################################
# Stage 1: Build the React frontend     #
########################################
FROM node:18 AS frontend-build
WORKDIR /app/client

# 1. Install client dependencies
COPY client/package*.json ./
RUN npm ci

# 2. Copy client source & build
COPY client/ ./
RUN npm run build             # outputs to /app/client/dist

########################################
# Stage 2: Build the Express backend   #
########################################
FROM node:18 AS server-build
WORKDIR /app/server

# 3. Install server dependencies
COPY server/package*.json ./
RUN npm ci

# 4. Copy server source
COPY server/ ./

# 5. Embed the built frontend into server/public
COPY --from=frontend-build /app/client/dist ./public

########################################
# Stage 3: Production image            #
########################################
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# 6. Copy over the server (incl. public/)
COPY --from=server-build /app/server ./

# 7. Run as non-root user for security
RUN chown -R node:node /app
USER node

# 8. Expose the port the app listens on
EXPOSE 3001

# 9. Launch the Express server
CMD ["node", "index.js"]
