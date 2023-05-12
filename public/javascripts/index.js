//register
$(document).on('submit', '#formRegister', (err) => {
  let username = $('#username').val()
  let pass1 = $('#pass1').val()
  let pass2 = $('#pass2').val()
  if (pass1 == pass2) {
    $.ajax({
      url: '/register',
      type: 'POST',
      dataType: "json",
      headers: {
        "X-CSRF-Token": $("#csrf").val(),
      },
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ name: username, password: pass1 }),
      success: (data) => {
        showToast(new Toast("success", "toast-top-right", data.msg))
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      },
      error: (data) => {
        showToast(new Toast("error", "toast-top-right", data.responseJSON.err))
      }
    })
  }
})
//login
$(document).on('submit', '#formLogin', (err) => {
  let username = $('#username').val()
  let password = $('#password').val()
  $.ajax({
    url: '/auth/local',
    type: 'POST',
    dataType: "json",
    headers: {
      "X-CSRF-Token": $("#csrf").val(),
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ username: username, password: password }),
    success: (data) => {
      showToast(new Toast("success", "toast-top-right", data.msg))
      setTimeout(() => {
        window.location.href = '/chatbot'
      }, 2000)
    },
    error: (data) => {
      showToast(new Toast("error", "toast-top-right", data.responseJSON.err))
    }
  })
})

$(document).ready(function () {
  setTimeout(function () {
    $(".toasts").attr("hidden", true);
  }, 3000);
  $("#pass1").on("input", () => {
    if ($("#pass1").val().length < 6) {
      $("#noticeRegister").attr("hidden", false);
      $("#contentNoticeRegister").html(
        "Password must have at least 6 characters!"
      );
    } else {
      $("#noticeRegister").attr("hidden", true);
    }
  });
  $("#pass2").on("input", function () {
    if ($("#pass1").val() != $("#pass2").val()) {
      $("#noticeRegister").attr("hidden", false);
      $("#contentNoticeRegister").html("Password does not match.");
    } else {
      $("#noticeRegister").attr("hidden", true);
    }
  });

  //Toggle fullscreen
  $(".chat-bot-icon").click(function (e) {
    $(this).children("img").toggleClass("hide");
    $(this).children("svg").toggleClass("animate");
    $(".chat-screen").toggleClass("show-chat");
  });
  //start chat
  $(".chat-mail button").click(function () {
    let language = $('#language').val()
    if (language !== null) {
      $(".chat-mail").addClass("hide");
      $(".chat-body").removeClass("hide");
      $(".chat-input").removeClass("hide");
      $(".chat-header-option").removeClass("hide");
      $('#content').scrollTop($('#content')[0].scrollHeight);
      //intro
      if (language == 'en') {
        $('.startEn').removeClass("hide");
      }
      if (language == 'vi') {
        $('.startVi').removeClass("hide");
      }
      // window.localStorage.setItem('user', null)
      var socket = io();

      //pass user data into server
      socket.emit('userConnected', { user: getAccount() })

      // Lắng nghe sự kiện 'reply' từ server
      socket.on("reply", (data) => {
        $('.chat-body').children().last().remove()
        $('.chat-body').append(`<div class="chat-bubble you">${data.Chatbot}</div>`)
        // Cuộn tới dưới cùng của phần tử có id là "content"
        $('#content').scrollTop($('#content')[0].scrollHeight);
      });
      //press enter -> send
      let prompt = $("#prompt");
      prompt.on("keypress", (event) => {
        if (event.key == "Enter") {
          event.preventDefault();
          $("#send").click();
        }
      });
      $('#send').click(() => {
        let flag = true
        let prompt = $("#prompt").val();
        $("#prompt").val("");
        if (prompt != "" && flag) {
          $('.chat-body').append(`<div class="chat-bubble me">${prompt}</div>`)
          $('.chat-body').append(`<div class="chat-bubble you" id="waiting">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;"
              viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="0" cy="44.1678" r="15" fill="#ffffff">
                  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                      repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s"
                      begin="-0.6s"></animate>
              </circle>
              <circle cx="45" cy="43.0965" r="15" fill="#ffffff">
                  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                      repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s"
                      begin="-0.39999999999999997s"></animate>
              </circle>
              <circle cx="90" cy="52.0442" r="15" fill="#ffffff">
                  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                      repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s"
                      begin="-0.19999999999999998s"></animate>
              </circle>
          </svg>
      </div>`)
          $('#content').scrollTop($('#content')[0].scrollHeight);
          // Gửi sự kiện 'message' từ client
          socket.emit("message", { prompt: prompt, lang: $('#language').val() });
          // if(prompt=='cancel'){
          //   flag =false
          //   $('.chat-body').children().last().remove()
          //   $('.chat-body').append(`<div class="chat-bubble you" id="waiting">The chat has been ended</div>`)
          //   socket.disconnect()
          // }
        }
      });

    } else {
      showToast(new Toast("error", "toast-top-right", "Please choose language (Vui lòng chọn ngôn ngữ"))
    }
  });
});

function getAccount() {
  let account = null
  $.ajax({
    url: '/account',
    type: 'GET',
    async: false,
    contentType: "application/json",
    success: (data) => {
      account = data.user
    }
  })
  return account;
}


class Toast {
  constructor(type, css, msg) {
    this.type = type;
    this.css = css;
    this.msg = msg;
  }
}
toastr.options.positionClass = "toast-top-right";
toastr.options.extendedTimeOut = 1000;
toastr.options.timeOut = 1000;
toastr.options.fadeOut = 250;
toastr.options.fadeIn = 250;

function showToast(t) {
  toastr.options.positionClass = t.css;
  toastr[t.type](t.msg);
}
