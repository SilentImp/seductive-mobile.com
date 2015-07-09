class CaseStudies
  constructor: ->
    @widget = $ '.casestudies'
    @wrapper = @widget.find '.casestudies__cases'
    @case = @wrapper.find '.casestudies__case'
    @cw = @case.outerWidth(true)
    @nav = @widget.find '.casestudies__navigation'
    @screens = null
    @page = 0

    @checkit()
    $(window).on 'resize', @checkit
    @nav.on 'click', '.casestudies__page', @openPage

  checkit: =>

    @vw = Math.max document.documentElement.clientWidth, window.innerWidth || 0
    screens = Math.ceil(@case.length*@cw/@vw)

    if screens < 2
      if screens != @screens
        @screens = null
        @nav.find('.casestudies__page').remove()
        @nav.hide()
        @screens = screens
        @page = 0

    else
      if screens != @screens
        @nav.find('.casestudies__page').remove()
        elements = document.createDocumentFragment()
        for i in [0...screens]
          button = document.createElement 'button'
          button.setAttribute 'type', 'button'
          button.setAttribute 'data-page', i
          button.className = 'casestudies__page'
          button.appendChild document.createElement('span')
          elements.appendChild button

        @nav.append elements
        @nav.show()
        @screens = screens

        if @page >= @screens
          @page = @screens-1

    @rePage()

  openPage: (event)=>
    button = $ event.currentTarget
    @page = parseInt button.attr('data-page'), 10
    @rePage()

  rePage: =>

    @nav.find('.casestudies__page_current').removeClass 'casestudies__page_current'
    @nav.find('[data-page="'+@page+'"]').addClass 'casestudies__page_current'

    if @screens == 1
      delta = 0
    else if @page == @screens-1
      delta = @case.length*@cw - @vw + 20
    else
      delta = Math.floor((@page*@vw)/@cw)*@cw

    props =
      'translateX': -1*delta
    options =
      'delay': 500
    @wrapper.velocity("stop").velocity props, options




$(window).ready ->
  new CaseStudies
