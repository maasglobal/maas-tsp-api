# MaaS TSP (Transport Service Provider) API

This is the MaaS Transport service provider API repository,
containing OpenAPI specification used in communication with TSP.

Using these documents, a third party transport service provider can implement a MaaS compatible API.

An interactive version of this documentation is published at [maasglobal.github.io](https://maasglobal.github.io/maas-tsp-api).

For a brief walk through of a booking process [see here](specs/Booking.md)

## Getting started

- spec/booking.yml - OpenAPI Specification for TSP provider booking

## Living documentation

To run it locally, execute

```
npm install
npm start
```

Open browser and navigate to documentation portal (http://localhost:3000)

- Redoc UI for documentation
- Examples

## Build the static website with documentation

```
npm run build
npm run dist
```

## Links

- https://github.com/maasglobal/maas-schemas/
- https://swagger.io/specification/
- https://github.com/Redocly/redoc/
