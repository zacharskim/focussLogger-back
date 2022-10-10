const focusTimeRouter = require("express").Router();
const FocusTime = require("../models/focusTime.js");
//nice basic crud app format...

focusTimeRouter.get("/", (request, response) => {
  FocusTime.find({}).then((focusTimes) => {
    response.json(focusTimes);
  });
});

///in a GET request, you pass parameters as part of the query string.
//see: https://stackoverflow.com/questions/514892/how-to-make-an-http-get-request-with-parameters
//currently there's an error here that will be fixed evnetually...
focusTimeRouter.get("/:id", (request, response, next) => {
  FocusTime.findById(request.params.id) //ahh that's why....
    .then((focusTime) => {
      if (focusTime) {
        response.json(focusTime);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

focusTimeRouter.post("/", (request, response, next) => {
  const body = request.body;

  const focusTime = new FocusTime({
    userEmail: body.userEmail,
    tagColor: body.tagColor,
    intention: body.intention,
    tag: body.tag,
    date: body.date,
    localTime: body.localTime,
    length: body.length,
  });

  focusTime
    .save()
    .then((savedfocusTime) => {
      response.json(savedfocusTime);
    })
    .catch((error) => next(error));
});

focusTimeRouter.delete("/:id", (request, response, next) => {
  FocusTime.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//update function....
focusTimeRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const focusTime = {
    userEmail: body.email,
    tagColor: body.tagColor,
    intention: body.intention,
    tag: body.tag,
    date: body.date,
    localTime: body.localTime,
    length: body.length,
  };

  FocusTime.findByIdAndUpdate(request.params.id, focusTime, { new: true })
    .then((updatedfocusTime) => {
      response.json(updatedfocusTime);
    })
    .catch((error) => next(error));
});

module.exports = focusTimeRouter;
