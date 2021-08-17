ARG BUILD_FROM
FROM $BUILD_FROM

# Add env
ENV LANG C.UTF-8

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
EXPOSE 8554/tcp
EXPOSE 8888/tcp

RUN apk add --no-cache \
    nodejs \
    npm \
    ffmpeg \
    git && \
    cd / && \
    git clone https://github.com/patsch9/ring-hassio && \
    cd ring-hassio/ring_hassio && \
    wget https://github.com/aler9/rtsp-simple-server/releases/download/v0.17.2/rtsp-simple-server_v0.17.2_linux_amd64.tar.gz && \
    tar -xf rtsp-simple-server_v0.17.2_linux_amd64.tar.gz && \
    rm -f rtsp-simple-server_v0.17.2_linux_amd64.tar.gz && \
    cp -f config/rtsp-simple-server.yml rtsp-simple-server.yml && \
    npm i ffmpeg-for-homebridge && \
    npm install --unsafe-perm && \
    chmod a+x run.sh && \
    chmod a+x main.mjs

CMD [ "/ring-hassio/ring_hassio/run.sh" ]
