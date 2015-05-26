if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Categories Bindings", function() {
      var html = $("<div></div>").append($(Blaze.toHTML(Template.categories)));

      it("should bind first item", function () {
        var bind = ViewModel.parseBind(html.find("item[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { class: { active: "!selected" }, click: "selected(null)" } ));
      });

      it("should bind new category", function () {
        var bind = ViewModel.parseBind(html.find("input[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { value: "newCategory", returnKey: "addNewCategory" }));
      });

      it("should bind plus sign", function () {
        var bind = ViewModel.parseBind(html.find("i[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { if: "newCategory", click: "addNewCategory", attr: { title: "addTitle" } }));
      });

    });
  });
}