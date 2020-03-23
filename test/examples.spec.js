'use strict';

const BookingCreateRequest = require('maas-schemas-ts/lib/tsp/booking-create/request').Request;
const BookingCreateResponse = require('maas-schemas-ts/lib/tsp/booking-create/response').Response;
const BookingUpdateRequest = require('maas-schemas-ts/lib/tsp/booking-update/request').Request;
const BookingUpdateResponse = require('maas-schemas-ts/lib/tsp/booking-update/response').Response;
const BookingCancelResponse = require('maas-schemas-ts/lib/tsp/booking-cancel/response').Response;
const BookingOptionsResponse = require('maas-schemas-ts/lib/tsp/booking-options-list/response').Response;
const BookingReadByIdResponse = require('maas-schemas-ts/lib/tsp/booking-read-by-id/response').Response;
const BookingReceiptResponse = require('maas-schemas-ts/lib/tsp/booking-receipt/response').Response;
const WebhookBookingUpdate = require('maas-schemas-ts/lib/tsp/webhooks-bookings-update/remote-request').RemoteRequest;
const StationsListResponse = require('maas-schemas-ts/lib/tsp/stations-list/response').Response;
const StationsRetrieveResponse = require('maas-schemas-ts/lib/tsp/stations-retrieve/response').Response;
const typePromise = require('io-ts-promise');
const assert = require('assert');

const fs = require('fs');

describe('Check examples', () => {
  describe('taxi', () => {
    it('booking-create-request.json', () => {
      return typePromise.decode(
        BookingCreateRequest,
        JSON.parse(fs.readFileSync('./examples/taxi/booking-create-request.json'))
      );
    });

    it('should fail decode', async () => {
      let failed = false;
      try {
        await typePromise.decode(BookingCreateResponse, {});
      } catch (e) {
        failed = true;
        // eslint-disable-next-line no-console
        console.info('Received expected error', e.message.substring(0, 32) + '...');
      }
      return assert.equal(failed, true);
    });

    it('booking-create-response.json', () => {
      return typePromise.decode(
        BookingCreateResponse,
        JSON.parse(fs.readFileSync('./examples/taxi/booking-create-response.json'))
      );
    });

    it('booking-options-response.json', () => {
      return typePromise.decode(
        BookingOptionsResponse,
        JSON.parse(fs.readFileSync('./examples/taxi/booking-options-response.json'))
      );
    });

    it('booking-read-by-id-response.json', () => {
      return typePromise.decode(
        BookingReadByIdResponse,
        JSON.parse(fs.readFileSync('./examples/taxi/booking-read-by-id-response.json'))
      );
    });

    it('booking-read-by-id-response-activated.json', () => {
      return typePromise.decode(
        BookingReadByIdResponse,
        JSON.parse(fs.readFileSync('./examples/taxi/booking-read-by-id-response-activated.json'))
      );
    });

    it('webhook-booking-update-status.json', () => {
      return typePromise.decode(
        WebhookBookingUpdate,
        JSON.parse(fs.readFileSync('./examples/taxi/webhook-booking-update-status.json'))
      );
    });
  });

  describe('car', () => {
    it('booking-update-request-unlock.json', () => {
      return typePromise.decode(
        BookingUpdateRequest,
        JSON.parse(fs.readFileSync('./examples/car/booking-update-request-unlock.json'))
      );
    });

    it('booking-update-request-lock.json', () => {
      return typePromise.decode(
        BookingUpdateRequest,
        JSON.parse(fs.readFileSync('./examples/car/booking-update-request-lock.json'))
      );
    });

    it('booking-update-response-lock.json', () => {
      return typePromise.decode(
        BookingUpdateResponse,
        JSON.parse(fs.readFileSync('./examples/car/booking-update-response-lock.json'))
      );
    });

    it('booking-create-request.json', () => {
      return typePromise.decode(
        BookingCreateRequest,
        JSON.parse(fs.readFileSync('./examples/car/booking-create-request.json'))
      );
    });

    it('booking-create-response.json', () => {
      return typePromise.decode(
        BookingCreateResponse,
        JSON.parse(fs.readFileSync('./examples/car/booking-create-response.json'))
      );
    });

    it('booking-cancel-response.json', () => {
      return typePromise.decode(
        BookingCancelResponse,
        JSON.parse(fs.readFileSync('./examples/car/booking-cancel-response.json'))
      );
    });

    it('booking-options-response.json', () => {
      return typePromise.decode(
        BookingOptionsResponse,
        JSON.parse(fs.readFileSync('./examples/car/booking-options-response.json'))
      );
    });
  });

  describe('bike', () => {
    it('booking-options-response.json', () => {
      return typePromise.decode(
        BookingOptionsResponse,
        JSON.parse(fs.readFileSync('./examples/bike/booking-options-response.json'))
      );
    });

    it('booking-create-response.json', () => {
      return typePromise.decode(
        BookingCreateResponse,
        JSON.parse(fs.readFileSync('./examples/bike/booking-create-response.json'))
      );
    });

    it('booking-update-request-reserve-dock.json', () => {
      return typePromise.decode(
        BookingUpdateRequest,
        JSON.parse(fs.readFileSync('./examples/bike/booking-update-request-reserve-dock.json'))
      );
    });

    it('booking-update-response-reserve-dock.json', () => {
      return typePromise.decode(
        BookingUpdateResponse,
        JSON.parse(fs.readFileSync('./examples/bike/booking-update-response-reserve-dock.json'))
      );
    });

    it('stations-list-response.json', () => {
      return typePromise.decode(
        StationsListResponse,
        JSON.parse(fs.readFileSync('./examples/bike/stations-list-response.json'))
      );
    });

    it('stations-retrieve-response.json', () => {
      return typePromise.decode(
        StationsRetrieveResponse,
        JSON.parse(fs.readFileSync('./examples/bike/stations-retrieve-response.json'))
      );
    });
  });

  describe('scooter', () => {
    it('booking-create-request.json', () => {
      return typePromise.decode(
        BookingCreateRequest,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-create-request.json'))
      );
    });

    it('booking-create-response.json', () => {
      return typePromise.decode(
        BookingCreateResponse,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-create-response.json'))
      );
    });

    it('booking-options-response.json', () => {
      return typePromise.decode(
        BookingOptionsResponse,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-options-response.json'))
      );
    });

    it('booking-read-by-id-response-activated.json', () => {
      return typePromise.decode(
        BookingReadByIdResponse,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-read-by-id-response-activated.json'))
      );
    });

    it('booking-receipt-response.json', () => {
      return typePromise.decode(
        BookingReceiptResponse,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-receipt-response.json'))
      );
    });

    it('booking-update-expired-request.json', () => {
      return typePromise.decode(
        BookingUpdateRequest,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-update-expired-request.json'))
      );
    });

    it('booking-update-expired-response.json', () => {
      return typePromise.decode(
        BookingUpdateResponse,
        JSON.parse(fs.readFileSync('./examples/scooter/booking-update-expired-response.json'))
      );
    });
  });
});
