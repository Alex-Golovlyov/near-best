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

    // form check
    
    $('#name1').on('blur', function() {
      var name1 = $('#name1').val();
      
      if (name1.length < 4) {
        $('#name1Error').text('Введите хотя бы 4 символа');
        $('#name1').css('border', '2px solid #ff6565');
      } else {
        $('#name1Error').text('');
        $('#name1').css('border', '');
      }
    });
    
    $('#phone1').on('blur', function() {
      var phone1 = $('#phone1').val(); 
      if (phone1.length < 5) {
        $('#phone1Error').text('Добавьте ваш номер телефона');
        $('#phone1').css('border', '2px solid #ff6565');
      } else {
        $('#phone1Error').text('');
        $('#phone1').css('border', '');
      }
    });  
    
    $('#company1').on('blur', function() {
      var company1 = $('#company1').val();
      if (company1.length < 4) {
        $('#company1Error').text('Введите хотя бы 4 символа');
        $('#company1').css('border', '2px solid #ff6565');
      } else {
        $('#company1Error').text('');
        $('#company1').css('border', '');
      }
    });
    
    $('#name2').on('blur', function() {
      var name2 = $('#name2').val();
      
      if (name2.length < 4) {
        $('#name2Error').text('Введите хотя бы 4 символа');
        $('#name2').css('border', '2px solid #ff6565');
      } else {
        $('#name2Error').text('');
        $('#name2').css('border', '');
      }
    });
    
    $('#phone2').on('blur', function() {
      var phone2 = $('#phone2').val(); 
      if (phone2.length < 4) {
        $('#phone2Error').text('Добавьте ваш номер телефона');
        $('#phone2').css('border', '2px solid #ff6565');
      } else {
        $('#phone2Error').text('');
        $('#phone2').css('border', '');
      }
    });  

    $('#subscribe').on('submit', function(e) {
      e.preventDefault();
      
      var name1 = $('#name1').val();
      var phone1 = $('#phone1').val();
      var company1 = $('#company1').val();
      
      if (name1.length < 4 || phone1.length < 5 || company1.length < 4) {
        alert('Пожалуйста, заполните форму');
        return false;
      } else {
        submitForm();
      }
    });

    $('#lead-form-manager').on('submit', function(e) {
      e.preventDefault();
      
      var name2 = $('#name2').val();
      var phone2 = $('#phone2').val();
      
      if (name2.length < 4 || phone2.length < 5) {
        alert('Пожалуйста, заполните форму');
        return false;
      } else {
        submitForm();
      }
    });

    // custom select

    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);    

});