/** @format */

const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find().lean().exec();
    return res.status(200).send(items);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = (model) => async (req, res) => {
  try {
    const item = await model.create(req.body);
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getOne = (model) => async (req, res) => {
  try {
    const item = await model.findById(req.params.id);
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteOne = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndDelete(req.params.id);
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = (model) => ({
  get: getAll(model),
  post: post(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});
