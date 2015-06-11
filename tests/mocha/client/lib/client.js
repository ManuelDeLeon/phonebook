if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Client", function () {

      describe("subscriptions", function () {
        it("should have default properties", function () {
          chai.assert.isFalse(Client.subscriptions.mainReady);
        });
      });

      describe("alert", function () {
        it("should call Blaze.renderWithData", function () {
          var template, data, body;
          var render = Blaze.renderWithData;
          Blaze.renderWithData = function(t, d, b){
            template = t;
            data = d;
            body = b;
          };
          Client.alert("A");
          Blaze.renderWithData = render;
          chai.assert.equal(template, Template.alert);
          chai.assert.equal(data, "A");
          chai.assert.equal(body, document.body);
        });
      });

      describe("validEmail", function () {
        it("should return true with a@a.com", function () {
          chai.assert.isTrue(Client.validEmail("a@a.com"));
        });
        it("should return true with a.a@a.a.com", function () {
          chai.assert.isTrue(Client.validEmail("a.a@a.a.com"));
        });

        it("should return false with a.@a.a.com", function () {
          chai.assert.isFalse(Client.validEmail("a.@a.a.com"));
        });
        it("should return false with a.a.a.com", function () {
          chai.assert.isFalse(Client.validEmail("a.a.a.com"));
        });
        it("should return false with a@a", function () {
          chai.assert.isFalse(Client.validEmail("a@a"));
        });
        it("should return false with blank", function () {
          chai.assert.isFalse(Client.validEmail(""));
        });
        it("should return false with null", function () {
          chai.assert.isFalse(Client.validEmail(null));
        });
        it("should return false with undefined", function () {
          chai.assert.isFalse(Client.validEmail(undefined));
        });
      });

      describe("viewmodelValue", function () {
        it("should return undefined if there isn't a view model", function () {
          var byId = ViewModel.byId;
          ViewModel.byId = function() {
            return undefined;
          };
          var result = Client.viewmodelValue("vm", "value");
          ViewModel.byId = byId;
          chai.assert.notOk(result);
        });

        it("should return the view model value", function () {
          var byId = ViewModel.byId;
          ViewModel.byId = function() {
            return {
              selected: function() {
                return "A";
              }
            };
          };
          var result = Client.viewmodelValue("vm", "selected");
          ViewModel.byId = byId;
          chai.assert.equal(result, "A");
        });
      });

    });
  });
}