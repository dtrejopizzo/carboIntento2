FROM node:14.16.0-slim
WORKDIR /app
COPY . /app
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_METRIC_SERVER=https://metricreporter.lumenswap.io
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
RUN rm .eslintrc.js
RUN npm i
RUN npm i -g serve
ENV PORT=8080
RUN npm run build
CMD ["serve", "-s", "build"]
