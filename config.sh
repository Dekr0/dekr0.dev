build() {
    npm run build
    docker image rm dekr0.com:latest
    docker build . -t dekr0.com:latest
}

up() {
    docker compose up -d
}

deploy() {
    build
    up
}
