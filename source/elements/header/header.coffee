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

    @header.find('[data-contact]').on 'click', @contactUs

    if @header.attr 'data-switch'
      @scrollHeader()
      $(window).on 'scroll', @scrollHeader


  contactUs: =>
    if @open
      @button.trigger 'click'

    contacts = $ '.contacts__wrapper'
    contacts.velocity "scroll",
      duration: 500
      , begin:  =>
        document.body.style.willChange = 'scroll-position'
      , complete: =>
        document.body.style.willChange = 'auto'

  scrollHeader: (event)=>
    if $(window).scrollTop() >= 21
      @header.toggleClass 'page-header_fixed', true
    else
      @header.toggleClass 'page-header_fixed', false


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
      @button.removeClass 'page-header__menu_open'
    else
      @open = true
      props =
        top: 0
        compleate: @endAnimation
      @button.addClass 'page-header__menu_open'

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

    if !@open
      props =
        top: -(1.2*@vh)+'px'
      @nav.velocity("stop").velocity(props).velocity("finish")


$(window).ready ->
  new Header
