class References
  constructor: (@widget)->
    @wrapper = @widget.find '.references__container'
    @elements = @wrapper.children()
    @timer = null
    @delay = 3000
    @animation_time = 1500
    @current = 0

    @checkState()
    $(window).on 'resize', @checkState

    if $('body').hasClass 'touch'
      hammertime = new Hammer @widget
      hammertime.on 'swipeleft', @next
      hammertime.on 'swiperight', @next

  checkState: =>
    @screens = null

    width = @elements.outerWidth(true)
    @vw = Math.max document.documentElement.clientWidth, window.innerWidth || 0
    screens = Math.ceil @elements.length*width/@wrapper.width()
    per_screen = Math.ceil @wrapper.width()/width

    if screens != @screens
      @screens = screens
      clearInterval @timer

      @wrapper.find('.copy').remove()

      if screens > 1
        first = @wrapper.children().slice(0, per_screen).clone(true)
        first.addClass 'copy'
        @wrapper.append first
        @timer = setInterval @next, @delay

    @reBase()

  next: =>
    @current++
    @reBase()

  reBase: =>
    if @screens > 1
      delta = @current*@elements.outerWidth(true)
    else
      delta = 0

    props =
      'translateX': -1*delta
    options =
      'delay': @animation_time
      'complete': =>
        if @current >= @elements.length
          @current = 0
          @reBase()

    if @current == 0
      @wrapper.velocity("stop").velocity(props, options).velocity("finish")
    else
      @wrapper.velocity("stop").velocity props, options

$(window).ready ->
  for carousel in $('.references__carousel')
    new References $(carousel)
