'use strict';

describe('Service: candidateService', function () {

  // load the service's module
  beforeEach(module('electionApp'));

  // instantiate service
  var candidateService;
  beforeEach(inject(function (_candidateService_) {
    candidateService = _candidateService_;
  }));

  it('should do something', function () {
    expect(!!candidateService).toBe(true);
  });

});
