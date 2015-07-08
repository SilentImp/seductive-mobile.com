class Header
  constructor: ->
    @header = $ '.page-header'
    @button = @header.find '.page-header__menu'
    @nav = @header.find '.page-header__navigation'
    @sub = @header.find '.page-header__sub-wrapper'
    @open = false
    @animation = false

    @checkMedia()

    $(window).on 'resize', @checkMedia
    @button.on 'click', @toggleMenu
    @nav.on 'click', @closeMenuSpace


    $(window).on 'scroll', @scrollHeader

  scrollHeader: (event)=>
    if $(window).scrollTop() >= 35
      @header.toggleClass 'page-header_fixed', true
    else
      @header.toggleClass 'page-header_fixed', false

  closeMenuSpace: (event)=>
    if $(event.target).hasClass 'page-header__navigation'
      @closeMenu(event)

  closeMenu: (event)=>
    if @animation || !@open || !@state
      return

    if $(event.target).hasClass 'page-header__navigation'
      @button.trigger 'click'

  toggleMenu: =>

    if @animation
      return
    @animation = true

    options =
      'easing': 'ease'
      'duration': 300

    if @open
      props =
        top: -(1.2*@vh)+'px'
        compleate: @endAnimation
      @open = false
    else
      @open = true
      props =
        top: 0
        compleate: @endAnimation

    @nav.velocity("stop").velocity(props, options)

  endAnimation: =>
    @animation = false

  checkMedia: =>
    @state = Modernizr.mq '(max-width: 767px)'
    if !@state
      @nav.velocity 'stop'
      @nav.removeAttr 'style'
      @open = false
      @animation = false
    else
      @vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      @nav.css
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)+'px'

$(window).ready ->
  new Header
