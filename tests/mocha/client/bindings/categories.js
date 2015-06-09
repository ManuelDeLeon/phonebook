if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Categories Bindings", function() {

      it("should bind first item", function () {
        var bind = Template.categories.elementBind("a.item[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { class: { active: "!selected" }, click: "selected(null)" } ));
      });

      it("should bind new category", function () {
        var bind = Template.categories.elementBind("input[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { value: "newCategory", returnKey: "addNewCategory" }));
      });

      it("should bind plus sign", function () {
        var bind = Template.categories.elementBind("i[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { if: "newCategory", click: "addNewCategory", attr: { title: "addTitle" } }));
      });

    });
  });
}