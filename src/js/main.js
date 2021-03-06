import pubsub from 'pubsub-js'
import SongService from './SongService'
import UI from './ui'
import SongsList from './SongsList'
import SongsFormManager from './SongFormManager'

const songService = new SongService('/songs')
const ui = new UI('.songs-list')
const songsList = new SongsList(songService, ui, pubsub)
const songsFormManager = new SongsFormManager('.song-form', songService, pubsub)

songsList.init()
songsFormManager.init()
