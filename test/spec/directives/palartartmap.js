'use strict';

describe('Directive: palartartMap', function () {

  // load the directive's module
  beforeEach(module('electionApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<palartart-map></palartart-map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the palartartMap directive');
  }));
});
