FROM node:20-alpine
WORKDIR /app/server
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile;
COPY . ./
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
USER user
EXPOSE 5000
ENV PORT=5000
RUN yarn build
CMD yarn start