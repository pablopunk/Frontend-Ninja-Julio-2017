
const getHtmlForSong = song => `
<article class="song">
  <img class="cover" src="${song.cover}" alt="cover">
  <div class="artist">${song.artist}</div>
  <div class="title">${song.title}</div>
</article>
`

export default class SongsList {
  constructor (songService, ui) {
    this.songService = songService
    this.ui = ui
  }
  init () {
    this.loadSongs()
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
      html += getHtmlForSong(song)
    }
    this.ui.setIdealHtml(html)
  }
}
