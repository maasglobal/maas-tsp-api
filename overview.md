# MaaS resources

Overview of resources available from MaaS Global, creators of [WhimApp](https://whimapp.com).

## OpenAPI specification

This is an API specification of REST endpoints that a Transport Service
Provider (TSP) should implement to offer their services through the
[WhimApp](https://whimapp.com/).

- [OpenAPI Specification](https://github.com/maasglobal/maas-tsp-api/tree/master/specs/booking.yml)
- [Documentation](https://maasglobal.github.io/maas-tsp-api/redoc.html?booking.json)
- [SwaggerUI](https://maasglobal.github.io/maas-tsp-api/swagger-ui.html?urls.primaryName=booking.yml)

## API Data Model (JSON Schema)

Based on [JSON Schema](https://json-schema.org/) standard, defines schema definitions for information exchanged between WhimApp and TSP.

- [Schemas](https://github.com/maasglobal/maas-schemas/tree/develop/maas-schemas/schemas)
- [Documentation](https://maasglobal.github.io/maas-schemas/)

## Booking sequence diagrams

These diagrams show how User, WhimApp and TSP interact to perform booking with various modes of transportation (Taxi, Bike, etc)

### Taxi

![Taxi sequence diagram](https://maasglobal.github.io/maas-tsp-api/specs/workflow/taxi-sequence.svg)

### Docked bike

![Docked bike sequence diagram](https://maasglobal.github.io/maas-tsp-api/specs/workflow/docked-bike-sequence.svg)

## Booking state flow

These diageams show the state transition for booking when journey is in progress.

### Taxi

![Taxi state flow](https://maasglobal.github.io/maas-tsp-api/specs/workflow/taxi.svg)

### Bike

![Taxi state flow](https://maasglobal.github.io/maas-tsp-api/specs/workflow/bike.svg)

### Docked bike

> ⚠️ ON_HOLD state for docked bikes only supported in version **v.1.2.0-future** which is not yet deployed to production.

![Taxi state flow](https://maasglobal.github.io/maas-tsp-api/specs/workflow/docked-bike.svg)

## Examples

See the repository for JSON examples of data exchanged between WhimApp and TSP

[Examples repository](https://github.com/maasglobal/maas-tsp-api/tree/master/examples)
