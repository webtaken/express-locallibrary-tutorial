var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  var life = []
  if(this.date_of_birth)
    life.push(moment(this.date_of_birth).format('YYYY-MM-DD'));
  else
    life.push('UNK');
  if(this.date_of_death)
    life.push(moment(this.date_of_birth).format('YYYY-MM-DD'));
  else
    life.push('UNK');

  return life;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
