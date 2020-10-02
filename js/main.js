// "use strict";
$( document ).ready(function() {
    console.log( "ready!" );
});





let $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1200);
    return false;
});


//technologies-slider

$('.technologies-slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: '<span class="slick-prev"><img src="../img/prev.png" alt=""></span>',
    nextArrow: '<span class="slick-next"><img src="../img/next.png" alt=""></span>',
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


// /*Portfolio filter*/
// $("button").click(function () {
//     selector = $(this).attr("data-rel");
//     $("div#works").hide();
//     $("div#works").filter("."+selector).fadeIn();
// })


// MOdal

$(document).ready(function() {
    $('.do-open').on('click', function() {
        $('#modal').css('display', 'block');
    });
    $('.do-close').on('click', function() {
        $('#modal').css('display', 'none');
    });
    $('.do-close2').on('click', function() {
        $('#thanks-modal').css('display', 'none');
    });
});


// menu

$(document).ready(function() {
    // Hidden menu
    $( '.burger-btn, .mobile-menu ul a' ).click( function() {
        if ( $( '.mobile-menu' ).is( ':hidden' ) ) {
            $( '.mobile-menu' ).show();
        } else {
            $( '.mobile-menu' ).hide();
        }
    });

});





// typer text
$('#typer').typeIt({
    strings: ["WE ARE A DESIGN & ", "DEVELOPMENT AGENCY"],
    speed: 50,
    autoStart: false
});


//E-mail Ajax Send
// $( document ).ready(function() {
//     $("#btn").click(
//         function(){
//             sendAjaxForm('ajax_form', 'phpSmtp/mail.php');
//             return false;
//         }
//     );
// });

// function sendAjaxForm(ajax_form, url) {
//     $.ajax({
//         url:     url, //url страницы (action_ajax_form.php)
//         type:     "POST", //метод отправки
//         dataType: "html", //формат данных
//         data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
//     });
// }

//Mail

$("#sendMail").on("click", function () {
    const email = $("#email").val();
    const name = $("#name").val().trim();
    const message = $("#message").val().trim();

    if(email == "") {
        $("#errorMess").text("Введите Email");
        return false;
    } else if(name == "") {
        $("#errorMess").text("Введите Имя");
        return false;
    } else if(message.length < 5 ) {
        $("#errorMess").text("Введите сообщение не менее 5 символов!");
        return false;
    }

    $("#errorMess").text("");

    $.ajax({
        url: 'ajax/mail.php',
        type: 'POST',
        cache: false,
        data: { 'name': name, 'email': email, 'message': message},
        dataType: 'html',
        beforeSend: function() {
            $("#sendMail").prop("disabled", true);
        },
        success: function(data) {
            if(!data)
                alert("Были ошибки, форма не отправлена!");
            else
                $("#mailForm").trigger("reset");
            $("#sendMail").prop("disabled", false);
        }
    });

});



