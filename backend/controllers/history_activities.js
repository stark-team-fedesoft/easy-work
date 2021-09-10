const history_activities = require("../models/history_activities");

const registerActivies = async (req, res) => {
  if (!req.body.idUser || !req.body.description)
    return res.status(400).send("Incomplete data");

  const activity = new history_activities({
    idUser: req.user._id,
    description: req.body.description,
  });

  const result = await activity.save();
  if (!result) return res.status(400).send("Error registering activity");
  return res.status(200).send({ result });
};

const listActivities = async (req, res) => {
  const activity = await history_activities.find({ userId: req.user._id });
  if (!activity || activity.length === 0)
    return res.status(400).send("no exists Activity");
  return res.status(200).send({ activity });
};

module.exports={registerActivies,listActivities}