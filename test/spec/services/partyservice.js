'use strict';

describe('Service: PartyService', function () {

  // load the service's module
  beforeEach(module('electionApp'));

  // instantiate service
  var PartyService;
  beforeEach(inject(function (_PartyService_) {
    PartyService = _PartyService_;
  }));

  // it('should allows to get all party list', function () {
  //   var parties = PartyService.getAllParties();
  //   expect(parties).toBe(true);
  // });

});

// TODO: Make Sure to Write Tests When You Have Time >_<