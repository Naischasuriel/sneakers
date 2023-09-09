const tvshow = require('../models/tvshow');
const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newtvshow,
  create,
  update,
  delete: deleteTvshow
};

async function index(req, res) {
  const tvshows = await tvshow.find({});
  res.render('tvshows/index', { title: 'All tvshows', tvshows });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const tvshows = await tvshow.findById(req.params.id);
  // Mongoose query builder approach to retrieve performers not the tvshow:
    // Performer.find({}).where('_id').nin(tvshow.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the tvshow.cast array like this:
  const performers = await Performer.find({ _id: { $nin: tvshows.cast } }).sort('name');
  res.render('tvshows/show', { title: 'tvshow Detail', tvshows, performers });
}

async function newtvshow(req, res) {
  const tvshows = await tvshow.find({});

  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('tvshows/new', { title: 'Add tvshow', tvshows });
}

async function create(req, res) {
  console.log(req.body)
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new tvshow
    const tvshows = await tvshow.create(req.body);
    // Redirect to the new tvshow's show functionality 
    // res.render(`/tvshows/${tvshows._id}`, { title: 'View Show', tvshows });
    res.redirect('back');
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('tvshows/new', { errorMsg: err.message });
  }
}

async function update(req, res) {
  console.log(req.params)
  try {
    // First, sanitize the data similar to your create function
    req.body.nowShowing = !!req.body.nowShowing;
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    
    // Find and update the show
    await tvshow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // res.render(`/tvshows/${req.params.id}`, { title: "edit n stuff"});
    // res.render('tvshows/show', { title: 'tvshow Detail', tvshows, performers });
    res.redirect('back');
  } catch (err) {
    console.log(err);
    res.render(`tvshows/${req.params.id}`, { errorMsg: err.message });
  }
}

async function deleteTvshow(req, res) {
  try {
    await tvshow.findByIdAndRemove(req.params.id);
    res.redirect('/tvshows'); // Redirect back to the list of tv shows after successful delete.
  } catch (err) {
    console.error(err);
    res.redirect('/tvshows'); // Redirect back to the list of tv shows if there's an error.
  }
}