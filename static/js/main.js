$(document).ready(function(){

  $.scrollify({
    section : "section",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1200,
    offset :50,
    scrollbars: false,
    standardScrollElements: ".normal-scroll",
    setHeights: false,
    overflowScroll: true,
    before:function() { scrollspy($.scrollify.current().attr('data-section-name'))},
    after:function(i) {
      $.scrollify.update();    
      $('.navbar').animate({'opacity':1},500);
        const $body = $('body');
        let preIndex = parseInt($body.attr('data-pre-index'));
        let direction = i > preIndex ? 'down' : 'up';

        $body
            .attr('data-pre-index', i)
            .removeClass('up down')
            .addClass(direction);              
    },
    afterResize:function() {},
    afterRender:function() {
      $('body').attr('data-pre-index', 0);
    }
  });

  function scrollspy(sectionName){
    const polymorph = document.querySelector('.parent-polygon');
    polymorph.style.display = 'none';
    
    var morphing1 = anime({
      targets: '.polymorph',
      points: [
        { value: '0,0 0,0 0,0 0,200' },
        { value: '0,0 100,0 50,200 0,200' },
        { value: '0,0 100,0 100,200 0,200' },
        { value: '100,0 100,0 100,200 50,200' },
        { value: '100,0 100,0 100,200 100,200' }
      ],
      easing: 'easeOutQuad',
      duration: 1600,
      loop: false,
      begin: function() {
        // Ensure the element is hidden at the start of the animation
        polymorph.style.display = 'block';
        console.log('Animation started');
      },
      complete: function() {
        // Show the .polymorph element after the animation finishes
        polymorph.style.display = 'none';
        console.log('Animation completed');
      }
    });
    $('.navbar').animate({'opacity':0},500);
    $('.navbar-nav li').removeClass('active');
    $('.navbar-nav li').has('a[href="#'+sectionName+'"]').addClass('active');
  }

  $('.navbar-nav li a, .link').on('click', function(e){
    $('.navbar-nav a').blur();
    if($(window).width()<768){
      $('#main-menu').collapse('toggle');
    }
    e.preventDefault()
    $('.navbar-nav li').removeClass('active');
    $(this).parents('li').addClass('active');
    var link = $(this).attr('href');
    $.scrollify.move(link);
  });

  $('.btn-next').on('click', function(e){
    $.scrollify.next();
  });
  var home_slides = $('#home-slides');
  console.log('home_slides:', home_slides, home_slides.length);
  if(home_slides.length > 0) {
    home_slides.owlCarousel({
      loop:true,
      items:1,
      animateOut:'fadeOut',
      autoplay:5000,
      nav:false,
      dots:false,
    });
  }
  // add animate.css class(es) to the elements to be animated
  function setAnimation ( _elem, _InOut ) {
    // Store all animationend event name in a string.
    // cf animate.css documentation
    var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    _elem.each ( function () {
      var $elem = $(this);
      var $animationType = 'animated ' + $elem.data( _InOut );
      $elem.addClass($animationType).one(animationEndEvent, function () {
        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
      });
    });
  }
  // Fired before current slide change
  home_slides.on('change.owl.carousel', function(event) {
    var $currentItem = $('.owl-item', home_slides).eq(event.item.index);
    var $elemsToanim = $currentItem.find("[data-out]");
    setAnimation ($elemsToanim, 'out');
  });
  // Fired after current slide has been changed
  home_slides.on('changed.owl.carousel', function(event) {
    var $currentItem = $('.owl-item', home_slides).eq(event.item.index);
    var $elemsToanim = $currentItem.find("[data-in]");$elemsToanim.css({'opacity':'1','visibility':'visible'})
    setAnimation ($elemsToanim, 'in');
  })
  // Fired after current slide has been changed
  home_slides.on('changed.owl.carousel', function(event) {
    var $currentItem = $('.owl-item', home_slides).eq(event.item.index);
    var $elemsToanim = $currentItem.find("[data-in]");
    setAnimation ($elemsToanim, 'in');
  })

  if (typeof window.ScrollReveal !== 'undefined') {
    window.sr = window.ScrollReveal();
    sr.reveal('.reveal', {origin:'bottom', delay:1500,duration:1000, distance: '100px',opacity:0, reset: true });
  } else {
    console.warn('ScrollReveal is not loaded');
  }

  var morphing1 = anime({
    targets: '.polymorph',
    points: [
      { value: '0,0 0,0 0,0 0,200' },
      { value: '0,0 100,0 50,200 0,200' },
      { value: '0,0 100,0 100,200 0,200' },
      { value: '100,0 100,0 100,200 50,200' },
      { value: '100,0 100,0 100,200 100,200' }
    ],
    easing: 'easeOutQuad',
    duration: 1600,
    loop: false
  });

  $('.parallax-window').parallax();
});

$(window).load(function() {
  if($(window).width()<768){
    $('p > br').css({'display': 'none'})
  }
  if($(window).width()>768){
    $('p > br').css({'display': 'block'})
  }
  $.scrollify.update();
});

$(window).resize(function() {
  if($(window).width()<768){
    $('p > br').css({'display': 'none'})
  }
  if($(window).width()>768){
    $('p > br').css({'display': 'block'})
  }
});

setInterval(function() {
  document.querySelectorAll('.integration-logo').forEach(function(logo, i) {
    logo.style.transform = 'translateY(' + (Math.sin(Date.now()/700 + i) * 8) + 'px)';
  });
}, 60);

// FAQ Accordion custom JS
if (document.querySelectorAll('.accordion-header').length) {
  document.querySelectorAll('.accordion-header').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = document.querySelector(this.getAttribute('data-target'));
      var isOpen = target.classList.contains('show');
      // Ferme tous les panels
      document.querySelectorAll('.accordion-body').forEach(function(body) {
        body.classList.remove('show');
      });
      document.querySelectorAll('.accordion-header').forEach(function(header) {
        header.classList.add('collapsed');
        header.setAttribute('aria-expanded', 'false');
      });
      // Ouvre le panel cliqué si ce n'était pas déjà ouvert
      if (!isOpen) {
        target.classList.add('show');
        this.classList.remove('collapsed');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
} 