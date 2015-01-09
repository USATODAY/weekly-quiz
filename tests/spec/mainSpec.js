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

  describe("Renderer", function() {
    beforeEach(function() {
      var $sandbox = $(".sandbox").eq(0);

      $sandbox.append("<div class='quiz-container'></div>");
      app.init();
      console.log(app.objData);
    });

    it("should create 1 quiz for each quiz in the data", function() {
      var dataLength = app.objData.length;
      var quizzes = $(".quiz");
      console.log(quizzes);

      expect(quizzes.length).toEqual(dataLength);
    });
  });


});


