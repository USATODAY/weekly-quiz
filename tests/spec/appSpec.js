define(['app'], function(app) {


  describe("App", function() {
    it("should be defined", function() {
      expect(app).toBeDefined();
    });
    it("should have a renderQuiz method", function() {
      expect(app.renderQuiz).toBeDefined();
    });
  });

  describe("jQuery", function() {
    it("should exist", function() {
      expect(window.jQuery).toBeTruthy();
    });
  });

  describe("loadData", function() {
    beforeEach(function() {
      spyOn(jQuery, "getJSON");
      spyOn(app, "renderQuiz");

      app.loadData();
    });

    it("should make an ajax call for data", function() {
      expect(jQuery.getJSON).toHaveBeenCalled();
      console.log(jQuery.getJSON);
    });

  });


});


