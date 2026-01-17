(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // WOW.js
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });

    // Dropdown hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    

})(jQuery);
// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar.sticky-top');
  if(window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

function handleCardView(id){
    var card=document.getElementById(id);
    card.style.display='flex';
    
   }
   function handleCardHide(id){
        var card=document.getElementById(id);
    card.style.display='none';
    
   }
  function handleClick(source) {
      const overlay = document.getElementById("contain-img");
      const img = document.getElementById("scaled-img");
      img.src = source;
      overlay.classList.add('d-flex');
      console.log(overlay.style.display);
      
      overlay.classList.add("d-flex");
    }

    function closeOverlay() {
      const overlay = document.getElementById("contain-img");
      overlay.style.display = "none";
      overlay.classList.remove("d-flex");
    }