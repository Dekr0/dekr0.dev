build() {
    docker image rm dekr0.com:latest
    docker build . -t dekr0.com:latest
    npm run build
}

up() {
    docker compose up -d
}

deploy() {
    build
    up
}
