$(window).ready ->

  part_1300 = {
	  breakpoint: 1300
	  settings: {
			slidesToShow: 5
			slidesToScroll: 5
    }}

  part_1024 = {
	  breakpoint: 1120
	  settings: {
			slidesToShow: 4
			slidesToScroll: 4
    }}

  part_860 = {
    breakpoint: 860
	  settings: {
  			slidesToShow: 3
  			slidesToScroll: 3
      }}

  part_670 = {
    breakpoint: 670
	  settings: {
			slidesToShow: 2
			slidesToScroll: 2
    }}

  part_500 = {
    breakpoint: 500
	  settings: {
			slidesToShow: 1
			slidesToScroll:1
    }}

  part_0 = {
    breakpoint: 0
	  settings: {
			slidesToShow: 1
			slidesToScroll: 1
    }}

  values = [part_1300, part_1024, part_860, part_670, part_500, part_0]

  options = {
    dots: false
    centerMode: true
    slidesToShow: 6
    slidesToScroll: 6
    arrows: false
    infinite: true
    swipe: true
    touchMove: true
    swipeToSlide: true
    variableWidth: true
    swipe: true
    slide: '.casestudies'
    responsive: values
    }

  $('.casestudies .casestudies__cases').slick options
