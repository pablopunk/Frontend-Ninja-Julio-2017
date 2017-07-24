const $ = window.$ = window.jQuery = require('jquery')

const songsApiUrl = 'http://192.168.1.2:3100/songs'

export default class SongService {
  // songs list
  list (cb) {
    return $.get(songsApiUrl, cb)
  }

  // save a new song or update an existing one
  save (song) {

  }

  // get song with id
  get (id) {

  }

  // create a new song
  create (song) {

  }

  // update an existing song
  update (song) {

  }

  // delete a song
  delete (id) {

  }
}
