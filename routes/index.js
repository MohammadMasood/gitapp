
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.pages = function (req, res) {
  //console.log(req.params);
  var name = req.params.name;
  res.render('pages/' + name);
  
};