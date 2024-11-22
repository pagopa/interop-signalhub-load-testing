FROM node:current@sha256:8f96a3600bff22cddf63db753affacaea31e194dda0018c793ee33ad3a325c4a

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

ENTRYPOINT ["/bin/bash"]