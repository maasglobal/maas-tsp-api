# WhimApp TSP (Transport Service Provider) API

This is the WhimApp TSP (Transport service provider) API repository,
containing OpenAPI specification, JSON schema for data model and examples.

Using these documents, a third party transport service provider can implement a MaaS compatible API ready to be integrated into [WhimApp](https://whimapp.com)

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

## Related projects

Data model are provided by [maas-schemas](https://github.com/maasglobal/maas-schemas/) which are used in API specification to declare and validate request and response payloads.

To create local, OpenAPI specification compatible copy of this schemas, execute `npm run build`. This will create local `schemas` folder which are referenced in [specs/booking.yml](specs/booking.yml)

## Links

- https://github.com/maasglobal/maas-schemas/
- https://swagger.io/specification/
- https://github.com/Redocly/redoc/
