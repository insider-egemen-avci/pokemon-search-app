FROM nginx:stable-alpine

LABEL maintainer="Egemen Avci <egemen.avci@useinsider.com>"
LABEL description="Pokedex Search App."

WORKDIR /usr/share/nginx/html

RUN rm index.html

COPY src/ .

EXPOSE 80