'use strict';

const Error = require('maas-schemas-ts/lib/core/error').Error;
const typePromise = require('io-ts-promise');

describe('Check examples', () => {
  describe('errors', () => {
    it('409 booking already exists on create', () => {
      return typePromise.decode(Error, {
        code: 'BOOKING_ALREADY_EXISTS',
        message: 'Active booking already exists for this user.',
        bookingId: 'deadbeefdeadbeefdeadcafe0000',
      });
    });
  });
});
