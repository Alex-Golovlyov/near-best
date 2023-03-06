$(document).ready(function () {

    // checkbox submit
    $('#submit1, #submit2').prop('disabled', true);

    function disableSubmitButton(formID, checkboxID, submitID) {
      $(checkboxID).change(function() {
        if($(this).is(":checked")) {
          $(submitID).prop('disabled', false);
        } else {
          $(submitID).prop('disabled', true);
        }
      });
    }

    disableSubmitButton('#subsribe', '#checkbox1', '#submit1');
    disableSubmitButton('#lead-form-manager', '#checkbox2', '#submit2');

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
    // toggle the custom select options when the select header is clicked
    $(".custom-select .select-header").click(function() {
      $(this).parent().toggleClass("open");
    });

    // set the selected option when an option is clicked
    $(".custom-select .option").click(function() {
      let value = $(this).data("value");
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      $(this).closest(".custom-select").find(".select-value").text($(this).text());
      $(this).closest(".custom-select").find("input[type='hidden']").val(value);
      $(this).closest(".custom-select").removeClass("open");
    });

    // form check
    
    // define validation function
    function validateInput(inputElement, errorMessage) {
      let inputValue = inputElement.val().trim();
      if (inputValue.length === 0 || inputValue.length < 5) {
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

    // add click event handler to custom select element
    $(".custom-select .select-selected").click(function() {
      $(this).toggleClass("select-arrow-active");
      $(this).next(".select-items").toggleClass("select-hide");
    });

    // add click event handler to custom select options
    $(".custom-select .select-items div").click(function() {
      let value = $(this).attr("data-value");
      $(this).addClass("selected").siblings().removeClass("selected");
      $(this).closest(".custom-select").find("#company-category-input").val(value);
      $(this).closest(".custom-select").find(".select-selected").removeClass("select-arrow-active").text($(this).text());
      $(this).closest(".select-items").addClass("select-hide");
      validateInput($("#company-category-input"), "Пожалуйста, выберите категорию.");
    });

    // add change event handler to company category select
    $("#company-category").change(function() {
      let selectValue = $(this).val();
      if (selectValue === "") {
        $(this).addClass("error");
        $(this).next("p").text("Пожалуйста, выберите категорию.").show();
      } else {
        $(this).removeClass("error");
        $(this).next("p").hide();
      }
    });

    // add submit event handler to form
    $("form").submit(function(event) {
      let isValid = true;
      isValid = validateInput($("#name"), "Имя не менее 4 символов.") && isValid;
      isValid = validateInput($("#phone"), "Phone must be at least 5 characters long and not empty.") && isValid;
      isValid = validateInput($("#company-name"), "Company name must be at least 5 characters long and not empty.") && isValid;
      let selectValue = $("#company-category-input").val();
      if (selectValue === "") {
        $(".custom-select").addClass("error");
        $(".custom-select").next("p").text("Please select a category.").show();
        isValid = false;
      } else {
        $(".custom-select").removeClass("error");
        $(".custom-select").next("p").hide();
      }
      if (!isValid) {
        event.preventDefault();
      }
    });

    // custom select

        

});