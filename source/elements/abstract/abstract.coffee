class Abstract
  constructor: ->
    @video = $ '.abstract__video'
    if Modernizr.touch
      @video.remove()
    else
      @video.on 'canplaythrough', @loaded

  loaded: =>
    @video.addClass 'abstract__video_loaded'

$(document).ready ->
  new Abstract
