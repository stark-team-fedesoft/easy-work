const history_activities = require("../models/history_activities");

const registerActivies = async (req, res) => {
  if (!req.body.description) return res.status(400).send("Incomplete data");

  const activity = new history_activities({
    idUser: req.user._id,
    idBoard: req.body.idBoard,
    description: req.user.name + " ha " + req.body.description,
  });

  const result = await activity.save();
  if (!result) return res.status(400).send("Error registering activity");
  return res.status(200).send({ result });
};

const listActivities = async (req, res) => {
console.log(req.params["idBoard"]);
  const activity = await history_activities.find({ idBoard: req.params["idBoard"]} );
  console.log(activity);
  if (!activity || activity.length === 0)
    return res.status(400).send("no exists Activity");
  return res.status(200).send({ activity });
};

module.exports = { registerActivies, listActivities };
