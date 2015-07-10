var Abstract,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Abstract = (function() {
  function Abstract() {
    this.loaded = bind(this.loaded, this);
    this.scrollToContacts = bind(this.scrollToContacts, this);
    this.video = $('.abstract__video');
    if (this.video.length !== 1) {
      return;
    }
    if (Modernizr.mq('(max-width: 650px)')) {
      this.video.remove();
    } else {
      this.video.on('canplaythrough', this.loaded);
    }
    this.contact = $('.abstract__contact');
    this.contact.on('click', this.scrollToContacts);
  }

  Abstract.prototype.scrollToContacts = function() {
    var contacts;
    contacts = $('.contacts__wrapper');
    return contacts.velocity("scroll", {
      duration: 500,
      begin: (function(_this) {
        return function() {
          return document.body.style.willChange = 'scroll-position';
        };
      })(this),
      complete: (function(_this) {
        return function() {
          return document.body.style.willChange = 'auto';
        };
      })(this)
    });
  };

  Abstract.prototype.loaded = function() {
    return this.video.addClass('abstract__video_loaded');
  };

  return Abstract;

})();

$(document).ready(function() {
  return new Abstract;
});

$(window).ready(function() {
  var options, part_0, part_1024, part_1300, part_500, part_670, part_860, values;
  part_1300 = {
    breakpoint: 1300,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5
    }
  };
  part_1024 = {
    breakpoint: 1120,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  };
  part_860 = {
    breakpoint: 860,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  };
  part_670 = {
    breakpoint: 670,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  };
  part_500 = {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  };
  part_0 = {
    breakpoint: 0,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  };
  values = [part_1300, part_1024, part_860, part_670, part_500, part_0];
  options = {
    dots: false,
    centerMode: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    infinite: true,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    variableWidth: true,
    swipe: true,
    slide: '.casestudies',
    responsive: values
  };
  return $('.casestudies .casestudies__cases').slick(options);
});

var Header,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Header = (function() {
  function Header() {
    this.checkMedia = bind(this.checkMedia, this);
    this.endAnimation = bind(this.endAnimation, this);
    this.toggleMenu = bind(this.toggleMenu, this);
    this.scrollHeader = bind(this.scrollHeader, this);
    this.contactUs = bind(this.contactUs, this);
    this.header = $('.page-header');
    if (this.header.length !== 1) {
      return;
    }
    this.button = this.header.find('.page-header__menu');
    this.nav = this.header.find('.page-header__navigation');
    this.sub = this.header.find('.page-header__sub-wrapper');
    this.open = false;
    this.animation = false;
    this.checkMedia();
    $(window).on('resize', this.checkMedia);
    this.button.on('click', this.toggleMenu);
    this.header.find('[data-contact]').on('click', this.contactUs);
    if (this.header.attr('data-switch')) {
      this.scrollHeader();
      $(window).on('scroll', this.scrollHeader);
    }
  }

  Header.prototype.contactUs = function() {
    var contacts;
    if (this.open) {
      this.button.trigger('click');
    }
    contacts = $('.contacts__wrapper');
    return contacts.velocity("scroll", {
      duration: 500,
      begin: (function(_this) {
        return function() {
          return document.body.style.willChange = 'scroll-position';
        };
      })(this),
      complete: (function(_this) {
        return function() {
          return document.body.style.willChange = 'auto';
        };
      })(this)
    });
  };

  Header.prototype.scrollHeader = function(event) {
    if ($(window).scrollTop() >= 21) {
      return this.header.toggleClass('page-header_fixed', true);
    } else {
      return this.header.toggleClass('page-header_fixed', false);
    }
  };

  Header.prototype.toggleMenu = function() {
    var options, props;
    if (this.animation) {
      return;
    }
    this.animation = true;
    options = {
      'easing': 'ease',
      'duration': 300
    };
    if (this.open) {
      props = {
        top: -(1.2 * this.vh) + 'px',
        compleate: this.endAnimation
      };
      this.open = false;
      this.button.removeClass('page-header__menu_open');
    } else {
      this.open = true;
      props = {
        top: 0,
        compleate: this.endAnimation
      };
      this.button.addClass('page-header__menu_open');
    }
    return this.nav.velocity("stop").velocity(props, options);
  };

  Header.prototype.endAnimation = function() {
    return this.animation = false;
  };

  Header.prototype.checkMedia = function() {
    var props;
    this.state = Modernizr.mq('(max-width: 767px)');
    if (!this.state) {
      this.nav.velocity('stop');
      this.nav.removeAttr('style');
      this.open = false;
      this.animation = false;
    } else {
      this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      this.nav.css({
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px'
      });
    }
    if (!this.open) {
      props = {
        top: -(1.2 * this.vh) + 'px'
      };
      return this.nav.velocity("stop").velocity(props).velocity("finish");
    }
  };

  return Header;

})();

$(window).ready(function() {
  return new Header;
});

var Layout;

Layout = (function() {
  function Layout() {
    $('[placeholder]').placeholderEnhanced();
  }

  return Layout;

})();

$(document).ready(function() {
  return new Layout;
});

$(window).ready(function() {
  var carousel, i, len, options, part_1024, part_360, part_540, part_600, part_800, part_990, ref, values;
  part_1024 = {
    breakpoint: 990,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6,
      infinite: true,
      dots: true
    }
  };
  part_800 = {
    breakpoint: 700,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  };
  part_540 = {
    breakpoint: 540,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  };
  part_360 = {
    breakpoint: 360,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  };
  part_990 = {
    breakpoint: 990,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: true,
      dots: true
    }
  };
  part_600 = {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true
    }
  };
  values = [part_1024, part_800, part_540, part_360];
  options = {
    centerMode: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    respondTo: 'min',
    variableWidth: false,
    responsive: values
  };
  ref = $('.references__carousel .references__container');
  for (i = 0, len = ref.length; i < len; i++) {
    carousel = ref[i];
    $(carousel).slick(options);
  }
  return $('.references__answers .references__container').slick({
    centerMode: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    dots: false,
    respondTo: 'min',
    variableWidth: false,
    responsive: [part_990, part_600]
  });
});
