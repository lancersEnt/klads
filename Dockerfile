FROM node:18.16-alpine as builder

WORKDIR /usr/share/klads-svc
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
COPY . .

FROM node:18.16-alpine
COPY --from=builder /usr/share/klads-svc/node_modules ./node_modules/
COPY --from=builder /usr/share/klads-svc/package*.json ./
COPY --from=builder /usr/share/klads-svc/dist ./dist/
COPY --from=builder /usr/share/klads-svc/tsconfig.build.json ./
COPY --from=builder /usr/share/klads-svc/tsconfig.json ./
COPY --from=builder /usr/share/klads-svc/prisma ./prisma/

ENV NODE_OPTIONS=--max_old_space_size=4096

CMD ["npm", "run", "start"]