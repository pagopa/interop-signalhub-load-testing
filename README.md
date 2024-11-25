# Interop SignalHub Load Testing

This is a repository containing source code for load testing application with Gatling.

## Introduction

Goal of this repository is understand how signal-hub ecosystem work under a high stress condition. To do this we choose an "Open workload" model. Load test start with few users until reach an high number of users with goal to stress application.

## Getting started

In order to execute load test you need to build a Docker image with:
this:

```
docker build -t load-testing .
```

You can run image just created with:

```
docker run -d load-testing
```

## Run load test

Right now you can run load test for push-service and pull-service. In order to run test against a specific ENV you have to setup BASE_URL. For each service you can choose to run only test and after upload report's result on S3 bucket, or make this activity togheter running one command.

### Push

Run push without upload results on S3:

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  <DOCKER_IMAGE_NAME>  sh -c 'pnpm push'
```

Upload results on S3:

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  <DOCKER_IMAGE_NAME>  sh -c 'pnpm upload-report'
```

Run push and, after test has completed, upload results on S3:

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  <DOCKER_IMAGE_NAME>  sh -c 'pnpm push:report'
```

### Pull

Run pull without upload results on S3:

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  <DOCKER_IMAGE_NAME>  sh -c 'pnpm pull'
```

Upload results on S3:

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  <DOCKER_IMAGE_NAME>  sh -c 'pnpm upload-report'
```

Run pull and, after test has completed, upload results on S3:

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  <DOCKER_IMAGE_NAME>  sh -c 'pnpm pull:report'
```
