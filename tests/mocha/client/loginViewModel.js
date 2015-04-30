if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Login View Model", function(){
      var nameError = 'Name is required';
      var emailError = 'Valid email is required';
      var passwordError = 'Password must be at least 8 characters long';
      var vm;

      beforeEach(function() {
        vm = Template.login.createViewModel();
      });

      it("should have default values", function(){
        chai.assert.equal(vm.name(), '');
        chai.assert.equal(vm.email(), '');
        chai.assert.equal(vm.password(), '');
        chai.assert.equal(vm.isNew(), true);
        chai.assert.equal(vm.signHover(), false);
      });

      describe("signText", function(){
        it("should be 'Sign Up' by default", function(){
          chai.assert.equal(vm.signText(), 'Sign Up');
        });
        it("should be 'Sign In' when isNew is false", function(){
          vm.isNew(false);
          chai.assert.equal(vm.signText(), 'Sign In');
        });
      });


      describe("nameInvalid", function(){
        it("should have error by default", function(){
          chai.assert.equal(vm.nameInvalid(), nameError);
        });
        it("should be blank when isNew is false", function(){
          vm.isNew(false);
          chai.assert.equal(vm.nameInvalid(), '');
        });
        it("should be blank when name has a value", function(){
          vm.name('X');
          chai.assert.equal(vm.nameInvalid(), '');
        });
      });

      describe("emailInvalid", function(){
        it("should have error by default", function(){
          chai.assert.equal(vm.emailInvalid(), emailError);
        });
        it("should have error when email is a@a", function(){
          vm.email('a@a');
          chai.assert.equal(vm.emailInvalid(), emailError);
        });
        it("should be blank when email is a@a.com", function(){
          vm.email('a@a.com');
          chai.assert.equal(vm.emailInvalid(), '');
        });
      });

      describe("passwordInvalid", function(){
        it("should have error by default", function(){
          chai.assert.equal(vm.passwordInvalid(), passwordError);
        });
        it("should have error when password is 12345", function(){
          vm.password('12345');
          chai.assert.equal(vm.passwordInvalid(), passwordError);
        });
        it("should be blank when password is 12345678", function(){
          vm.password('12345678');
          chai.assert.equal(vm.passwordInvalid(), '');
        });
      });

      describe("error function", function(){
        it("should have name error by default", function(){
          chai.assert.equal(vm.error(), nameError);
        });
        it("should have email error when name is valid", function(){
          vm.name('X');
          chai.assert.equal(vm.error(), emailError);
        });
        it("should have password error when name and email are valid", function(){
          vm.name('X');
          vm.email('a@a.com');
          chai.assert.equal(vm.error(), passwordError);
        });
        it("should be blank when name, email, and password are valid", function(){
          vm.name('X');
          vm.email('a@a.com');
          vm.password('12345678');
          chai.assert.equal(vm.error(), '');
        });
      });

      describe("enter function", function(){
        var calledCreateUser;
        var calledLoginWithPassword;
        Accounts.createUser = function() {
          calledCreateUser = true;
        };
        Meteor.loginWithPassword = function() {
          calledLoginWithPassword = true;
        };
        beforeEach(function(){
          calledCreateUser = false;
          calledLoginWithPassword = false;
        });
        it("should not do anything by default (with error)", function(){
          vm.enter();
          chai.assert.isFalse(calledCreateUser);
          chai.assert.isFalse(calledLoginWithPassword);
        });
        it("should create user if isNew", function(){
          vm.name('X');
          vm.email('a@a.com');
          vm.password('12345678');
          vm.enter();
          chai.assert.isTrue(calledCreateUser);
          chai.assert.isFalse(calledLoginWithPassword);
        });

        it("should login user if isNew == false", function(){
          vm.email('a@a.com');
          vm.password('12345678');
          vm.isNew(false);
          vm.enter();
          chai.assert.isFalse(calledCreateUser);
          chai.assert.isTrue(calledLoginWithPassword);
        });
      });
    });
  });
}
