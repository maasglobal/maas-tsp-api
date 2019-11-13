'use strict';

const schemas = require('maas-schemas');

beforeEach(() => {
  schemas.init();
});

describe('Check examples', () => {
  describe('taxi', () => {
    it('booking-create-request.json', () => {
      return schemas.validate(
        require('../schemas/tsp/booking-create/request.json'),
        require('../examples/taxi/booking-create-request.json')
      );
    });

    it('booking-create-response.json', () => {
      return schemas.validate(
        require('../schemas/tsp/booking-create/response.json'),
        require('../examples/taxi/booking-create-response.json')
      );
    });

    it('booking-options-response.json', () => {
      return schemas.validate(
        require('../schemas/tsp/booking-options-list/response.json'),
        require('../examples/taxi/booking-options-response.json')
      );
    });

    it('booking-read-by-id-response.json', () => {
      return schemas.validate(
        require('../schemas/tsp/booking-read-by-id/response.json'),
        require('../examples/taxi/booking-read-by-id-response.json')
      );
    });

    it('booking-read-by-id-response-activated.json', () => {
      return schemas.validate(
        require('../schemas/tsp/booking-read-by-id/response.json'),
        require('../examples/taxi/booking-read-by-id-response-activated.json')
      );
    });
  });
});
