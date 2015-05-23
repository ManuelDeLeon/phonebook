if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Login Bindings", function() {
      var html = $("<div></div>").append($(Blaze.toHTML(Template.login)));

      it("should bind new account button", function () {
        var bind = ViewModel.parseBind(html.find("#new-account").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          click: "isNew(true)",
          class: { positive: 'isNew' }
        }));
      });

      it("should bind existing account button", function () {
        var bind = ViewModel.parseBind(html.find("#existing-account").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          click: "isNew(false)",
          class: { positive: '!isNew' }
        }));
      });

      it("should bind right rail", function () {
        var bind = ViewModel.parseBind(html.find(".right.rail").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          if: "signHover && error"
        }));
      });

      it("should bind right rail name invalid", function () {
        var bind = ViewModel.parseBind(html.find(".right.rail ul li:nth-child(1)").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          text: "nameInvalid",
          if: "nameInvalid"
        }));
      });

      it("should bind right rail email invalid", function () {
        var bind = ViewModel.parseBind(html.find(".right.rail ul li:nth-child(2)").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          text: "emailInvalid",
          if: "emailInvalid"
        }));
      });

      it("should bind right rail password invalid", function () {
        var bind = ViewModel.parseBind(html.find(".right.rail ul li:nth-child(3)").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          text: "passwordInvalid",
          if: "passwordInvalid"
        }));
      });

      it("should bind name field", function () {
        var bind = ViewModel.parseBind(html.find("#name-field").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          if: "isNew",
          class: { error: "signHover && nameInvalid" }
        }));
      });

      it("should bind name input", function () {
        var bind = ViewModel.parseBind(html.find("#name-field input").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          value: "name"
        }));
      });

      it("should bind email field", function () {
        var bind = ViewModel.parseBind(html.find("#email-field").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          class: { error: "signHover && emailInvalid" }
        }));
      });

      it("should bind email input", function () {
        var bind = ViewModel.parseBind(html.find("#email-field input").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          value: "email",
          returnKey: "enter"
        }));
      });

      it("should bind password field", function () {
        var bind = ViewModel.parseBind(html.find("#password-field").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          class: { error: "signHover && passwordInvalid" }
        }));
      });

      it("should bind password input", function () {
        var bind = ViewModel.parseBind(html.find("#password-field input").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          value: "password",
          returnKey: "enter"
        }));
      });

      it("should bind enter button", function () {
        var bind = ViewModel.parseBind(html.find("#enter-button").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          click: "enter",
          text: "signText",
          class: { primary: "!error"},
          hover: "signHover"
        }));
      });

      it("should bind enter span", function () {
        var bind = ViewModel.parseBind(html.find("span[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, {
          if: "!error"
        }));
      });
    });
  });
}