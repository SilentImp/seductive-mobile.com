var Abstract,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Abstract = (function() {
  function Abstract() {
    this.loaded = bind(this.loaded, this);
    this.scrollToContacts = bind(this.scrollToContacts, this);
    this.video = $('.abstract__video');
    if (Modernizr.touch) {
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
    console.log('scroll', contacts);
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

var CaseStudies,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CaseStudies = (function() {
  function CaseStudies() {
    this.rePage = bind(this.rePage, this);
    this.openPage = bind(this.openPage, this);
    this.checkit = bind(this.checkit, this);
    this.widget = $('.casestudies');
    this.wrapper = this.widget.find('.casestudies__cases');
    this["case"] = this.wrapper.find('.casestudies__case');
    this.cw = this["case"].outerWidth(true);
    this.nav = this.widget.find('.casestudies__navigation');
    this.screens = null;
    this.page = 0;
    this.checkit();
    $(window).on('resize', this.checkit);
    this.nav.on('click', '.casestudies__page', this.openPage);
  }

  CaseStudies.prototype.checkit = function() {
    var button, elements, i, j, ref, screens;
    this.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    screens = Math.ceil(this["case"].length * this.cw / this.vw);
    if (screens < 2) {
      if (screens !== this.screens) {
        this.screens = null;
        this.nav.find('.casestudies__page').remove();
        this.nav.hide();
        this.screens = screens;
        this.page = 0;
      }
    } else {
      if (screens !== this.screens) {
        this.nav.find('.casestudies__page').remove();
        elements = document.createDocumentFragment();
        for (i = j = 0, ref = screens; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          button = document.createElement('button');
          button.setAttribute('type', 'button');
          button.setAttribute('data-page', i);
          button.className = 'casestudies__page';
          button.appendChild(document.createElement('span'));
          elements.appendChild(button);
        }
        this.nav.append(elements);
        this.nav.show();
        this.screens = screens;
        if (this.page >= this.screens) {
          this.page = this.screens - 1;
        }
      }
    }
    return this.rePage();
  };

  CaseStudies.prototype.openPage = function(event) {
    var button;
    button = $(event.currentTarget);
    this.page = parseInt(button.attr('data-page'), 10);
    return this.rePage();
  };

  CaseStudies.prototype.rePage = function() {
    var delta, options, props;
    this.nav.find('.casestudies__page_current').removeClass('casestudies__page_current');
    this.nav.find('[data-page="' + this.page + '"]').addClass('casestudies__page_current');
    if (this.screens === 1) {
      delta = 0;
    } else if (this.page === this.screens - 1) {
      delta = this["case"].length * this.cw - this.vw + 20;
    } else {
      delta = Math.floor((this.page * this.vw) / this.cw) * this.cw;
    }
    props = {
      'translateX': -1 * delta
    };
    options = {
      'delay': 500
    };
    return this.wrapper.velocity("stop").velocity(props, options);
  };

  return CaseStudies;

})();

$(window).ready(function() {
  return new CaseStudies;
});

var Header,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Header = (function() {
  function Header() {
    this.checkMedia = bind(this.checkMedia, this);
    this.endAnimation = bind(this.endAnimation, this);
    this.toggleMenu = bind(this.toggleMenu, this);
    this.scrollHeader = bind(this.scrollHeader, this);
    this.header = $('.page-header');
    this.button = this.header.find('.page-header__menu');
    this.nav = this.header.find('.page-header__navigation');
    this.sub = this.header.find('.page-header__sub-wrapper');
    this.open = false;
    this.animation = false;
    this.checkMedia();
    $(window).on('resize', this.checkMedia);
    this.button.on('click', this.toggleMenu);
    $(window).on('scroll', this.scrollHeader);
  }

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
    this.state = Modernizr.mq('(max-width: 767px)');
    if (!this.state) {
      this.nav.velocity('stop');
      this.nav.removeAttr('style');
      this.open = false;
      return this.animation = false;
    } else {
      this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return this.nav.css({
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px'
      });
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
