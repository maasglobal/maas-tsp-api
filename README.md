# MaaS TSP (Transport Service Provider) API

This is the MaaS Transport service provider API repository, containing a test suite, reference implementation and specifications. Using these documents, a third party transport service provider can implement a MaaS compatible API.

Up-to-date documentation is published at [API docs](http://maasglobal.github.io/maas-tsp-api/).

For a brief walk through of a booking process [see here](specs/Booking.md)

## Running live server
The live development server can be started by running:

```
npm start
```

## Build and deploy the documentation
In order to update the GitHub Pages branch, you will need to:
1. build the documentation
2. deploy the documentation

### Build the documentation

```
npm run-script build
```


### Deploy the documentation

```sh
npm run-script deploy-temp-gh-pages-deployment-branch
```
