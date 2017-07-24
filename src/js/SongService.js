import $ from 'jquery'

/**
 * Rest API interface
 * All methods return an $.ajax() object,
 * so you can handle the callbacks the same
 * way you do it with jQuery AJAX
 */
export default class SongService {
  constructor (url = '/songs') {
    this.url = url
  }

  // songs list
  list (cb) {
    return $.get(this.url, cb)
  }

  // save a new song or update an existing one
  save (song, cb) {
    if (song.id) {
      this.update(song, cb)
    } else {
      this.create(song, cb)
    }
  }

  // get song with id
  get (id, cb) {
    return $.get(`${this.url}/${id}`, cb)
  }

  // create a new song
  create (song, cb) {
    return $.post(this.url, song, cb)
  }

  // update an existing song
  update (song, cb) {
    return $.ajax({
      url: `${this.url}/${song.id}`,
      data: song,
      method: 'put'
    })
  }

  // delete a song
  delete (id) {
    return $.ajax({
      url: `${this.url}/${id}`,
      method: 'delete'
    })
  }
}
