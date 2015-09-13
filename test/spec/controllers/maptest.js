'use strict';

describe('Controller: MaptestCtrl', function () {

  // load the controller's module
  beforeEach(module('electionApp'));

  var MaptestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaptestCtrl = $controller('MaptestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MaptestCtrl.awesomeThings.length).toBe(3);
  });
});
