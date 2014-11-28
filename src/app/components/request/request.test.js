describe('Request', function() {
  
  beforeEach(function() {
    module('throwpillow');
  });

  var ctrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('RequestCtrl', {
      $scope: scope
    });
  }));

  it('has submit function', function() {
    expect(scope).to.have.property('submit');
  });
});
