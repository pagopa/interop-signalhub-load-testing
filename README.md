# Interop SignalHub Load Testing

This is a repo for load testing application with Gatling


## Build Image

````
 docker build -t load-testing  .
 ```


docker run -d load-testing

```
docker exec -it -e BASE_URL="https://api.dev.signalhub.interop.pagopa.it"  infallible_ptolemy   sh -c 'pnpm status:push'
```