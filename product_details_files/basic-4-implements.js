/* 請注意：
 * 1. ep2020專案 basic-4-implements.js，對應 ep專案各自 vue.js，請自行套用
 */

$(function () {
  var _body = $("body");
  var _window = $(window);
  var _topZone = $(".topZone");
  var _menu = $(".menu");

  var ww = _window.width();
  var wh = _window.height();
  var wwNew = ww;
  var wwMedium = 700; //此值以下是手機
  var wwWide = 1000; //此值以上是電腦
  var wwMaximum = 1620;
  var wwSlim = 500;

  // 需要處理次選單的模組
  var _topMenu = $(".topMenu");
  var _favAndLang = $(".favAndLang");
  var _pdCateTree = $(".pdCateTree");

  // side bar & top menu
  var _sideBar = $(".sideBar");
  var _topMenuCtrl = $(".topMenuCtrl");
  var _sideBarCtrl = $(".sideBarCtrl");
  var _main = $(".main");
  var hh = _topZone.outerHeight(true);
  var selectedType = [];

  //製作漢堡選單的三條線
  _sideBarCtrl.append("<span></span><span></span><span></span>");

  // ----------------------------------------------------- 簡易查詢區開合
  var _searchCtrl = $(".searchCtrl");
  var _topSearch = _topZone.find(".search");
  _searchCtrl.click(function () {
    if (_topSearch.is(":visible")) {
      $(this).removeClass("closeIt");
      _topSearch.slideUp(200);
    } else {
      $(this).addClass("closeIt");
      _topSearch.slideDown(200);
    }
  });

  // ----------------------------------------------------- 處理 mega menu
  var _megamenu = _menu.find(".megamenu");
  var _pdCateMenu = _megamenu.find('.pdCate');
  _megamenu.parent("li").addClass("hasMegaChild");
  _menu.find("li").has("ul").addClass("hasChild");
  _megamenu.find("li").removeClass("hasChild");
  
  // .megamenu 中增加 <div class="viewAll"> （20210119）
  _megamenu.find(".viewAll").find("a").clone().prependTo(_pdCateMenu);
  _pdCateMenu.children("a").wrap("<li class="viewAll"></li>");

  var _hasChild = _menu.add(_favAndLang).find(".hasChild"); //一般版 .menu 和 .favAndLang 次選單
  var _hasMegaChild = _menu.find(".hasMegaChild");

  _hasChild.hover(
    function () {
      $(this).children("ul").stop(true, false).slideDown(300);
    },
    function () {
      $(this).children("ul").stop(true, false).slideUp(300);
    }
  );

  _hasMegaChild.hover(
    function () {
      $(this).find(_megamenu).stop(true, false).slideDown(400);
    },
    function () {
      $(this).find(_megamenu).stop(true, false).slideUp(300);
    }
  );

  //複製主選單到側欄給行動版用
  _menu.clone().prependTo(_sideBar);

  // 剝除行動版側欄選單的 div.megamenu
  _sideBar.find(".menu .pdCate").unwrap();

  //移除行動版側欄選單中.pdCate 含有 li.all 的 ul 前一個 a 的 href 屬性（移除連結事件，下層選單才可展開）
  _sideBar.find(".pdCate").find(".all").parent().prev("a").removeAttr("href");

  //複製 .topMenu 給行動版用
  _topMenu
    .clone()
    .appendTo(_topZone)
    .addClass("topMenuClone")
    .removeClass("topMenu");
  var _topMenuClone = $(".topMenuClone");
  _topMenuClone.find(".hasSignIn").prependTo(_topMenuClone); // 把 .hasSignIn 移到上方
  _topMenuClone.find(".msgCount").appendTo(_topZone); // 未讀訊息數顯示在小頭像右上

  //製作遮罩
  // @重覆註冊，寫死在 html
  // _body.filter('body').append('<div class="coverAll"></div><div class="sidebarMask"></div>');
  // _coverAll.add(_sidebarMask).hide();
  var _coverAll = $(".coverAll"); //燈箱用遮罩
  var _sidebarMask = $(".sidebarMask"); //側欄專用遮罩

  // ----------------------------------------------------- 側欄顯示／隱藏
  _sideBarCtrl.click(function () {
    if (_sideBar.hasClass("reveal")) {
      _sideBar.removeClass("reveal");
      $(this).removeClass("closeIt");
      if (_topMenuClone.is(":hidden")) {
        _sidebarMask.fadeOut();
      }
    } else {
      _sideBar.addClass("reveal");
      $(this).addClass("closeIt");
      if (_topMenuClone.is(":hidden")) {
        _sidebarMask.fadeIn();
      }
    }
  });

  // ----------------------------------------------------- 上方選單的行動版（小頭像控制）
  _topMenuCtrl.click(function () {
    if (_topMenuClone.is(":visible")) {
      _topMenuClone.stop(true, false).slideUp();
      $(this).removeClass("closeIt");
      if (!_sideBar.hasClass("reveal")) {
        _sidebarMask.fadeOut();
      }
    } else {
      _topMenuClone.stop(true, false).slideDown();
      $(this).addClass("closeIt");
      if (!_sideBar.hasClass("reveal")) {
        _sidebarMask.fadeIn();
      }
    }
  });

  // ----------------------------------------------------- 側欄專用遮罩 _topMenuClone _sideBar
  _sidebarMask.click(function () {
    $(this).fadeOut();
    _topMenuClone.stop(true, false).slideUp().removeClass("reveal");
    _sideBar.removeClass("reveal");
    _sideBarCtrl.add(_topMenuCtrl).removeClass("closeIt");
  });

  // ----------------------------------------------------- hasChild 次選單開合
  //側欄 .menu 次選單＋ _topMenuClone 次選單（行動版）
  var _sideBarMenu = _sideBar.find(".menu").add(_topMenuClone);
  _sideBarMenu.find("li").has("ul").addClass("hasChild");

  var _hasChildItemMb = _sideBarMenu.find(".hasChild>a");
  _hasChildItemMb.parent("li").filter(".hello").addClass("closeIt");

  _hasChildItemMb.click(function () {
    var _this = $(this);
    var _slideingUl = _this.siblings("ul");
    if (_slideingUl.is(":visible")) {
      _this.parent().removeClass("closeIt");
      _slideingUl.slideUp();
    } else {
      _this.parent().addClass("closeIt");
      _slideingUl.slideDown();
    }
  });

  // ----------------------------------------------------- .topMenu
  var _hasChildItem = _topMenu.find(".hasChild");
  var _cartNotEmpty = _topMenu.find("li").has(".top-cart");
  _topMenu.find("li").has(".top-cart .block").addClass("hasChild");
  var basicSpeed = 0.8;
  _hasChildItem.hover(
    function () {
      $(this)
        .children("ul")
        .stop(true, false)
        .slideDown($(this).children("ul").height() * basicSpeed);
    },
    function () {
      $(this).children("ul").stop(true, false).slideUp(300);
    }
  );
  _cartNotEmpty.hover(
    function () {
      $(this)
        .children(".top-cart")
        .stop(true, false)
        .slideDown($(this).children(".top-cart").height() * 0.4);
    },
    function () {
      $(this).children(".top-cart").stop(true, false).slideUp(300);
    }
  );

  // ----------------------------------------------------- 產品分類目錄樹次分類開合
  _pdCateTree.each(function () {
    var _pcbHasChild = $(this).find(".hasChild>a");
    _pcbHasChild.next("ul").hide();

    _pcbHasChild.click(function () {
      var _this = $(this).parent("li");
      var _slidingUl = _this.children("ul");
      if (_slidingUl.is(":visible")) {
        _this.removeClass("closeIt");
        _slidingUl.slideUp();
      } else {
        _this.addClass("closeIt");
        _slidingUl.slideDown();
      }
    });
  });

  // ----------------------------------------------------- 行動版螢幕下方的 Product Category
  var _showPdCate = $(".onMobileFoot").find(".showPdCate");
  var _pdTreeBottom = $(".onMobileFoot").find(".pdCateTree");

  _showPdCate.click(function () {
    if (_pdTreeBottom.is(":hidden")) {
      $(this).addClass("closeIt");
      _pdTreeBottom.stop(true, false).slideDown(300);
      _coverAll.fadeIn(200);
    } else {
      $(this).removeClass("closeIt");
      _pdTreeBottom.stop(true, false).slideUp(300);
      _coverAll.hide();
    }
  });
  _coverAll.click(function () {
    _pdTreeBottom.slideUp(300);
    _showPdCate.removeClass("closeIt");
  });

  // -----------------------------------------------------top 的購物車內容
  var _topCart = _topMenuClone.find(".top-cart");
  var _cartItem = _topMenuClone.find("li.cart>a");
  var _closeCart = _topCart.find(".closeCart");
  _cartItem.click(function () {
    if (_topCart.is(":hidden")) {
      _topCart.show();
    } else {
      _topCart.hide();
    }
  });
  _closeCart.click(function () {
    $(this).parent().hide();
  });

  // ----------------------------------------------- 產品內容頁主圖輪播
  $(".pdPhotoShow").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    fade: true,
    asNavFor: ".pdPhotoNav",
  });
  $(".pdPhotoNav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".pdPhotoShow",
    dots: false,
    arrows: true,
    centerMode: false,
    focusOnSelect: true,
  });

  // ----------------------------------------------- 多種媒體展示區 iStage 2020
  var _iStage = $(".iStage");
  var _mediaShow = $(".mediaShow");
  _iStage.add(_mediaShow).each(function () {
    var _this = $(this);
    var _showArea = _this.find(".showArea");
    var _showList = _showArea.find(".showList");
    var _showItem = _showList.children("li");
    var count = _showItem.length;
    var _dots = "";
    var i = 0;

    if (count > 1) {
      // 產生 indicator 點點
      _this.append('<div class="indicator"><ul></ul></div>');
      for (var n = 0; n < count; n++) {
        _dots = _dots + "<li></li>";
      }
      _this.find(".indicator>ul").append(_dots); // 加入的點點
      var _indicator = _this.find(".indicator").find("li");

      _showItem.hide().eq(i).show().addClass("now");
      _indicator.eq(i).addClass("now");

      _indicator.click(function () {
        i = $(this).index();
        $(this).addClass("now").siblings().removeClass("now");
        _showItem
          .stop(true, false)
          .fadeOut(400)
          .eq(i)
          .stop(true, false)
          .fadeIn(400);
      });
    }
  });

  // ------------------------------------------------ 產品認證標籤開合 2020
   // 20201224 修改
  var _pdCertifiMark = $(".thisPdDetails").find(".certifiMark");
  var _pdCertifiList = _pdCertifiMark.find(".list");
  var _pdCertifiItem = _pdCertifiList.find("li");
  var _morePdCerti = _pdCertifiMark.find(".more");
  var moreText = _morePdCerti.text();
  var lessText = _morePdCerti.attr("data-alttext");
  var totalWidth;

  pdCertifiReveal();
  function pdCertifiReveal () {
    if (ww >= wwWide) {
      totalWidth = _pdCertifiItem.outerWidth(true) * _pdCertifiItem.length;
      if (totalWidth > _pdCertifiMark.width()){
        _morePdCerti.show();
      }
      else {
        _morePdCerti.hide();
      }
    } else {
      _morePdCerti.hide();
    }
  }
  
  _morePdCerti.click(function(){
    if (_pdCertifiList.hasClass("revealAll")) {
      _pdCertifiList.removeClass("revealAll");
      _morePdCerti.text(moreText);
    } else {
      _pdCertifiList.addClass("revealAll");
      _morePdCerti.text(lessText);
    }
  });

  var resizeTimer;
  _window.resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      ww = _window.width();
      pdCertifiReveal();
      console.log(_morePdCerti);
    }, 210);
  })

  //  ----------------------------------------------- 產品左右滑動（非自動輪播）2020
  var _pdSlide = $(
    ".pdQueue.ckSlide, .factoryList.ckSlide, .awardList.ckSlide, .officialRec.ckSlide, .tt2.ckSlide, .twPdMag.ckSlide"
  );
  _pdSlide.each(function () {
    var _this = $(this);
    var _slideArea = _this.find(".slideArea");
    var _slideList = _slideArea.find(".list");
    var _slideItem = _slideList.children("li");
    var slideDistance = _slideItem.outerWidth(true);
    var slideCount = _slideItem.length;
    var _btnRight = _this.find(".arrowRight");
    var _btnLeft = _this.find(".arrowLeft");
    var speed = 600;
    var i = 0;
    var j;
    var _dots = "";

    // 產生 indicator
    _slideArea.after('<div class="indicator"><ul></ul></div>');
    var _indicator = _this.find(".indicator>ul");
    for (var n = 0; n < slideCount; n++) {
      _dots = _dots + "<li></li>";
    }
    _indicator.append(_dots);
    var _indicatItem = _indicator.find("li");
    _indicatItem.eq(i).addClass("now");

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      var ww = _window.width();
      _indicatItem.removeClass("now");
      _indicatItem.eq(i).addClass("now");
      if (ww < wwMedium && slideCount > 1) {
        _indicator.show();
      }
      if (ww >= wwMedium) {
        _indicator.show();
        if (slideCount <= 2) {
          _indicator.hide();
        } else {
          _indicatItem.eq((i + 1) % slideCount).addClass("now");
        }
      }
      if (ww >= wwWide) {
        if (slideCount <= 4) {
          _indicator.add(_btnRight).add(_btnLeft).hide();
        } else {
          _indicatItem.eq((i + 2) % slideCount).addClass("now");
          _indicatItem.eq((i + 3) % slideCount).addClass("now");
        }
      }
    }

    function slideForward() {
      _slideList
        .stop(true, false)
        .animate({ "margin-left": -1 * slideDistance }, speed, function () {
          j = (i + 1) % slideCount;
          _slideItem.eq(i).appendTo(_slideList);
          _indicatItem.eq(i).removeClass("now");
          _indicatItem.eq(j).addClass("now");
          _slideList.css("margin-left", 0);

          if (ww >= wwMedium) {
            _indicatItem.eq((j + 1) % slideCount).addClass("now");
          }
          if (ww >= wwWide) {
            _indicatItem.eq((j + 2) % slideCount).addClass("now");
            _indicatItem.eq((j + 3) % slideCount).addClass("now");
          }
          i = j;
        });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _slideItem.eq(j).prependTo(_slideList);
      _slideList.css("margin-left", -1 * slideDistance);

      _slideList
        .stop(true, false)
        .animate({ "margin-left": 0 }, speed, function () {
          // _slideItem.eq(i).removeClass('now');
          _indicatItem.eq(j).addClass("now");
          if (ww >= wwWide) {
            _indicatItem.eq((i + 3) % slideCount).removeClass("now");
          } else if (ww >= wwMedium) {
            _indicatItem.eq((i + 1) % slideCount).removeClass("now");
          } else {
            _indicatItem.eq(i).removeClass("now");
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () {
      slideForward();
    });

    // 點擊向左箭頭
    _btnLeft.click(function () {
      slideBackward();
    });

    // 左右滑動
    _slideArea.swipe({
      swipeRight: function () {
        slideBackward();
      },
      swipeLeft: function () {
        slideForward();
      },
      threshold: 20,
    });

    var winResizeTimer2;
    _window.resize(function () {
      clearTimeout(winResizeTimer2);
      winResizeTimer2 = setTimeout(function () {
        slideDistance = _slideItem.outerWidth(true);
        _slideList.width(slideDistance * slideCount);
        indicatReady();
      }, 210);
    });

    // 點頁籤時需計算 slide 寬度。一頁式用
    $(".tabItems li")
      .add(".tabContent>.tabHead")
      .click(function () {
        slideDistance = _slideItem.outerWidth(true);
        _slideList.width(slideDistance * slideCount);
        indicatReady();
      });
  });

  // ----------------------------------------------- 只顯示一個li的滑動（非自動輪播）2020
  _aboutUsVideo = $(".aboutUsVideo.ckSlide");
  _aboutUsVideo.each(function () {
    var _this = $(this);
    var _slideArea = _this.find(".slideArea");
    var _slideList = _slideArea.find(".list");
    var _slideItem = _slideList.children("li");
    var slideDistance = _slideItem.outerWidth(true);
    var slideCount = _slideItem.length;
    var _btnRight = _this.find(".arrowRight");
    var _btnLeft = _this.find(".arrowLeft");
    var speed = 800;
    var i = 0;
    var j;
    var _dots = "";

    _slideItem.css("margin-left", slideDistance);
    _slideItem.eq(i).css("margin-left", 0);

    if (slideCount > 1) {
      // 產生 indicator
      _slideArea.after('<div class="indicator"><ul></ul></div>');
      var _indicator = _this.find(".indicator>ul");
      for (var n = 0; n < slideCount; n++) {
        _dots = _dots + "<li></li>";
      }
      _indicator.append(_dots);
      var _indicatItem = _indicator.find("li");
      _indicatItem.eq(i).addClass("now");

      function slideForward() {
        j = (i + 1) % slideCount;
        _slideItem
          .eq(i)
          .stop(true, false)
          .animate({ "margin-left": -1 * slideDistance }, speed, function () {
            $(this).css("margin-left", slideDistance);
          });
        _slideItem.eq(j).stop(true, false).animate({ "margin-left": 0 }, speed);
        _indicatItem.removeClass("now").eq(j).addClass("now");
        i = j;
      }

      function slideBackward() {
        j = (i - 1) % slideCount;
        _slideItem
          .eq(j)
          .css("margin-left", -1 * slideDistance)
          .stop(true, false)
          .animate({ "margin-left": 0 }, speed);
        _slideItem
          .eq(i)
          .stop(true, false)
          .animate({ "margin-left": slideDistance }, speed);
        _indicatItem.removeClass("now").eq(j).addClass("now");
        i = j;
      }

      // 點擊向右箭頭
      _btnRight.click(function () {
        slideForward();
      });

      // 點擊向左箭頭
      _btnLeft.click(function () {
        slideBackward();
      });

      // 左右滑動
      _slideArea.swipe({
        swipeRight: function () {
          slideBackward();
        },
        swipeLeft: function () {
          slideForward();
        },
        threshold: 20,
      });
    } else {
      _btnRight.add(_btnLeft).hide();
    }

    var winResizeTimer1;
    _window.resize(function () {
      clearTimeout(winResizeTimer1);
      winResizeTimer1 = setTimeout(function () {
        slideDistance = _slideItem.outerWidth(true);
        _slideItem.css("margin-left", slideDistance);
        _slideItem.eq(i).css("margin-left", 0);
      }, 210);
    });
  });

  // ------------------------------------------------ 放入購物車，加入喜愛項目圖示樣式切換 2020
  var _action = $(".addTo");
  _action.each(function () {
    var _item = $(this).find("li");
    _item.click(function () {
      $(this).toggleClass("active");
    });
  });
});
