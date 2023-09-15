FROM ubuntu:20.04

ENV TZ=GMT

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install python3 libusb libudev to compile c++ based cryptography deps of polkadot-js library
RUN apt-get update && \
    apt-get install --no-install-recommends -y curl=7.68.* git=1:2.25.* gnupg=2.2.* ca-certificates=20211016ubuntu0.20.04.1 && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | tee "/usr/share/keyrings/nodesource.gpg" >/dev/null && \
    gpg --no-default-keyring --keyring "/usr/share/keyrings/nodesource.gpg" --list-keys && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x focal main" | tee /etc/apt/sources.list.d/nodesource.list && \
    echo "deb-src [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x focal main" | tee -a /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install --no-install-recommends -y nodejs=16.* && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm install yarn@1.22.18 -g && \
    useradd -ms /bin/bash node

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY . .
RUN yarn build

FROM common
COPY --from=build /app /app

HEALTHCHECK --interval=10s --timeout=3s \
    CMD curl -f http://localhost:3000/api/health || exit 1

USER node
EXPOSE 3000

CMD ["yarn", "start"]
