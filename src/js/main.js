import SongService from './SongService'
const $ = window.$ = window.jQuery = require('jquery')
const songService = new SongService()

const getHtmlForSong = song => `
  <article class="song">
    <img class="cover" src="${song.coverUrl}" alt="cover">
    <div class="artist">${song.artist}</div>
    <div class="title">${song.title}</div>
  </article>
`

const setUiStatus = status => $('.songs-list').addClass(status)

const removeUiStatus = status => $('.songs-list').removeClass(status)

const addSongToView = song => $('.songs-list .ui-status.ideal').append(getHtmlForSong(song))

songService.list(songs => {
  removeUiStatus('loading')
  if (!songs.length) {
    setUiStatus('empty')
    return
  }
  songs.forEach(addSongToView)
  setUiStatus('ideal')
}).fail(() => {
  removeUiStatus('loading')
  setUiStatus('error')
})
