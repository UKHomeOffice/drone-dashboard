FROM quay.io/ukhomeofficedigital/cop-node:12-alpine

COPY www/ /www

USER root
RUN npm install -g http-server && \
    chown -R 1000:1000 /www

USER 1000
WORKDIR /www
EXPOSE 8080/tcp

CMD [ "http-server", "/www", "-p", "8080", "-d", "false", "-U" ]
