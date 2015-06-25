var Header,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Header = (function() {
  function Header() {
    this.checkMedia = bind(this.checkMedia, this);
    this.endAnimation = bind(this.endAnimation, this);
    this.toggleMenu = bind(this.toggleMenu, this);
    this.openMenu = bind(this.openMenu, this);
    this.closeMenu = bind(this.closeMenu, this);
    this.closeMenuSpace = bind(this.closeMenuSpace, this);
    this.header = $('.page-header');
    this.button = this.header.find('.page-header__menu');
    this.nav = this.header.find('.page-header__navigation');
    this.sub = this.header.find('.page-header__sub-wrapper');
    this.open = false;
    this.animation = false;
    this.touch = $('html').hasClass('touch');
    this.toucher = null;
    if (this.touch) {
      this.toucher = new Hammer($('body')[0]);
      this.toucher.on('swipeleft', this.closeMenu);
      this.toucher.on('swiperight', this.openMenu);
    }
    this.checkMedia();
    $(window).on('resize', this.checkMedia);
    this.button.on('click', this.toggleMenu);
    this.nav.on('click', this.closeMenuSpace);
  }

  Header.prototype.closeMenuSpace = function(event) {
    if ($(event.target).hasClass('page-header__navigation')) {
      return this.closeMenu(event);
    }
  };

  Header.prototype.closeMenu = function(event) {
    if (this.animation || !this.open || !this.state) {
      return;
    }
    if ($(event.target).hasClass('page-header__navigation')) {
      return this.button.trigger('click');
    }
  };

  Header.prototype.openMenu = function() {
    if (this.animation || this.open || !this.state) {
      return;
    }
    return this.button.trigger('click');
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
        left: '-120%',
        compleate: this.endAnimation
      };
      this.open = false;
    } else {
      this.open = true;
      props = {
        left: 0,
        compleate: this.endAnimation
      };
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
      return this.nav.css({
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px',
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + 'px'
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
