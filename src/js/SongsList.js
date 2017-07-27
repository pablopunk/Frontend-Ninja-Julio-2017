const getHtmlForSong = song => `
<article class="song" data-id="${song.id}">
  <span class="delete-song" data-id="${song.id}">x</span>
  <img class="cover" src="${song.cover}" alt="cover">
  <div class="artist">${song.artist}</div>
  <div class="title">${song.title}</div>
</article>
`

export default class SongsList {
  constructor (songService, ui, pubsub) {
    this.songService = songService
    this.ui = ui
    this.pubsub = pubsub
    this.element = this.ui.element
  }
  init () {
    this.loadSongs()
    this.pubsub.subscribe('new-song', this.loadSongs.bind(this))
    this.element.on('click', '.song .delete-song', (event) => this.deleteSong(event))
  }
  loadSongs () {
    this.songService.list(songs => {
      if (!songs.length) {
        this.ui.setEmpty()
        return
      }
      this.renderSongs(songs)
      this.ui.setIdeal()
    }).fail(this.ui.setError)
  }
  renderSongs (songs) {
    let html = ''
    for (const song of songs) {
      song.cover = song.cover || 'img/disk-150px.png'
      html += getHtmlForSong(song)
    }
    this.ui.setIdealHtml(html)
  }
  deleteSong (event) {
    const id = event.target.dataset.id
    this.songService.delete(id)
    this.loadSongs()
  }
}
