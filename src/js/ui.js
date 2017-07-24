import jQuery from 'jquery'

const $ = window.$ = window.jQuery = jQuery

const getHtmlForSong = song => `
  <article class="song">
    <img class="cover" src="${song.coverUrl}" alt="cover">
    <div class="artist">${song.artist}</div>
    <div class="title">${song.title}</div>
  </article>
`

export default class UI {
  constructor (selector) {
    this.element = $(selector)
    this.states = ['empty', 'loading', 'error', 'partial', 'ideal']
  }

  getClasses () {
    return this.states.reduce((previous, current) => `${previous} ${current}`)
  }

  setEmpty () {
    return this.element.removeClass(this.getClasses()).addClass('empty')
  }

  setLoading () {
    return this.element.removeClass(this.getClasses()).addClass('loading')
  }

  setPartial () {
    return this.element.removeClass(this.getClasses()).addClass('partial')
  }

  setError () {
    return this.element.removeClass(this.getClasses()).addClass('error')
  }

  setIdeal () {
    return this.element.removeClass(this.getClasses()).addClass('ideal')
  }

  addSongToView (song) {
    return this.element.append(getHtmlForSong(song))
  }
}
