'use strict';

const schemas = require('maas-schemas');

const BookingCreateRequestType = require("maas-schemas-ts/lib/tsp/booking-create/request")
const BookingCreateResponseType = require("maas-schemas-ts/lib/tsp/booking-create/response")
const BookingOptionsResponseType = require("maas-schemas-ts/lib/tsp/booking-options-list/response")
const typePromise = require("io-ts-promise")

beforeEach(() => {
  schemas.init();
});

describe('Check examples', () => {
  describe('taxi', () => {
    it('booking-create-request.json', () => {
      return typePromise.decode(BookingCreateRequestType,
        require('../examples/taxi/booking-create-request.json'))
    });

    it('booking-create-response.json', () => {
      return typePromise.decode(BookingCreateRequestType,
        require('../examples/taxi/booking-create-response.json'))
    });

    it('booking-options-response.json', () => {
      return typePromise.decode(BookingOptionsResponseType,
        require('../examples/taxi/booking-options-response.json'))
    });
  });
});
