FROM node:current

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

RUN pnpm install

CMD ["sleep","infinity"]


