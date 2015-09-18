'use strict';

describe('Directive: beehive', function () {

  // load the directive's module
  beforeEach(module('electionApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<beehive></beehive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the beehive directive');
  }));
});
