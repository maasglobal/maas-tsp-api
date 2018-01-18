# MaaS TSP (Transport Service Provider) API

This is the MaaS Transport service provider API repository, containing a test suite, reference implementation and specifications. Using these documents, a third party transport service provider can implement a MaaS compatible API.

An interactive version of this documentation is published at [docs.maas-api.org](http://docs.maas-api.org/).

For a brief walk through of a booking process [see here](specs/Booking.md)

## Building the documentation

In order to see the latest documents in Swagger UI, you need to build the docs with the following command:

```
npm run-script build
```
    
## Development
You can start a development server with the following command:

```
npm start
```
    
## Deployment
*After* you have built the documentation, you can deploy to GitHub pages with the following command:

```
npm run-script deploy
```
