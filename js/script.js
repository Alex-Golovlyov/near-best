$(document).ready(function () {

    // checkbox submit
    $('#submit').prop('disabled', true);

    function disableSubmitButton(formID, checkboxID, submitID) {
      $(checkboxID).change(function() {
        if($(this).is(":checked")) {
          $(submitID).prop('disabled', false);
        } else {
          $(submitID).prop('disabled', true);
        }
      });
    }

    disableSubmitButton('#subsribe', '#checkbox', '#submit');

    $(".form-phone").mask("+7 (999) 999-9999");

    Fancybox.bind('[data-fancybox]="single", [data-fancybox]="dialog"');

    Fancybox.bind('[data-fancybox]="manager"');

    Fancybox.bind('[data-fancybox="video"]');

    //sources

    var sources = [
      {
        caption: "Торговый центр «Афимолл»",
        comment: "Москва-сити, Москва",
        image: "img/source/source-pic-1.jpg",
        link: "video/video-1.mp4"
      },
      {
        caption: "Информационный куб",
        comment: "Красная Поляна, Сочи",
        image: "img/source/source-pic-2.jpg",
        link: "video/video-2.mp4"
      },
      {
        caption: "Информационные панели в аэропорте",
        comment: "Шереметьево, Москва",
        image: "img/source/source-pic-3.jpg",
        link: "video/video-3.mp4"
      },
      {
        caption: "Информационные панели в аэропорте",
        comment: "Домодедово, Москва",
        image: "img/source/source-pic-4.jpg",
        link: "video/video-4.mp4"
      },
      {
        caption: "Информационные панели в аэропорте",
        comment: "Хабаровск",
        image: "img/source/source-pic-5.jpg",
        link: "video/video-5.mp4"
      },
      {
        caption: "Репортаж на телевидении",
        comment: "Вести Хабаровск",
        image: "img/source/source-pic-6.jpg",
        link: "video/video-6.mp4"
      },
      {
        caption: "Репортаж на телевидении",
        comment: "Россия 24 Хабаровск",
        image: "img/source/source-pic-7.jpg",
        link: "video/video-7.mp4"
      }
    ];

    for (var i = 0; i < sources.length; i++) {
      if (window.matchMedia("(min-width: 720px)").matches) {
        var div = $('<div class="source-item" style="background: url(img/source/l-back-'+(i+1)+'.jpg) center center no-repeat; background-size: cover;">');
      } else {
        var div = $('<div class="source-item" style="background: url(img/source/s-back-'+(i+1)+'.jpg) center -6em no-repeat; background-size: cover;">');
      }
      var h3 = $("<h3>").text(sources[i].caption);
      var p = $("<p>").text(sources[i].comment);
      var img = $("<img>").attr("src", sources[i].image);
      var a = $('<a class="watch-link" data-fancybox="video">').attr("href", sources[i].link).text("смотреть");
      div.append(h3, p, a, img);
      $("#source-elements").append(div);
    }

    //sliders
    $('#source-elements').slick({
      dots: true,
      arrows: true,
      speed: 100,
      cssEase: 'linear'
    });
    // $('.partners-block').slick({
    //   dots: true,
    //   arrows: false
    // });


    // form submit
    function submitForm() {
      var formID = $(this).attr('id');
      var formNm = $('#' + formID);
      var message = $(formNm).find(".form-message");
      var formTitle = $(formNm).find(".form-title");
      $.ajax({
          type: "POST",
          url: 'to-telegram.php',
          data: formNm.serialize(),
          success: function (data) {
            message.html(data);
            formTitle.css("display","none");
            setTimeout(function(){
              formTitle.css("display","block");
              message.html('');
              $('input').not(':input[type=submit], :input[type=hidden]').val('');
            }, 3000);
          },
          error: function (jqXHR, text, error) {
              message.html(error);
              formTitle.css("display","none");
              setTimeout(function(){
                formTitle.css("display","block");
                message.html('');
                $('input').not(':input[type=submit], :input[type=hidden]').val('');
              }, 3000);
          }
      });
      return false;
    }

    //custom select
    $(".custom-select .select-header").click(function() {
      $(this).parent().toggleClass("open");
    });

    // set the selected option when an option is clicked
    $(".custom-select .option").click(function() {
      let value = $(this).data("value");
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      $(this).closest(".custom-select").find("input[type='text']").val(value);
      $(this).closest(".custom-select").removeClass("open");
    });

    // form check
    
    // define validation function
    function validateInput(inputElement, errorMessage) {
      let inputValue = inputElement.val().trim();
      if (inputValue.length === 0 || inputValue.length < 4) {
        inputElement.addClass("error");
        inputElement.next("p").text(errorMessage).show();
        return false;
      } else {
        inputElement.removeClass("error");
        inputElement.next("p").hide();
        return true;
      }
    }

    // add blur event handler to name field
    $("#name").blur(function() {
      validateInput($(this), "Имя не менее 4 символов.");
    });

    // add blur event handler to phone field
    $("#phone").blur(function() {
      validateInput($(this), "Заполните поле телефона.");
    });

    // add blur event handler to company name field
    $("#company-name").blur(function() {
      validateInput($(this), "Название компании хотя бы 4 символа.");
    });
    
    // add blur event handler to company category
    $("#category").blur(function() {
      validateInput($(this), "Выберите категорию.");
    });

    // add click event handler to custom select options
    $(".custom-select .select-options li").click(function() {
      let value = $(this).attr("data-value");
      $(this).addClass("selected").siblings().removeClass("selected");
      $(this).closest(".custom-select").find("#category").val(value);
      validateInput($("#category"), "Выберите категорию бизнеса.");
    });

    // add submit event handler to form
    $("form").submit(function(event) {
      let isValid = true;
      isValid = validateInput($("#name"), "Имя не менее 4 символов.") && isValid;
      isValid = validateInput($("#phone"), "Заполните поле телефона.") && isValid;
      isValid = validateInput($("#company-name"), "Название компании хотя бы 4 символа.") && isValid;
      isValid = validateInput($("#category"), "Выберите категорию бизнеса.") && isValid;
      if (!isValid) {
        event.preventDefault();
      }
    });

        

});