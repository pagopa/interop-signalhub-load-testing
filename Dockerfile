FROM node:current@sha256:a2fea8b0b74b6e828caa6d83f4b2a0dcb2eb1ff90f30205c32f7bd36ddf976c4

RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    openssl \
    curl \ 
    wget \
    git \
    gnupg \
    vim \
    htop \
    net-tools
RUN npm install -g pnpm    

WORKDIR /app
COPY . /app/
RUN chown -R node:node /app
USER node
RUN pnpm install

CMD ["sleep","infinity"]

