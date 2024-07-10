/**************************************************************
 * included from http://www.quirksmode.org/js/cookies.html
 *************************************************************/

function wuCreateCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function wuReadCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function wuEraseCookie(name) {
  wuCreateCookie(name, "", -1);
}

/**************************************************************
 * Actual code below
 *************************************************************/

var cookieRegistry = [];

function wuListenCookieChange(cookieName, callback) {
  setInterval(function() {
    if (cookieRegistry[cookieName]) {
      if (wuReadCookie(cookieName) !== cookieRegistry[cookieName]) {
        // update registry so we dont get triggered again
        cookieRegistry[cookieName] = wuReadCookie(cookieName);
        return callback();
      }
    } else {
      cookieRegistry[cookieName] = wuReadCookie(cookieName);
    }
  }, 100);
}



/**
 * Teste
 */
// FBar PHP & JS Theme Demo Bar Version v1.0
var theme_list_open=false;
(function($) {
  
  $(document).ready(function(){
    
    function e() {
      var e = $("#switcher").outerHeight();
      $("#iframe").css("height", $(window).outerHeight() - e + "px")
    }
    IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
    $(window).resize(function () {
      e()
    }).resize();
    $("#template_selector").click(function () {
      if (theme_list_open == true) {
        $(".center ul li ul").hide();
        theme_list_open = false
      } else {
        $(".center ul li ul").show();
        theme_list_open = true
      }
      return false
    });
    $("#theme_list ul li a").click(function () {
      var e = $(this).attr("rel").split(",");
      $("li.purchase a").attr("href", e[1]);
      $("li.remove_frame a").attr("href", e[0]);
      $("#iframe").attr("src", e[0]);
      $("#theme_list a#template_selector").text($(this).text());
      $(".center ul li ul").hide();
      theme_list_open = false;
      return false
    });
    $("#header-bar").hide();
    clicked = "desktop";
    var t = {
      desktop: "100%",
      tabletlandscape: 1040,
      tabletportrait: 788,
      mobilelandscape: 500,
      mobileportrait: 340,
      placebo: 0
    };
    jQuery(".responsive a").on("click", function () {
      var e = jQuery(this);
      for (device in t) {
        if (e.hasClass(device)) {
          clicked = device;
          jQuery("#iframe").width(t[device]);
          if (clicked == device) {
            jQuery(".responsive a").removeClass("active");
            e.addClass("active")
          }
        }
      }
      return false
    });
    if (IS_IPAD) {
      $("#iframe").css("padding-bottom", "60px")
    }
  })

})(jQuery);

//jQuery(document).ready(function() {
//  
//  // Check URL
//  console
//  console.log('redirecting...');
//  var _url = jQuery('.full-screen-preview__frame').attr('src');
//  
//  if (_url != top.location.href)
//    window.location.href = _url;
//});

if (top != self) {
    window.open(self.location.href, '_top');
}