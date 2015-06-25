class Header
  constructor: ->
    @header = $ '.page-header'
    @button = @header.find '.page-header__menu'
    @nav = @header.find '.page-header__navigation'
    @sub = @header.find '.page-header__sub-wrapper'
    @open = false
    @animation = false

    @touch = $('html').hasClass 'touch'
    @toucher = null
    if @touch
      @toucher = new Hammer($('body')[0])
      @toucher.on 'swipeleft', @closeMenu
      @toucher.on 'swiperight', @openMenu

    $(window).on 'resize', @checkMedia
    @button.on 'click', @toggleMenu
    @nav.on 'click', @closeMenuSpace

  closeMenuSpace: (event)=>
    if $(event.target).hasClass 'page-header__navigation'
      @closeMenu()

  closeMenu: =>
    console.log 'left'
    if @animation || !@open
      return
    if $(event.target).hasClass 'page-header__navigation'
      @button.trigger 'click'

  openMenu: =>
    console.log 'right'
    if @animation || @open
      return
    @button.trigger 'click'

  toggleMenu: =>

    if @animation
      return

    @open = !@open
    @animation = true

    options =
      'easing': 'ease'
      'duration': 300

    if !@open
      props =
        left: '-100%'
        compleate: @endAnimation
    else
      props =
        left: 0
        compleate: @endAnimation

    @nav.velocity("stop").velocity(props, options)

  endAnimation: =>
    @animation = false

  checkMedia: =>
    if !Modernizr.mq('(max-width: 767px)')
      @nav.velocity 'stop'
      @nav.removeAttr 'style'
      @open = false
      @animation = false
    else
      @nav.css
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)+'px'
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)+'px'

$(window).ready ->
  new Header