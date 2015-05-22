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
          Blaze.renderWithData = function(t, d, b){
            template = t;
            data = d;
            body = b;
          };
          Client.alert("A");
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

      describe("activeCategoryId", function () {
        it("should return undefined if there isn't a categories view model", function () {
          ViewModel.byId = function() {
            return undefined;
          };
          chai.assert.notOk(Client.activeCategoryId());
        });

        it("should return the selected category", function () {
          ViewModel.byId = function() {
            return {
              selected: function() {
                return "A";
              }
            };
          };
          chai.assert.equal(Client.activeCategoryId(), "A");
        });
      });

      describe("activeContactId", function () {
        it("should return undefined if there isn't a contacts view model", function () {
          ViewModel.byId = function() {
            return undefined;
          };
          chai.assert.notOk(Client.activeContactId());
        });

        it("should return the selected contact", function () {
          ViewModel.byId = function() {
            return {
              selected: function() {
                return "B";
              }
            };
          };
          chai.assert.equal(Client.activeContactId(), "B");
        });
      });

      describe("activeSearchText", function () {
        it("should return undefined if there isn't a searchText view model", function () {
          ViewModel.byId = function() {
            return undefined;
          };
          chai.assert.notOk(Client.activeSearchText());
        });

        it("should return the searchText", function () {
          ViewModel.byId = function() {
            return {
              searchText: function() {
                return "B";
              }
            };
          };
          chai.assert.equal(Client.activeSearchText(), "B");
        });
      });
      
    });
  });
}