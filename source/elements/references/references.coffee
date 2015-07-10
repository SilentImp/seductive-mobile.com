$(window).ready ->
  part_1024 = {
    breakpoint: 990
    settings: {
  		slidesToShow: 6
  		slidesToScroll: 6
  		infinite: true
  		dots: true
    }}

  part_800 = {
    breakpoint: 700
    settings: {
  		slidesToShow: 4
  		slidesToScroll: 4
    }}

  part_540 = {
    breakpoint: 540
    settings: {
  		slidesToShow: 2
  		slidesToScroll: 2
    }}

  part_360 = {
    breakpoint: 360
    settings: {
  		slidesToShow: 1
  		slidesToScroll: 1
    }}


  part_990 = {
    breakpoint: 990
    settings: {
  		slidesToShow: 2
  		slidesToScroll: 2
  		infinite: true
  		dots: true
    }}

  part_600 = {
    breakpoint: 600
    settings: {
  		slidesToShow: 1
  		slidesToScroll: 1
  		infinite: true
  		dots: true
    }}

  values = [part_1024, part_800, part_540, part_360]

  options =
    centerMode: false
    infinite: true
    autoplay: true
    autoplaySpeed: 3000
    dots: false
    slidesToShow: 6
    slidesToScroll: 6
    arrows: false
    respondTo: 'min'
    variableWidth: false
    responsive: values

  for carousel in $ '.references__carousel .references__container'
    $(carousel).slick options

  $('.references__answers .references__container').slick
    centerMode: false
    infinite: true
    autoplay: true
    autoplaySpeed: 3000
    slidesToShow: 2
    slidesToScroll: 2
    arrows: false
    dots: false
    respondTo: 'min'
    variableWidth: false
    responsive: [part_990, part_600]
