'use strict'
var Schema = require('mzen-schema');

class ArtistSchema extends Schema
{
  constructor(spec, options)
  {
    super(spec, options);
    this.setName('artist');
    this.setSpec({

    });
  }
}

module.exports = ArtistSchema;
