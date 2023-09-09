const tvshow = require('../models/tvshow');

module.exports = {
  create
};

async function create(req, res) {
  const tvshow = await tvshow.findById(req.params.id);
  // We can push (or unshift) subdocs into Mongoose arrays
  tvshow.reviews.push(req.body);
  try {
    // Save any changes made to the tvshow doc
    await tvshow.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/tvshows/${tvshow._id}`);
}