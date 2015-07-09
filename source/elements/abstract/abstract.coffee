class Abstract
  constructor: ->
    @video = $ '.abstract__video'
    if Modernizr.touch
      @video.remove()
    else
      @video.on 'canplaythrough', @loaded

    @contact = $ '.abstract__contact'
    @contact.on 'click', @scrollToContacts

  scrollToContacts: =>

    contacts = $ '.contacts__wrapper'
    contacts.velocity "scroll",
      duration: 500
      , begin:  =>
        document.body.style.willChange = 'scroll-position'
      , complete: =>
        document.body.style.willChange = 'auto'

  loaded: =>
    @video.addClass 'abstract__video_loaded'

$(document).ready ->
  new Abstract
