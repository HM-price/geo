$(document).ready(function() {

    new WOW().init();

    const modalBtn = document.querySelectorAll('.modalka');

    $('.modalka').click(function(e) {
        e.preventDefault();
        $('body').css('overflow', 'hidden');
        $('.hiddn').fadeIn('fast');
    });

    $('.close_btn').click(function(e) {
        e.preventDefault();
        if ($('.hiddn:visible')) {
            $('body').css('overflow', 'visible');
            $('.hiddn').fadeOut('fast');
        }
    });

    function preloadImages() {
        for (var i = 0; i < arguments.length; i++)
            $("<img />").attr("src", arguments[i]);
    }
    preloadImages("img/flat3.png", "img/flat4.png");


    var mobile = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i);
    if (mobile == null) {
        $('head').append('<link rel="stylesheet" href="css/animate.css" />');
    }

    $('[name="tel"]').mask('+7 (999) 999-99-99');

    var tb = Array.from(document.querySelectorAll('.tabs-links a'));
    const cos = document.querySelector('#cost-line span');
    const flatImg = document.querySelector('.flat-img');
    var tabsContainer = Array.from(document.querySelectorAll('#tabs_container li'));

    const handleClick = (e) => {
      e.preventDefault();

      tb.forEach(node => {
        node.classList.remove('active');
      });

      e.currentTarget.classList.add('active');

      var price = e.currentTarget.getAttribute('data-pr');
      var getImg = e.currentTarget.getAttribute('data-i');
      var tab = e.currentTarget.getAttribute('href');
      tab = tab.replace('#', '');

       tabsContainer.forEach(node => {
        node.style.display = 'none';
        if(node.getAttribute('id') == tab){
            node.style.display = 'block';
        }
      });

      cos.textContent = price;
      flatImg.setAttribute('src', 'img/' + getImg);
    }

    tb.forEach(node => {
      node.addEventListener('click', handleClick);
    });


    $(".main_form").find('input,select,textarea').not('[type=submit]').jqBootstrapValidation({
        submitSuccess: function($form, event) {
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
            }).done(function() {
                alert("Спасибо за заявку!");
                setTimeout(function() {
                    $("form").trigger("reset");
                }, 1000);
            });
            event.preventDefault();
        }
    });

    $(".about span:not('h2 span')").each(function() {
        var block = $(this);
        $(window).scroll(function() {
            var top = block.offset().top;
            var bottom = block.height() + top;
            top = top - $(window).height();
            var scroll_top = $(this).scrollTop();
            if ((scroll_top > top) && (scroll_top < bottom)) {
                if (!block.hasClass("animated")) {
                    block.addClass("animated");
                    block.trigger('animateIn');
                }
            } else { block.removeClass("animated"); }
        });
    });

    $(".about span:not(h2 span)").each(function() {
        $(this).attr("data-number", parseInt($(this).text()));
    });

    $(".about").on("animateIn", function() {
        var inter = 1;
        $(this).find("span:not(h2 span)").each(function() {
            var count = parseInt($(this).attr("data-number")),
                block = $(this),
                timeout = null,
                step = 1;
            timeout = setInterval(function() {
                if (step == 25) {
                    block.text(count.toString());
                    clearInterval(timeout);
                } else {
                    block.text((Math.floor(count * step / 25)).toString());
                    step++;
                }
            }, 60);
        });
    });

// chart

function onEntry(entry) {
  entry.forEach((change) => {
    if(change.isIntersecting) {
      change.target.classList.add('animated');
    }else{
      change.target.classList.remove('animated');
    }
  });
}

let options = {
  threshold: [0.5]
};

let observer = new IntersectionObserver(onEntry, options);

let elements = document.querySelectorAll('.chart');

for (let elm of elements) {
  observer.observe(elm);
}

// end chart

    /*yandex map*/
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.73867559643917, 37.249090695256086],
            zoom: 10
        });
        myMap.behaviors.disable('scrollZoom');
        var myPlacemark = new ymaps.Placemark([55.771585, 37.598923]);
        myMap.geoObjects.add(myPlacemark);
    }
});