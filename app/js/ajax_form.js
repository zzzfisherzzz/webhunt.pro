$(document).ready(function () {
    $(".form1").submit(function () {
        var form = $(".form1");
        $.ajax({
            type: "POST",
            url: 'telegram.php',
            data: form.serialize(),
            success: function (data) {
                $("#modal").css("display", "none");
                $("#thanks-modal").css("display", "block");

            },
            error: function (jqXHR, text, error) {
                // Вывод текста ошибки отправки
                $(form).html(error);         
            }
        });
        
        return false;
    });
    $(".form2").submit(function () {
        var form2 = $(".form2");
        $.ajax({
            type: "POST",
            url: 'telegram.php',
            data: form2.serialize(),
            success: function (data) {
                $("#modal").css("display", "none");
                $("#thanks-modal").css("display", "block");
            },
            error: function (jqXHR, text, error) {
                // Вывод текста ошибки отправки
                $(form2).html(error);         
            }
        });
        
        return false;
    });
});