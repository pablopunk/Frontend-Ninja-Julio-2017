import UI from './ui'

export default class SongFormManager extends UI {
  constructor (elementSelector, songsService) {
    super(elementSelector)
    this.songsService = songsService
  }

  init () {
    this.listenToSubmit()
  }

  listenToSubmit () {
    this.element.on('submit', () => {
      this.handleSubmit()
      return false
    })
  }

  isValid () {
    const inputs = this.element.find('input')
    for (const input of inputs) {
      if (!input.checkValidity()) {
        this.setErrorHtml(input.validationMessage)
        this.setError()
        return false
      }
    }
    this.setIdeal()
    return true
  }

  handleSubmit () {
    if (this.isValid()) {
      this.send()
    }
  }

  send () {
    this.setLoading()
    this.songsService.create({
      'artist': this.element.find('#artist').val(),
      'title': this.element.find('#title').val(),
      'cover': this.element.find('#cover').val()
    }, () => {
      // TODO: reload songs
      this.element[0].reset()
      this.setIdeal()
    }).fail(this.setError)
  }

  disableFormControls () {
    this.element.find('button, input').attr('disabled', true)
  }

  enableFormControls () {
    this.element.find('button, input').attr('disabled', false)
  }

  setLoading () {
    super.setLoading()
    this.disableFormControls()
  }

  setError () {
    super.setError()
    this.enableFormControls()
  }

  setIdeal () {
    super.setIdeal()
    this.enableFormControls()
  }
}
