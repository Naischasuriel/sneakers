const Actor = require('../models/actors');
const tvshow = require('../models/tvshow');

module.exports = {
  new: newActor,
  create,
  addToCast,
  delete: deleteActor
};

async function addToCast(req, res) {
  const show = await tvshow.findById(req.params.id);
  // The cast array holds the actor's ObjectId (referencing)
  show.cast.push(req.body.actorId);
  await show.save();
  res.redirect(`/tvshows/${show._id}`);
}

async function newActor(req, res) {
  // Sort actors by their name
  const actors = await Actor.find({}).sort('name');
  res.render('actors/new', { title: 'Add Actor', actors });
}

async function create(req, res) {
  try {
    await Actor.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/actors/new');
}

  async function deleteActor(req, res) {
    try {
      await Actor.findByIdAndRemove(req.params.id);  // This will remove the actor with the given ID.
      res.render('/actors/new'); // After deleting, redirect to the actor addition page.
    } catch (err) {
      console.log(err);
      res.send('There was an error deleting the actor.');
    }
}


