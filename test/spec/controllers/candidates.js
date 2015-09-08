'use strict';

describe('Controller: CandidatesctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('electionApp'));

  var CandidatesctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CandidatesctrlCtrl = $controller('CandidatesctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CandidatesctrlCtrl.awesomeThings.length).toBe(3);
  });
});
