if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Login Bindings", function() {

      it("should bind new account button", function () {
        var bind = Template.login.elementBind("#new-account");
        chai.assert.isTrue(_.isEqual(bind, {
          click: "isNew(true)",
          class: { positive: 'isNew' }
        }));
      });

      it("should bind existing account button", function () {
        var bind = Template.login.elementBind("#existing-account");
        chai.assert.isTrue(_.isEqual(bind, {
          click: "isNew(false)",
          class: { positive: '!isNew' }
        }));
      });

      it("should bind right rail", function () {
        var bind = Template.login.elementBind(".right.rail");
        chai.assert.isTrue(_.isEqual(bind, {
          if: "signHover && error"
        }));
      });

      it("should bind right rail name invalid", function () {
        var bind = Template.login.elementBind(".right.rail ul li:nth-child(1)");
        chai.assert.isTrue(_.isEqual(bind, {
          text: "nameInvalid",
          if: "nameInvalid"
        }));
      });

      it("should bind right rail email invalid", function () {
        var bind = Template.login.elementBind(".right.rail ul li:nth-child(2)");
        chai.assert.isTrue(_.isEqual(bind, {
          text: "emailInvalid",
          if: "emailInvalid"
        }));
      });

      it("should bind right rail password invalid", function () {
        var bind = Template.login.elementBind(".right.rail ul li:nth-child(3)");
        chai.assert.isTrue(_.isEqual(bind, {
          text: "passwordInvalid",
          if: "passwordInvalid"
        }));
      });

      it("should bind name field", function () {
        var bind = Template.login.elementBind("#name-field");
        chai.assert.isTrue(_.isEqual(bind, {
          if: "isNew",
          class: { error: "signHover && nameInvalid" }
        }));
      });

      it("should bind name input", function () {
        var bind = Template.login.elementBind("#name-field input");
        chai.assert.isTrue(_.isEqual(bind, {
          value: "name"
        }));
      });

      it("should bind email field", function () {
        var bind = Template.login.elementBind("#email-field");
        chai.assert.isTrue(_.isEqual(bind, {
          class: { error: "signHover && emailInvalid" }
        }));
      });

      it("should bind email input", function () {
        var bind = Template.login.elementBind("#email-field input");
        chai.assert.isTrue(_.isEqual(bind, {
          value: "email",
          returnKey: "enter"
        }));
      });

      it("should bind password field", function () {
        var bind = Template.login.elementBind("#password-field");
        chai.assert.isTrue(_.isEqual(bind, {
          class: { error: "signHover && passwordInvalid" }
        }));
      });

      it("should bind password input", function () {
        var bind = Template.login.elementBind("#password-field input");
        chai.assert.isTrue(_.isEqual(bind, {
          value: "password",
          returnKey: "enter"
        }));
      });

      it("should bind enter button", function () {
        var bind = Template.login.elementBind("#enter-button");
        chai.assert.isTrue(_.isEqual(bind, {
          click: "enter",
          text: "signText",
          class: { primary: "!error"},
          hover: "signHover"
        }));
      });

      it("should bind enter span", function () {
        var bind = Template.login.elementBind("span[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, {
          if: "!error"
        }));
      });
    });
  });
}