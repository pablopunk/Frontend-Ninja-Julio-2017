import SongService from './SongService'
import UI from './ui'
const songService = new SongService('/songs')
const ui = new UI('.songs-list')

songService.list(songs => {
  if (!songs.length) {
    ui.setEmpty()
    return
  }
  for (const song of songs) {
    ui.addSongToView(song)
  }
  ui.setIdeal()
}).fail(ui.setError)
