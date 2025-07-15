$(function(){

  var _body = $('body');
  var _window = $(window);
  var _topZone = $('.topZone');
  var _menu = $('.menu');

  var ww = _window.width();
  var wh = _window.height();
  var wwNew = ww;
  var wwMedium = 700; //此值以下是手機
  var wwWide = 1000;  //此值以上是電腦
  var wwMaximum = 1620;
  var wwSlim = 500;




  // 需要處理次選單的模組
  var _topMenu = $('.topMenu');
  var _favAndLang = $('.favAndLang');
  var _pdCateTree = $('.pdCateTree');

  _topMenu.add(_favAndLang).add(_pdCateTree).find('li').has('ul').addClass('hasChild');

  // side bar & top menu
  var _sideBar = $('.sideBar');
  var _topMenuCtrl = $('.topMenuCtrl');
  var _sideBarCtrl = $('.sideBarCtrl');
  var _main = $('.main');
  var hh = _topZone.outerHeight(true);
  var selectedType = [];

  //製作漢堡選單的三條線
  _sideBarCtrl.append('<span></span><span></span><span></span>');

  // ----------------------------------------------------- slick 參數設定
  $('.pdSlick').slick({
    arrows: false,                       //左右箭頭
    autoplay: true,                    //自動播放
    autoplaySpeed: 3000,                //自動播放秒數
    dots: false,                        //顯示圓點
    draggable: true,                    //滑鼠可以拖曳
    infinite: true,                     //無限輪播
    pauseOnHover: true,                 //滑鼠移過後暫停自動撥放
    rtl: false,                         //改變輪播方向
    slidesToShow: 2,                    //一次顯示幾張
    slidesToScroll: 1,                  //一次輪播幾張
    vertical: false,                   //改成垂直方向
    mobileFirst:true,
    responsive: [
      // {
      //   breakpoint: wwMedium,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // },
      {
        breakpoint: wwWide,
        settings: {
          arrows: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          vertical: true
        }
      }
    ]
  });


  // product cp 頁，產品圖輪播的『阿語版／非阿語版』設定
  if ($('html').attr('lang') == 'ar') {
    $('.pdPhotoShow').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 600,
      fade: true,
      arrows: false,
      dots: false,
      mobileFirst:true,
      asNavFor:'.pdPhotoNav',
      rtl: true
    })
    $('.pdPhotoNav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows:true,
      focusOnSelect: true,
      asNavFor:'.pdPhotoShow',
      rtl: true
    })
  } else {
    $('.pdPhotoShow').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 600,
      fade: true,
      arrows: false,
      dots: false,
      mobileFirst:true,
      asNavFor:'.pdPhotoNav',
      rtl: false
    })
    $('.pdPhotoNav').slick({
      arrows:true,
      focusOnSelect: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor:'.pdPhotoShow',
      rtl: false
    })
  }



  // ----------------------------------------------------- 簡易查詢區開合
  var _searchCtrl = $('.searchCtrl');
  var _topSearch = _topZone.find('.search');
  _searchCtrl.click(function(){
    if(_topSearch.is(':visible')){
      $(this).removeClass('closeIt');
      _topSearch.slideUp(200);
    } else {
      $(this).addClass('closeIt');
      _topSearch.slideDown(200);
    }
  })



  // ----------------------------------------------------- 處理 mega menu
  var _megamenu = _menu.find('.megamenu');
  var _pdCateMenu = _megamenu.find('.pdCate');
  _megamenu.parent('li').addClass('hasMegaChild');
  _menu.find('li').has('ul').addClass('hasChild');
  _megamenu.find('li').removeClass('hasChild');


  // .megamenu 中增加 <div class="viewAll"> （20210119）
  _megamenu.find('.viewAll').find('a').clone().prependTo(_pdCateMenu);
  _pdCateMenu.children('a').wrap('<li class="viewAll"></li>');
  
  var _hasChild = _menu.add(_favAndLang).find('.hasChild');//一般版 .menu 和 .favAndLang 次選單
  var _hasMegaChild = _menu.find('.hasMegaChild');

  _hasChild.hover(
    function(){$(this).children('ul').stop(true, false).slideDown(300);},
    function(){$(this).children('ul').stop(true, false).slideUp(300)}
  )
  
  _hasMegaChild.hover(
    function(){$(this).find(_megamenu).stop(true, false).slideDown(400);},
    function(){$(this).find(_megamenu).stop(true, false).slideUp(300);}
  )

  //複製主選單到側欄給行動版用
  _menu.clone().prependTo(_sideBar);
  
  // 剝除行動版側欄選單的 div.megamenu
  _sideBar.find('.menu .pdCate').unwrap();
  // megamenu 中增加的 <div class="viewAll"> 複製到行動版時，要移到 ul.pdCate 並外包一層 li 標籤（20210119）
  // _sideBar.find('.menu').find('.viewAll').prependTo('.pdCate');
  // _sideBar.find('.pdCate').find('.viewAll').wrap('<li></li>');

  //移除行動版側欄選單中.pdCate 含有 li.all 的 ul 前一個 a 的 href 屬性（移除連結事件，下層選單才可展開）
  _sideBar.find('.pdCate').find('.all').parent().prev('a').removeAttr('href');

  //複製 .topMenu 給行動版用
  _topMenu.clone().appendTo(_topZone).addClass('topMenuClone').removeClass('topMenu');
  var _topMenuClone = $('.topMenuClone');
  _topMenuClone.find('.hasSignIn').prependTo(_topMenuClone); // 把 .hasSignIn 移到上方
  _topMenuClone.find('.msgCount').appendTo(_topZone); // 未讀訊息數顯示在小頭像右上



  //製作遮罩 
  // @重覆註冊，寫死在 html
  // _body.filter('body').append('<div class="coverAll"></div><div class="sidebarMask"></div>');
  // _coverAll.add(_sidebarMask).hide();
  var _coverAll = $('.coverAll');//燈箱用遮罩
  var _sidebarMask = $('.sidebarMask');//側欄專用遮罩

  // ----------------------------------------------------- 側欄顯示／隱藏
  _sideBarCtrl.click(function(){
    if(_sideBar.hasClass('reveal')){
      _sideBar.removeClass('reveal');
      $(this).removeClass('closeIt');
      if(_topMenuClone.is(':hidden')){
        _sidebarMask.fadeOut();
      }
    } else {
      _sideBar.addClass('reveal');
      $(this).addClass('closeIt');
      if(_topMenuClone.is(':hidden')){
        _sidebarMask.fadeIn();
      }
    }
  })

  // ----------------------------------------------------- 上方選單的行動版（小頭像控制）
  _topMenuCtrl.click(function(){
    if (_topMenuClone.is(':visible')){
      _topMenuClone.stop(true,false).slideUp();
      $(this).removeClass('closeIt');
      if( !_sideBar.hasClass('reveal')){
        _sidebarMask.fadeOut();
      }
    } else {
      _topMenuClone.stop(true,false).slideDown();
      $(this).addClass('closeIt');
      if( !_sideBar.hasClass('reveal')){
        _sidebarMask.fadeIn();
      }
    }
  });

  // ----------------------------------------------------- 側欄專用遮罩 _topMenuClone _sideBar
  _sidebarMask.click(function(){
    $(this).fadeOut();
    _topMenuClone.stop(true,false).slideUp().removeClass('reveal');
    _sideBar.removeClass('reveal');
    _sideBarCtrl.add(_topMenuCtrl).removeClass('closeIt')
  })


  // ----------------------------------------------------- hasChild 次選單開合
  //側欄 .menu 次選單＋ _topMenuClone 次選單（行動版）
  var _sideBarMenu = _sideBar.find('.menu').add(_topMenuClone);
  _sideBarMenu.find('li').has('ul').addClass('hasChild');

  var _hasChildItemMb = _sideBarMenu.find('.hasChild>a');
  _hasChildItemMb.parent('li').filter('.hello').addClass('closeIt');

  _hasChildItemMb.click(function(){
    var _this = $(this);
    var _slideingUl = _this.siblings('ul');
    if(_slideingUl.is(':visible')){
      _this.parent().removeClass('closeIt');
      _slideingUl.slideUp();
    } else {
      _this.parent().addClass('closeIt');
      _slideingUl.slideDown();
    }
  });





  // ----------------------------------------------------- 固定主選單（電腦版時）
  // 20201211 新編
  var offsetHeight;
  var tZoneHeight;
  var tMenuHeight;
  var fixDistance;
  var _ttBadges =  $('.ttBadges');

  function topZoneIni(){
    _topZone.add(_topMenu).removeClass('fixed');
    tZoneHeight = _topZone.innerHeight();
    tMenuHeight = _topMenu.innerHeight();
    offsetHeight = tZoneHeight + tMenuHeight;
    fixDistance = tZoneHeight - _menu.innerHeight();
  }
  if (ww >= wwWide) {
    topZoneIni();
  }

  _window.scroll(function () {
    if(_topMenu.is(':visible')){
      fixHead();
    }

    // -----------------------------
    if(ww < wwWide){
      if (_window.scrollTop() > 50){
        _ttBadges.addClass('slideout');
      } else {
        _ttBadges.removeClass('slideout');
      }
    }
  });

  function fixHead(){
    if (_window.scrollTop() >= fixDistance) {
      _topZone.add(_topMenu).addClass('fixed');
      _body.offset({ top: offsetHeight });
    } else {
      // _topZone.add(_topMenu).removeClass('fixed');
      topZoneIni();
      _body.removeAttr('style');
      _topSearch.removeAttr('style');
      _searchCtrl.removeClass('closeIt');
    }
  }
  // 20201211 新編結束

  
  // fixMenu();
  // function fixMenu() {
  //   _window.scroll(function () {
  //     if (ww >= wwWide) {
  //       if (_window.scrollTop() >= fixDistance) {
  //         _topZone.add(_topMenu).addClass('fixed');
  //         _body.offset({ top: offsetHeight });
  //       } else {
  //         _topZone.add(_topMenu).removeClass('fixed');
  //         _body.removeAttr('style');
  //         _topSearch.removeAttr('style');
  //         _searchCtrl.removeClass('closeIt');
  //       }
  //     } else {
  //       if(_window.scrollTop() >= offsetHeight){
  //         _topZone.addClass('fixed');
  //       } else {
  //         _topZone.removeClass('fixed');
  //       }
  //     }
  //   });
  // }


  


  // ----------------------------------------------------- .topMenu
  var _hasChildItem = _topMenu.find('.hasChild');
  var _cartNotEmpty = _topMenu.find('li').has('.top-cart');
  _topMenu.find('li').has('.top-cart .block').addClass('hasChild');
  var basicSpeed = .8;
  _hasChildItem.hover(
    function(){$(this).children('ul').stop(true,false).slideDown($(this).children('ul').height()*basicSpeed)},
    function(){$(this).children('ul').stop(true,false).slideUp(300)}
  );
  _cartNotEmpty.hover(
    function(){$(this).children('.top-cart').stop(true,false).slideDown( $(this).children('.top-cart').height()*.4)},
    function(){$(this).children('.top-cart').stop(true,false).slideUp(300)}
  );

  // ----------------------------------------------------- 產品分類目錄樹次分類開合
  _pdCateTree.each(function(){
    var _pcbHasChild = $(this).find('.hasChild>a');
    _pcbHasChild.next('ul').hide();

    _pcbHasChild.click(function(){
      var _this = $(this).parent('li');
      var _slidingUl = _this.children('ul');
      if(_slidingUl.is(':visible')){
        _this.removeClass('closeIt');
        _slidingUl.slideUp();
      } else {
        _this.addClass('closeIt');
        _slidingUl.slideDown();
      }
    });
  })

  // ----------------------------------------------------- 行動版螢幕下方的 Product Category
  var _showPdCate = $('.onMobileFoot').find('.showPdCate');
  var _pdTreeBottom = $('.onMobileFoot').find('.pdCateTree');

  _showPdCate.click(function(){
    if(_pdTreeBottom.is(':hidden')){
      $(this).addClass('closeIt');
      _pdTreeBottom.stop(true, false).slideDown(300);
      _coverAll.fadeIn(200);
    } else {
      $(this).removeClass('closeIt');
      _pdTreeBottom.stop(true, false).slideUp(300);
      _coverAll.hide();
    }
  })
  _coverAll.click(function(){
    _pdTreeBottom.slideUp(300);
    _showPdCate.removeClass('closeIt');
  })






  // -----------------------------------------------------top 的購物車內容
  var _topCart = _topMenuClone.find('.top-cart');
  var _cartItem = _topMenuClone.find('li.cart>a');
  var _closeCart = _topCart.find('.closeCart');
  _cartItem.click(function(){
    if(_topCart.is(':hidden')){
      _topCart.show();
    } else {
      _topCart.hide();
    }
  })
  _closeCart.click(function(){
    $(this).parent().hide();
  })


  // Add to Favorites
  var _likeThis = $('.topZone').find('.likeThis');
  _likeThis.click(function(){
    $(this).toggleClass('like');
  })


  // -----------------------------------------------------長駐列向上、向下捲動箭頭
	var _goTop = $('.floatingBar').find('.goTop');
  var _goBottom = $('.floatingBar').find('.goBottom');
  var _scrollSubject = $('body, html');
  _goTop.click(function(){
    _scrollSubject.stop(true,false).animate({scrollTop: 0}, 800);
  });
  _goBottom.click(function(){
    _scrollSubject.stop(true,false).animate({scrollTop: _scrollSubject[0].scrollHeight}, 1200);
  });






  // ---------------------------------------------------有部分Row隱藏的表格 show / hide
  var _hiddenRowCtrl = $('.listTable').find('.hiddenRowCtrl');
  _hiddenRowCtrl.parent('td').parent('tr').addClass('hasHiddenRow');

  _hiddenRowCtrl.click(function(){
    var _hiddenRow = $(this).parent('td').parent('tr').next('.hiddenRow');
    var _hiddenRowContent = _hiddenRow.find('.drawer');
    if(_hiddenRow.is(':hidden')){
      _hiddenRow.show();
      if(ww <= wwMedium){
        _hiddenRow.attr('style', 'display:block');
      } else {
        _hiddenRow.attr('style', 'display:table-row');
      }
      _hiddenRowContent.stop(true,true).slideDown(600);
      $(this).addClass('closeIt');
    } else {
      _hiddenRowContent.stop(true,true).slideUp(600,
        function(){_hiddenRow.hide();}
      );
      $(this).removeClass('closeIt');
    }
  });


  // --------------------------------------------------- drawer (slide up / slide down)
  var _togSlide = $('.toggleDrawer');
  var slideSpeed = 600;


  // if( !_togSlide.hasClass('always')){
  //   if(ww < wwMedium){
  //     _togSlide.addClass('hidden').find('.toggleArea').hide();
  //     _togSlide.find('.toggleCtrl').removeClass('closeIt').text(textShow);
  //   } else {
  //     _togSlide.removeClass('hidden').find('.toggleArea').show();
  //   }
  // } else {
  //   _togSlide.filter('.hidden').find('.toggleArea').hide();
  // }

  _togSlide.each(function(){
    var _toggleDrawer = $(this);
    var _toggleCtrl = _toggleDrawer.find('.toggleCtrl');
    var _toggleArea = _toggleDrawer.find('.toggleArea');
    var textShow = _toggleCtrl.text();
    var textHide = _toggleCtrl.attr('data-altext');

    if(_toggleArea.is(':visible')){
      _toggleCtrl.text(textHide).addClass('closeIt');
    } else{
      _toggleCtrl.text(textShow).removeClass('closeIt');
    }

    if(ww < wwMedium){
      // _toggleDrawer.addClass('hidden');
      _toggleCtrl.removeClass('closeIt').text(textShow);
    } else {
      // _toggleDrawer.removeClass('hidden');
    }


    _toggleCtrl.click(function(){
      if(_toggleArea.is(':visible')){
        $(this).text(textShow).removeClass('closeIt');
        _toggleArea.slideUp(slideSpeed);
        // _toggleDrawer.addClass('hidden');
      } else {
        _toggleArea.slideDown(slideSpeed);
        $(this).text(textHide).addClass('closeIt');
        // _toggleDrawer.removeClass('hidden');
      }
    })

  });
  





  // reply 隱藏部分, layout by tr
  var _expandTable =  $('table').has('.hiddenFieldRow');
  var _rowSwitch = _expandTable.find('.rowSwitch');
  var _hiddenFieldRow = _expandTable.find('.hiddenFieldRow');
  var rowCount = _hiddenFieldRow.length;
  var trHeight = [];

  function getRowHeight(){
    _hiddenFieldRow.each(function () {
      trHeight.push($(this).height());
    })
    _hiddenFieldRow.height(0);
    _rowSwitch.removeClass('closeIt');
  }
  if (ww < wwMedium) {getRowHeight();}

  _rowSwitch.click(function(){
    $(this).toggleClass('closeIt');
    var i = 0;
    for (i=0; i<rowCount; i++){
      if (_hiddenFieldRow.eq(0).height() == 0){
        _hiddenFieldRow.eq(i).animate({'height': trHeight[i]});
      } else {
        _hiddenFieldRow.eq(i).animate({'height': 0});
      }
    }
  });
  

  // --------------------------------------------------- checkbox and radio 樣式處理
  $('.optionPool').each(function(){
    var _optionPool = $(this),
        _option = _optionPool.find('input');

    _optionPool.find('input[checked]').parent().addClass('isSelected');

    if(_option.attr('type') == 'radio'){
      _optionPool.addClass('singleSelection');
    }

    _option.click(function(){
      var _optionLabel =  $(this).parent();

      if(_optionPool.hasClass('singleSelection')){
        _optionLabel.addClass('isSelected').siblings().removeClass('isSelected');
      } else {
        _optionLabel.toggleClass('isSelected');
      }
    });
  });

    // checking List1: .checkAll 和其他勾選項目在同一個父物件（例如 table 或 ul, ol）中
    var _checkList = $('.msgTemplate, .listTbNew, .listTable').has('.checkAll');
    _checkList.each(function(){
      var _optionCheck = $(this).find('input[type="checkbox"]');
      var _optionLabel = _optionCheck.parent('label');
      var _checkAll = $(this).find('.checkAll');

      _optionCheck.click(function(){
         if($(this).parent().is(_checkAll)){
           if (_checkAll.hasClass('checked')) {
            _optionLabel.removeClass('checked');
           } else {
             _optionLabel.addClass('checked');
           }
         } else {
           $(this).parent('label').toggleClass('checked');
           _checkAll.removeClass('checked');
         }
      });
    })

    // checking List2: .checkAll 和其他勾選項目（.listCheck）不在同一個父物件中
    var _checkList2 = $('.checkingList');
    _checkList2.each(function(){
      var _checkAll = $(this).find('.checkAll').find('input');
      var _checkInput = $(this).find('.listCheck').find('input');

      _checkInput.click(function(){
        $(this).parent().toggleClass('checked');
        _checkAll.parent().removeClass('checked');
      });
      _checkAll.click(function(){
        var _checkAllLabel = $(this).parent();
        if(_checkAllLabel.hasClass('checked')){
          _checkInput.parent().add(_checkAllLabel).removeClass('checked');
        } else {
          _checkInput.parent().add(_checkAllLabel).addClass('checked');
        }
      })
    })


    //單一個 checkbox
   var _aloneCheck = $('.aloneCheck').find('input[type="checkbox"]');
   _aloneCheck.filter(':checked').parent('label').addClass('checked');
   _aloneCheck.filter(':disabled').parent('label').addClass('disabled');
    // _aloneCheck.each(function(){
    //   if($(this).is( ':checked' )){
    //     $(this).parent('label').addClass('checked');
    //   }
    //   if($(this).attr('disabled')){
    //     $(this).parent('label').addClass('disabled');
    //   }
    // })
    _aloneCheck.click(function(){
      $(this).parent('label').toggleClass('checked');
    })

    //單選 radio , 在每個 tr 或 li
    var _inputRadio = $('.listRadio').find('input[type="radio"]');
    _inputRadio.filter(':checked').parent('label').addClass('checked');

    _inputRadio.click(function(){
      _inputRadio.parent('label').removeClass('checked');
      $(this).parent('label').toggleClass('checked');
    })


    // 像表格的 ul li 
  var _applyList = $('.applyList');
  _applyList.each(function () {
    var _headli = $(this).find('.head');
    var _li = $(this).find('li');
    var liCount = _li.length;
    for (var n = 1; n <= liCount; n++) {
      _headli.find('span').each(function(index){
        var headText = $(this).text();
        _li.eq(n).find('span').eq(index).attr('data-title', headText);
      })
    }
  });



  
  

  // --------------------------------------------------- 模擬下拉選單 selectImitating
  $('.selectImitating').each(function(){
    var _selectImitating = $(this);
    var _selectBtn = _selectImitating.find('.selectBtn');
    var _optionGroup = _selectImitating.find('.optionGroup');
    var _option = _optionGroup.find('input[type="checkbox"]');

    _selectBtn.click(function(){
      if(_optionGroup.is(':visible')){
        _optionGroup.slideUp(800);
      } else {
        _optionGroup.slideDown(800);
      }
    })
    _selectImitating.parents('.toggleDrawer').find('.btnDv').find('input').click(function(){
      _optionGroup.slideUp();
    });
    
    _option.click(function(){
      if($(this).parent().hasClass('checked')){
        $(this).parent().removeClass('checked');
        var a = selectedType.indexOf($(this).parent().text());
        selectedType.splice(a, 1);
        _selectBtn.text( selectedType.toString() );
      } else {
        $(this).parent().addClass('checked');
        selectedType.push($(this).parent().text());
        _selectBtn.text( selectedType.toString() );
      }
      if (selectedType.length == 0) {
        _selectBtn.text('select type');
      }

    })

  })

  // --------------------------------------------------- 彈出訊息
  var _popMsg = $('.popMsg')
  _popMsg.each(function(){
    var _this = $(this);
    var _closePop = _this.find('.closePop');

    // 20201124: 不可以 click 遮罩，必須 click .popMsg 裡面的 button 
    // _closePop.add(_coverAll).click(function(){ 20201124 刪除此行，修改如下
    _closePop.click(function(){
      _this.add(_coverAll).fadeOut(200);
    })

  })
  // --------------------------------------------------- 開啟彈出訊息
  $('.trigPop').click(function(){
    try {
      // debugger;
      var openWhich = $(this).attr('id').slice(4);
      _popMsg.filter('#'+openWhich).add(_coverAll).fadeIn(200);
      if ($(this).is('input[type="submit"]')){
        // debugger;
        $(this).parents('.popMsg').fadeOut(200);
      }
    } catch (e) {
    }
  })

  // ---------------------------------------------------顯示回饋訊息
  var _showReact = $('.showReact');
  var _reactMsg = $('.reactMsg');
  var _inThisTr = _reactMsg.parent().parent();
  _showReact.click(function(){
    _reactMsg.css('display','block');
    _inThisTr.addClass('hilight');
    $('.hiddenFieldRow.hilight').removeAttr('style').siblings('.hiddenFieldRow').removeAttr('style');
    $('.rowSwitch').addClass('closeIt');
    _body.stop(true,false).animate({scrollTop:_inThisTr.first().offset().top - hh}, 600);
  })





  // ---------------------------------------------------filterBy 單一過濾條件
  var _filterBy = $('.filterBy');
  _filterBy.each(function(){
    var _filter = $(this);
    var _filterByThis = _filter.find('li');
    _filterByThis.click(function(){
      _filterByThis.removeClass('now');
      $(this).addClass('now');
    })


  })


  // --------------------------------------------------- 追蹤產品簡介 feature of favorite-pruduct-list
  var _pdList = $('.pdList');
  var _pdItem = _pdList.children('ul').children('li');
  var  _pdFeature = _pdItem.find('.feature');
  var  pdFeatureMinH = '2.9em';
  var  pdFeatureRealH = [];
  var  rmTxt1 = 'more';
  var  rmTxt2 = ' less';

  _pdFeature.prepend('<span class="readMore">'+rmTxt1+'</span>');
  var _readMore = _pdItem.find('.readMore');

  getpdFeatureHeight();
  function getpdFeatureHeight(){//取得產品描述的高度
    _pdFeature.removeClass('min').removeAttr('style');
    pdFeatureRealH.length = 0;
    _pdItem.each(function(){
      pdFeatureRealH.push($(this).find('.feature').innerHeight());
    });
    _pdFeature.addClass('min').css('height', pdFeatureMinH);
  }

  _pdFeature.click(function(){
    if($(this).hasClass('min')){
      $(this).removeClass('min').stop(true,false).animate({
        'height': pdFeatureRealH[$(this).parent('ul').parent('li').index()]
      });
        $(this).find(_readMore).text(rmTxt2);
    } else {
      $(this).addClass('min').stop(true,false).animate({'height':pdFeatureMinH});
      $(this).find(_readMore).text(rmTxt1);
    }
  });


  // --------------------------------------------------- ellipsis項目，hover可展開完整內容
  var _extList = $('.briefInfo.extensible');
  var itemMinH = '1.4em';
  briefExpand();
  function briefExpand() {
    _extList.each(function(){
      var _extItem = $(this).find('li');
      var itemxH = [];
      
      _extItem.removeAttr('style').removeClass('ellipsis').each(function(){
        itemxH.push($(this).height());
      });
    
      _extItem.addClass('ellipsis').css('height', itemMinH);
    
      _extItem.hover(function() {
        $(this).stop(true, false).animate({ 'height': itemxH[$(this).index()] }, 300, 'linear');
      }, function() {
          $(this).stop(true, false).animate({ 'height': itemMinH }, 300, 'linear');
      });
    })
  }

  


  // ---------------------------------------------------Product Requested 下拉選單模擬
  var _pdRequest = $('.pdRequest');
  var _sugList = _pdRequest.next('.sugList');

  _pdRequest.parents('.formRow').css('position', 'relative');
  _pdRequest.click(function () {
    if (_sugList.is(':visible')) {
      _sugList.slideUp(300);
    } else {
      _sugList.slideDown(300, function () {
        $(this).css('overflow-y', 'scroll');
      });
    }
  });
  _sugList.find('li').click(function () {
    _pdRequest.val($(this).text());
    _sugList.slideUp(300);
  });

  $(document).on('touchend click', function (e) {
    var target = e.target;
    if (!$(target).is(_sugList) && !$(target).is(_pdRequest)) {
      _sugList.slideUp(300);
    }
  });








  // --------------------------------------
  // window resize
  var winResizeTimer1;
  _window.resize(function(){
    clearTimeout(winResizeTimer1);
    winResizeTimer1 = setTimeout(function(){
      getpdFeatureHeight(); //重新取得產品描述的高度
      // 20200804 getExpansileNewHeight(); // 重新取得說明文字的高度
      briefExpand();
    }, 300);
  });



// ------------------------------頁籤
  tabSet();
  function tabSet(){
    $('.tabset').each(function(){
  
      var _tabset = $(this),
          _tabItem = _tabset.find('.tabItem'),
          _tabContent = _tabset.find('.tabContent'),
          tabwidth = _tabset.width(),
          tabItemHeight = _tabItem.outerHeight(true),
          tabContentHeight = _tabset.find('.active').next().innerHeight();
          tabItemLength = _tabItem.length,
          tabItemWidth = tabwidth / tabItemLength,
          paddingTop = 35;

      _tabset.css('padding-top', paddingTop);
      _tabset.find('.active').next('.tabContent').show();
      _tabContent.css('top' , tabItemHeight+paddingTop);
      _tabset.height(tabContentHeight + tabItemHeight + paddingTop*3);

      _tabItem.click(tabs);
    
      function tabs(){
        var	_tabItemNow = $(this);
  
        _tabItem.removeClass('active');
        _tabContent.hide();
        _tabItemNow.addClass('active').next().show();

        _tabset.height(_tabItemNow.next().innerHeight() + tabItemHeight);
  
       }
       
    });
  }

  // ------------------------------另一組頁籤
  var _tabGroup = $('.tabGroup');
  _tabGroup.each(function(){
    var _this = $(this);
    var _tabItem = _this.find('.tabItems').find('li');
    var _tabContent = _this.find('.tabContent');
    var _tabHead = _this.find('.tabHead');
    var _tabBody = _this.find('.tabBody');
    var i = 0;
    var speed = 500;
    
    // 行動版預設顯示
    _tabHead.eq(i).addClass('active');
    _tabBody.eq(i).show();
    // 電腦版預設顯示
    _tabItem.eq(i).addClass('active');
    _tabContent.eq(i).show().addClass('show');

    // 行動版
    _tabHead.click(function(){
      var _thisHead = $(this);
      var _thisBody = _thisHead.next();
      i = _thisHead.parent().index();
      if(_thisBody.is(':visible')){
        _thisBody.slideUp(speed, function(){
          _thisHead.removeClass('active');
          $(this).removeAttr('style');
        });
      } else {
        _thisBody.slideDown(speed, function(){
          _thisHead.addClass('active');
          $(this).removeAttr('style');
        });
        _tabBody.not(_thisBody).slideUp(function () {
          $(this).prev().removeClass('active');
        });
        _tabItem.eq(i).addClass('active').siblings().removeClass('active');
        _tabContent.eq(i).addClass('show').siblings().removeClass('show');
      }
    })

    // 電腦版
    _tabItem.click(function(){
      i = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      _tabContent.eq(i).show().addClass('show').siblings().hide().removeClass('show');
      _tabHead.removeClass('active').eq(i).addClass('active');
    })
  })


	//------------------------------ 產品照片切換
	$('.pdPhotoSwitch').each(function(){
		var _pdPhotoSwitch = $(this),
				_showItem = _pdPhotoSwitch.find('.showbox').find('li'),
				_dots = '',
				phCount = _showItem.length;

		if(phCount>1){
			$('<ul class="indicator"></ul>').appendTo(_pdPhotoSwitch);
			for(i=0; i<phCount; i++){ _dots = _dots + '<li></li>'; }
			_pdPhotoSwitch.find('.indicator').append(_dots).find('li').first().addClass('showing');
			_showItem.hide().first().show();

			var _indicator = _pdPhotoSwitch.find('.indicator').find('li');

			_indicator.click(function(){
				var ix = $(this).index();
				$(this).addClass('showing').siblings().removeClass('showing');
				_showItem.fadeOut(600).eq(ix).fadeIn(600);
			});
		}
	});



  
  // ------------------------------ 置底的區塊
  var _fixBottom = $('.fixBottom');
  var scrollDis = _main.height() - wh;

	_window.scroll(function() {

		if ( $(this).scrollTop() > scrollDis ) {
			_fixBottom.removeClass('fixed');
		} else {
      _fixBottom.addClass('fixed');
		}
  });

  // ------------------------------ 條列表格 th 排序箭頭圖示
  _thSorting = $('.sortByTh')
  _thSorting.each(function(){
    var _this = $(this);
    _this.click(function(){
      _thSorting.removeClass('activated');
      $(this).addClass('activated');
      $(this).toggleClass('ascend');
    })
  })

  // ------------------------------ 燈箱
  lightbox();
	function lightbox(){ 

		var _lightbox = $('.lightbox'),
				_showLightbox = $('.showLightbox'),
				_hideLightbox = _lightbox.find('.closeThis');

		_showLightbox.click(function(){
      var lbxid = '#' + $(this).attr('data-id');
			_lightbox.filter($(lbxid)).show();
			//_coverAll.fadeIn(300); //20201124 刪除，修改如下
			_coverAll.show().addClass('for_lbx');
		});

    // 20201124 刪除
		// _coverAll.click(function(){
		// 	_lightbox.hide(); 
		// 	$(this).fadeOut(300);
    // });
    // 修改如下
		_coverAll.click(function(){
      if($(this).hasClass('for_lbx')){
        _lightbox.hide(); 
        $(this).fadeOut(300);
      }
    });

		_hideLightbox.click(function(){
      if($(this).parents('.lightbox').hasClass('nationsOpt')){
        $('.nationsOpt').scrollTop(0);
      }
      $(this).parents('.lightbox').hide();
      // _coverAll.fadeOut(300);  20201124 刪除，修改如下
			_coverAll.fadeOut(300).removeClass('for_lbx');
		});

  }

  // 燈箱中的 go top
  var _backToNav = $('.lightbox').find('.backToNav');
  var _scrollLightbox = _backToNav.parents('.lightbox');
  _backToNav.click(function(){
    $(this).parents('.lightbox').stop(true,false).animate({scrollTop: 0}, 600);
  });
  _scrollLightbox.scroll(function(){
    if($(this).scrollTop() > 300 ){
      _backToNav.fadeIn(200);
    } else {
      _backToNav.stop().fadeOut(200);
    }
  });

  // ------------------------------ 國家選單燈箱，「大洲」錨點的平滑捲動
  var _nationsOpt = $('.lightbox.nationsOpt');
  var _areaNavli = _nationsOpt.find('.areaNav>ul>li>a');
  var _areaTarget = _nationsOpt.find('.ms-options>ul>li');
  var navHeight = 60;
	function getOffsetTop(){
    areaTargetOffsetTop = [];
    // navHeight = _nationsOpt.find('.areaNav').innerHeight() + 60;
		_areaTarget.each(function(){
			areaTargetOffsetTop.push($(this).offset().top - navHeight);
    });
	}
  getOffsetTop();
  _areaNavli.click(function(e){
    var i = $(this).parent('li').index();
    _nationsOpt.stop(true,false).animate({scrollTop:areaTargetOffsetTop[i]}, 800);
    e.preventDefault();
  });
  $('#nationsOpt').click(getOffsetTop);
  



  // ----------------------------- 固定「目前聯絡的公司」資訊區
  var _threads = $('.threads');
  var _companyNow = _threads.find('.thisCompanyNow');
  var compHeight = _companyNow.innerHeight()*.25;
  // 20191220 .thisCompanyNow 也要能 hover 頭像顯示 infoCard
  var _thisCompInfoCard = _threads.find('.infoCard.ofThisComp');
  var _thisCompAvatar = _companyNow.children('.avatar');

  fixThisCompanyNow();

  function fixThisCompanyNow(){
    var xddTop = $('.navBtnsDv').outerHeight(true) + $('.pageHeading').outerHeight(true) + compHeight;

    _window.scroll(function(){
      if($(this).scrollTop() > xddTop ){
        _companyNow.addClass('fixed');
        _threads.css('padding-top', compHeight );
      } else {
        _companyNow.removeClass('fixed');
        _threads.removeAttr('style');
      }  
    });
  }
  // 捲動到未讀訊息 ***** 20200203 修改
  var _unReadMarker = _threads.find('#marker_new');
  if(  _body.find(_threads).length >= 1 && _unReadMarker.length > 0 
  && _threads.children('ul').children('li').not('.marker').length > 1 
  ){
    var unReadMarkerOffsetTop = _unReadMarker.offset().top - hh - _companyNow.innerHeight();
    _body.stop(true,false).animate({scrollTop: unReadMarkerOffsetTop}, 800, function(){
      if( _companyNow.hasClass('fixed')){
        _body.stop(true,false).animate({scrollTop: unReadMarkerOffsetTop - _companyNow.innerHeight()}, 600)
      }
    });
  }


  // alert on/off (啟動／關閉 供應商訊息通知圖示)
  var _alertThis = $('.alertThis').not('.disabled');
  _alertThis.click(function() {
    $(this).toggleClass('off');    
  })


  // ------------------------------頭像背景色
  var colorAvatar = $('.avatar');
  colorAvatar.each(function(){
    var letter = $(this).text();
    $(this).addClass(letter);
    if(letter !== ''){
      $(this).css('background-image', 'none');
    }
  })


  // ------------------------------hover 頭像開啟 infoCard
  var _eachCompany =  $('.threadList>ul>li').not('.onTop');
  var _infoAvatar = _eachCompany.children('.avatar');
  var _relInfoCard = _eachCompany.find('.infoCard');
  _relInfoCard.add(_thisCompInfoCard).prepend('<button type="button" title="close" class="closeThis"></button>');
  var _closeInfoCard = _relInfoCard.add(_thisCompInfoCard).find('.closeThis');

  function infoCardShowHide() {
    // _relInfoCard.add(_thisCompInfoCard).removeAttr('style');
    if (ww < wwWide) {
      _infoAvatar.click(function () {
        $(this).siblings(_relInfoCard).fadeIn(200).find('.closeThis').show();
        _coverAll.fadeIn(200);
      });
      _thisCompAvatar.click(function () {
        _thisCompInfoCard.fadeIn(200);
        _coverAll.fadeIn(200);
      });
      _closeInfoCard.add(_coverAll).click(function () {
        _relInfoCard.add(_coverAll).hide();
        _thisCompInfoCard.add(_coverAll).hide();
        $('this').hide();
      })
    } else {
      _infoAvatar.mouseenter(function(){
        $(_relInfoCard).hide();
        $(this).siblings(_relInfoCard).fadeIn(200);
      });
      _relInfoCard.mouseleave(function(){$(this).fadeOut(400)});
      _eachCompany.mouseleave(function(){$(this).find(_relInfoCard).fadeOut(400)});
      
      _thisCompAvatar.mouseenter(
        function(){_thisCompInfoCard.fadeIn(200);}
      );
      _thisCompInfoCard.mouseleave(
        function(){_thisCompInfoCard.fadeOut(400);}
      );
    }
  }
  infoCardShowHide();
  
  // ------------------------------固定於頁面下方的訊息輸入區(My Inquiries)
  var _replyDrawer = $('.replyDrawer');
  var _drawCtrl = _replyDrawer.find('.ctrl');
  var _replyArea = _replyDrawer.find('.replyHere');
  var _reSubject = _replyDrawer.find('.reSubject');
  var _textContainer = _reSubject.find('.textContainer');
  var _replyThis = _threads.find('.replyThis');
  var _clearSubject = _reSubject.find('.clearSubject')

  _replyThis.click(function(){//  按回覆圖示
    _reSubject.show();
    _textContainer.text($(this).prev('.talkingBox').find('p').text());
    _replyArea.slideDown();
    _drawCtrl.addClass('closeIt').parent().addClass('full');
  })
  _clearSubject.click(function(){
    _reSubject.hide();
  })

  _drawCtrl.click(function(){
    if(_replyArea.is(':hidden')){
      _replyArea.slideDown();
      $(this).addClass('closeIt').parent().addClass('full');
    } else {
      _replyArea.slideUp();
      $(this).removeClass('closeIt').parent().removeClass('full');
    }
  })
  // _replyDrawer.find('.btnDv').find('input').click(function(){
  //   _replyArea.slideUp();
  //   _reSubject.hide();
  //   _drawCtrl.removeClass('closeIt').parent().removeClass('full');
  // })



// -------------------------------------------------------------- 2020
// ------------------------------企業網公司資料設定編輯區收合效果
var _expFolder = $('.expFolder');
var _expCtrl = _expFolder.find('.expCtrl');
var _expAll = $('.expAll');
var expSpeed = 600;

_expCtrl.filter('.reveal').next().show();

_expCtrl.click(function(){
  if($(this).hasClass('reveal')){
    $(this).removeClass('reveal').next().stop(true, false).slideUp(expSpeed);
  } else {
    $(this).addClass('reveal').next().stop(true, false).slideDown(expSpeed);
  }
})

_expAll.click(function(){
  if ($(this).hasClass('allRevealed')){
    $(this).removeClass('allRevealed');
    $(this).nextAll(_expFolder).find(_expCtrl).removeClass('reveal').next().stop(true, false).slideUp(expSpeed);
  } else {
    $(this).addClass('allRevealed');
    $(this).nextAll(_expFolder).find(_expCtrl).addClass('reveal').next().stop(true, false).slideDown(expSpeed);
  }
})

// ------------------------------ 語言選單 .langTab
var _langTab = $('.langTab');
var _whichLang = _langTab.find('li').not('.moreLang');
var _moreLang = _langTab.find('.moreLang');
var _moreLangList = _moreLang.find('ul');
_moreLang.children('a').append('<span class="langNow"></span>');
_moreLang.hover(
  function(){_moreLangList.stop(true, false).slideDown(300)},
  function(){_moreLangList.stop(true, false).slideUp()}
)
_whichLang.click(function(){
  _whichLang.add(_moreLang).removeClass('active');
  $(this).addClass('active');
  _moreLang.find('.langNow').text('');
});
_moreLangList.find('li').click(function(){
  _moreLang.find('.langNow').text('：'+ $(this).text());
  _moreLang.addClass('active');
})

// ------------------------------ 分類、群組，可修改刪除
var _classify = $('.classify');
_classify.each(function(){
  var _classItem =  $(this).find('li').not('.addNew');
  var _className = _classItem.children('a');
  var _moreFuncCtrl = _classItem.find('.moreFunc');
  var _modifyThisClass = _classItem.find('.action')

  _classItem.has('.moreFunc').addClass('hasMoreFunc');
  
  _className.click(function(){
    $(this).parent().addClass('active').siblings().removeClass('active');
    _classItem.find('.action').hide();
  })
  
  _moreFuncCtrl.click(function(){
    if($(this).siblings(_modifyThisClass).is(':hidden')){
      $(this).siblings(_modifyThisClass).show();
    } else {
      _modifyThisClass.hide();
    }
  })
  _modifyThisClass.find('li').click(function(){
    $(this).parent(_modifyThisClass).hide();
  })
})

// ------------------------------ 改變排列順序，上、下移動
var _orderShift = $('.orderShift');
_orderShift.each(function(){
  var _orderItem = $(this).children('ul, ol').children('li');
  var _orderUp = _orderItem.find('.up');
  var _orderDown = _orderItem.find('.down');
  // var _remove = _orderItem.find('.removeThis');
  // var _restore = _orderItem.find('.restore');

  _orderUp.click(function(){
    var _changeItem =  _orderItem.has($(this));
    _changeItem.prev().insertAfter(_changeItem);
  })
  _orderDown.click(function(){
    var _changeItem =  _orderItem.has($(this));
    _changeItem.insertAfter(_changeItem.next());
  })

})


// ------------------------------ 移除圖片
var _changeImage = $('.image').has('.removeThis');
//console.log(_changeImage);
_changeImage.each(function(){
  var _this = $(this);
  var _removeBtn = _this.find('.removeThis');
  var _buttons = _this.siblings('.buttons');
  var _restoreBtn = _buttons.find('.restore');
  _removeBtn.click(function(){
    _this.hide();
    _buttons.show();
  })
  _restoreBtn.click(function() {
    _this.show();
    _buttons.hide();
  })
})



// ----------------------------------------------- 滿版大橫幅輪播 2020
var _bigBanner = $('.bigBanner');
_bigBanner.each(function(){
  var _this = $(this);
  var _showArea = _this.find('.showArea');
  var _slideList = _showArea.find('.slideList');
  var _slideItem = _slideList.children('li');
  var showWidth = _slideItem.width();
  var count = _slideItem.length;
  var _btnRight = _this.find('.arrowRight');
  var _btnLeft = _this.find('.arrowLeft');
  var _dots = '';
  var speed = 800;
  var timer = 4000;
  var i = 0;

  _slideList.width(showWidth * count).css('left', -1*showWidth);
  _slideItem.eq(count - 1).prependTo(_slideList);

  // 產生 indicator 點點
  _this.append('<div class="indicator"><ul></ul></div>');
  for(var n=0; n<count; n++){
    _dots = _dots +'<li></li>';
  };

  _this.find('.indicator>ul').append(_dots);
  var _indicator = _this.find('.indicator').find('li');
  _indicator.eq(i).addClass('now');

  // 20200908 移除點點跑動效果
  // _this.find('.indicator>ul').append(_dots).append('<li class="runningDot"></li>');// 加移動的點點
  // var _runningDot = _this.find('.runningDot'); // 移動的點點
  // var _indicator = _this.find('.indicator').find('li').not('.runningDot');
  // var iniX = _indicator.eq(0).position().left; //第一個點的X座標
  // var dx = _indicator.eq(1).position().left - iniX; // 取得 indicator 間距
  // var dotD = _indicator.width(); //取得 indicator 直徑
  
  // // 移動的點點起始位置
  // _runningDot.css({ left: iniX, top: _indicator.eq(0).position().top });


  var winResizeTimer1;
  _window.resize(function(){
    clearTimeout(winResizeTimer1);
    winResizeTimer1 = setTimeout(function(){
      showWidth = _showArea.width();
      _slideList.width(showWidth * count).css('left', -1*showWidth);
    }, 200)
  })

  // click 向右箭頭
  _btnRight.click(function(){slideForward();})

  // click 向左箭頭
  _btnLeft.click(function(){slideBackward();})

  // 左右滑動
  _showArea.swipe({
    swipeRight:function() {slideBackward();},
    swipeLeft:function() {slideForward();},
    threshold:20
  })


  function slideForward(){
    var prevItem = _slideItem.eq((i-1)%count);
    _slideList.stop(true, false).animate({left: -2 * showWidth}, speed, function(){
      $(this).css('left', -1*showWidth);
      prevItem.appendTo(_slideList);
    });
    i = (i+1)%count;
    _indicator.removeClass('now').eq(i).addClass('now');
    // if( i == 0 ){
    //   _runningDot.stop(true, false).animate({'left': iniX}, speed);
    // } else {
    //   _runningDot.stop(true, false).animate({width: dx+dotD}, speed/2, function(){
    //     $(this).stop(true, false).animate({width: dotD, 'margin-left': dx}, speed/2, function(){ 
    //       $(this).css({'margin-left': 0, 'left': _indicator.eq(i).position().left});
    //     });
    //   });
    // }
  }

  function slideBackward(){
    var prevPreItem = _slideItem.eq((i-2)%count);
    prevPreItem.prependTo(_slideList);
    _slideList.css('left' , -2*showWidth);
    _slideList.stop(true, false).animate({left: -1 * showWidth}, speed, function(){
    });
    i = (i-1)%count;
    _indicator.removeClass('now').eq(i).addClass('now');
    // if( i == -1 ){
    //   _runningDot.stop(true, false).animate({'left': iniX + dx*(count-1)}, speed)
    // } else {
    //   _runningDot.stop(true, false).animate({width: dx+dotD, 'margin-left': -1*dx}, speed/2, function(){
    //     $(this).stop(true, false).animate({width: dotD}, speed/2, function(){ 
    //      $(this).css({'margin-left': 0, 'left': _indicator.eq(i).position().left});
    //     });
    //   });
    // }
  }

  var tt = setInterval(slideForward, timer);
  _this.hover(
    function(){clearInterval(tt);},
    function(){tt = setInterval(slideForward, timer);}
  );

});



  // --------幫所有.slide 加上左右箭頭，包裹 div.slideArea ＊＊＊ ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  var _clickAndSlide = $('.ckSlide');
  _clickAndSlide.each(function(){
    $(this).find('.list').wrap('<div class="slideArea"></div>');
    $(this).append('<span class="arrowLeft"></span><span class="arrowRight"></span>');
  })

  
  //  ----------------------------------------------- 訊息左右滑動（非自動輪播）2020
  _newsBkSlide = $('.newsBlock.ckSlide');
  _newsBkSlide.each(function(){
    var _this = $(this);
    var _slideArea = _this.find('.slideArea');
    var _slideList = _slideArea.find('.list');
    var _slideItem = _slideList.children('li');
    var slideDistance = _slideItem.outerWidth(true);
    var slideCount = _slideItem.length;
    var _btnRight = _this.find('.arrowRight');
    var _btnLeft = _this.find('.arrowLeft');
    var speed = 800;
    var i = 0;
    var j;
    var _dots = '';



    // 計算單一項目的寬度和所有項目總寬度
    _slideList.width(slideDistance * slideCount);



    // 產生 indicator
    _slideArea.after('<div class="indicator"><ul></ul></div>');
    var _indicator =   _this.find('.indicator>ul');
    for(var n=0; n<slideCount; n++){
      _dots = _dots + '<li></li>';
    };
    _indicator.append(_dots);
    var _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass('now');

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady(){
      var ww = _window.width();
      _indicatItem.removeClass('now');
      _indicatItem.eq(i).addClass('now');
      if(ww >= wwMedium){
        _indicatItem.eq((i+1)%slideCount).addClass('now');
      }
      if(ww >= wwWide){
        _indicatItem.eq((i+2)%slideCount).addClass('now');
      }
    }

    function slideForward(){
      _slideList.stop(true,false).animate({'margin-left': -1*slideDistance }, speed, function(){
        j = (i+1)%slideCount;
        _slideItem.eq(i).appendTo(_slideList);
        _indicatItem.eq(i).removeClass('now');
        _indicatItem.eq(j).addClass('now');
        _slideList.css('margin-left', 0);

        if(ww >= wwMedium){
          _indicatItem.eq((j+1)%slideCount).addClass('now');
        }
        if(ww >= wwWide){
          _indicatItem.eq((j+2)%slideCount).addClass('now');
        }
        i = j;
      })
    }

    function slideBackward(){
      j = (i-1)%slideCount;
      _slideItem.eq(j).prependTo(_slideList);
      _slideList.css('margin-left' , -1*slideDistance);

      _slideList.stop(true,false).animate({'margin-left': 0 }, speed, function() {
        // _slideItem.eq(i).removeClass('now');
        _indicatItem.eq(j).addClass('now');
        if(ww >= wwWide){
          _indicatItem.eq((i+2)%slideCount).removeClass('now');
        } else if(ww >= wwMedium){
          _indicatItem.eq((i+1)%slideCount).removeClass('now');
        } else {
          _indicatItem.eq(i).removeClass('now');
        }
        i=j;
      })
    }

    // 點擊向右箭頭
    _btnRight.click(function(){slideForward();})

    // 點擊向左箭頭
    _btnLeft.click(function(){slideBackward();})

    // 左右滑動
    _slideArea.swipe({
      swipeRight:function() {slideBackward();},
      swipeLeft:function() {slideForward();},
      threshold:20
    })

    var winResizeTimer3;
    _window.resize(function(){
      clearTimeout(winResizeTimer3);
      winResizeTimer3 = setTimeout(function(){
        slideDistance = _slideItem.outerWidth(true);
        _slideList.width(slideDistance * slideCount);
        indicatReady();
      }, 220)
    })
    
  })


  // ----------------------------------------------- 產品照片和資訊橫向排列 2020
  _oneXtwoSlide = $('.oneXtwo.ckSlide');
  _oneXtwoSlide.each(function(){
    var _this = $(this);
    var _slideArea = _this.find('.slideArea');
    var _slideList = _this.find('.list');
    var _slideItem = _slideList.children('li');
    var slideDistance = _slideItem.outerWidth(true);
    var slideCount = _slideItem.length;
    var _btnRight = _this.find('.arrowRight');
    var _btnLeft = _this.find('.arrowLeft');
    var speed = 800;
    var i = 0;
    var j;
    var _dots = '';

    // 產生 indicator
    _slideArea.after('<div class="indicator"><ul></ul></div>');
    var _indicator =   _this.find('.indicator>ul');
    for(var n=0; n<slideCount; n++){
      _dots = _dots + '<li></li>';
    };
    _indicator.append(_dots);
    var _indicatItem = _indicator.find('li');
    // _indicatItem.eq(i).addClass('now');

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady(){
      var ww = _window.width();
      _indicatItem.removeClass('now');
      _indicatItem.eq(i).addClass('now');
      if(ww >= wwWide){
        _indicatItem.eq((i+1)%slideCount).addClass('now');
      }
    }

    function slideForward(){
      _slideList.stop(true,false).animate({'margin-left': -1*slideDistance }, speed, function(){
        j = (i+1)%slideCount;
        _slideItem.eq(i).appendTo(_slideList);
        _indicatItem.eq(i).removeClass('now');
        // _slideItem.eq(j).add(_indicatItem.eq(j)).addClass('now');
        _indicatItem.eq(j).addClass('now');
        _slideList.css('margin-left', 0);

        if(ww >= wwWide){
          _indicatItem.eq((j+1)%slideCount).addClass('now');
        }
        i = j;
      })
    }

    function slideBackward(){
      j = (i-1)%slideCount;
      _slideItem.eq(j).prependTo(_slideList);
      _slideList.css('margin-left' , -1*slideDistance);

      _slideList.stop(true,false).animate({'margin-left': 0 }, speed, function() {
        // _slideItem.eq(i).removeClass('now');
        // _slideItem.eq(j).add(_indicatItem.eq(j)).addClass('now');
        _indicatItem.eq(j).addClass('now');
        if(ww >= wwWide){
          _indicatItem.eq((i+1)%slideCount).removeClass('now');
        } else {
          _indicatItem.eq(i).removeClass('now');
        }
        i=j;
      })
    }


    // 點擊向右箭頭
    _btnRight.click(function(){
      slideForward();
    })


    // 點擊向左箭頭
    _btnLeft.click(function(){
      slideBackward();
    })

    // 左右滑動
    _slideArea.swipe({
      swipeRight:function() {slideBackward();},
      swipeLeft:function() {slideForward();},
       threshold:20
    })




    var winResizeTimer4;
    _window.resize(function(){
      clearTimeout(winResizeTimer4);
      winResizeTimer4 = setTimeout(function(){
        slideDistance = _slideItem.outerWidth(true);
        // ww = _window.width();
        indicatReady();
      }, 230)
    })

  })

  // ------------------------------------------------ 切換燈箱內產品的 360, 3D, video 顯示區
  var _panoramaLightbox = $('.lightbox.panorama');
  _panoramaLightbox.each(function(){
    var _this = $(this);
    var _productShow = _this.find('.productShow');
    var _pdShowing = _productShow.find('iframe');
    var pdCount = _pdShowing.length;
    var li = '';
    var _pdIndicator;
    if(pdCount > 1){
      _productShow.append('<ul class="dots"></ul>');
      for(i = 0; i < pdCount; i++){
        li = li + '<li></li>';
      }
      _productShow.find('.dots').append(li);
      _pdIndicator = _productShow.find('.dots').find('li');
      _pdIndicator.eq(0).addClass('current');
      _pdShowing.hide().eq(0).show();

      _pdIndicator.click(function(){
        var pdIndex = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        _pdShowing.hide().eq(pdIndex).show();
      });
    }
  })

  // ------------------------------------------------過濾和排序 toggleSlide 2020
  var _displayOptions = $('.displayOptions');
  _displayOptions.each(function(){
    var _hiddenOptions = $(this).find('.toggleSlide');
    var _toggleCtrl = $(this).find('.toggleCtrl');
    _toggleCtrl.click(function(){
      $(this).toggleClass('closeIt');
      _hiddenOptions.slideToggle();
    })
  })


  // ------------------------------------------------通用 toggleSlide 2020
  var _toggleSlide = $('.toggleSlide');
  _toggleSlide.each(function(){
    var _toggleCtrl = $(this).find('.toggleCtrl');
    // _toggleCtrl.append('<span class="realCtrl"></span>');
    
    _toggleCtrl.click(function(){
      var _toggleArea = $(this).next('.toggleArea');
      if( _toggleArea.is(':visible') ){
        _toggleArea.slideUp(400, function(){
          $(this).prev(_toggleCtrl).removeClass('closeIt');
        });
        
      } else {
        _toggleArea.slideDown(400, function(){
          $(this).prev(_toggleCtrl).addClass('closeIt');
        });
      }


    })
  })



  // ------------------------------------------------.displayMode 切換產品列表顯示模式 2020
  var _displayMode = $('.displayMode');
  var _exchangeView = $('.exchangeView');
  _displayMode.each(function(){
    $(this).append('<span class="invisibleCtrl"></span>');
    var _invisibleCtrl = $(this).find('.invisibleCtrl')
    var _modeIcon = $(this).find('li').not('.invisibleCtrl');
    _invisibleCtrl.click(function(){
      _modeIcon.toggleClass('now');
      _exchangeView.toggleClass('stack');
    })
    _modeIcon.click(function(){
      _modeIcon.removeClass('now');
      $(this).addClass('now');
      if ($(this).hasClass('stack')){
        _exchangeView.addClass('stack');
      } else {
        _exchangeView.removeClass('stack');
      }
    })
  })

  // ------------------------------------------------ 放入購物車，加入喜愛項目圖示樣式切換 2020
  var _action = $('.addTo');
  _action.each(function(){
    var _item = $(this).find('li');
    _item.click(function(){
      $(this).toggleClass('active');
    })
  })


  // ------------------------------------------------ 顯示局部，可展開的文字區 2020
  // 20201230 修改
  var _expansible = $('.expansible');
  _expansible.each( function(){
    var _this = $(this);
    var _ctrl = _this.find('.more, .readAll');
    var hFull;
    var hPartial = _this.height();
    var textLess = _ctrl.attr('data-altText');
    var textMore = _ctrl.text();

    _this.wrapInner('<div class="innerPart"></div>');
    hFull = _this.find('.innerPart').innerHeight();

    if(hFull - 30 <= hPartial){
      _this.addClass('revealAll');
      _ctrl.hide();
    }

    _ctrl.click(function(){
      hFull = _this.find('.innerPart').innerHeight();
      if(_this.hasClass('revealAll')){
        _this.animate({height: hPartial}, 500, function(){
          _this.removeClass('revealAll');
          _ctrl.text(textMore);
        })
      } else {
        _this.animate({height: hFull}, 500, function(){
          _this.addClass('revealAll');
          _ctrl.text(textLess);
        })
      }
    });

    var winResizeTimer1;
    _window.resize(function(){
      clearTimeout(winResizeTimer1);
      winResizeTimer1 = setTimeout(function(){
        hFull = _this.find('.innerPart').innerHeight();
        if(_this.hasClass('revealAll')){
          _this.css('height', hFull);
        } else {
          _this.removeAttr('style');
          hPartial = _this.height();
        }
        if(hFull - 30 <= hPartial){
          _this.addClass('revealAll');
          _ctrl.hide();
        } else {
          _this.removeClass('revealAll').removeAttr('style');
          _ctrl.show().text(textMore);
        }
      }, 250);
    });

  })





  // ------------------------------------------------ About Us 頁的認證列表
  // Certification
  var _certifList = $('.certifList');
  // var _certItem = _certifList.find('li');
  var _showAllCerti = _certifList.find('.more');
  var textAll = _showAllCerti.text();
  var textLess = _showAllCerti.attr('data-altext');
  _showAllCerti.click(function(){
    _certifList.toggleClass('revealAll');
    if(_certifList.hasClass('revealAll')){
      _showAllCerti.find('a').text(textLess);
    } else {
      _showAllCerti.find('a').text(textAll);
    }
  })
  // console.log(_certItem);
  // console.log(_certItem.filter(':visible'));




  // ------------------------------------------------ 挪動折扣標籤位置實驗 2020
  // var _discountLabel = $('.discountLabel');
  // _discountLabel.click(function(){
  //   $(this).toggleClass('shifted');
  // })

  //  ------------------------------------------------
    // 可開合的說明文字區 20191231修改
  // 避免網頁初載入時看到此區展開再收合的動作。預設只顯示三行
  // 目前一頁只能有一個 .expansile
  var _expansile = $('.expansile').addClass('partial');
  var textLess = 'less';
  var textAll = 'more';
  var hFull;
  var hPartial = _expansile.height();
  _expansile.wrapInner('<div class="innerPart"></div>')
  _expansile.append('<span class="fadeout"></span>').append('<span class="readAll"></span>');
  var _readAll = _expansile.find('.readAll').text(textAll);

  _expansile.each(function(){
    var _this = $(this);
    hFull = _this.find('.innerPart').innerHeight();
    _readAll.click(function(){
      if (_this.hasClass('partial')){
        _this.animate({height: hFull}, 500, function(){
          _this.removeClass('partial');
          _readAll.text(textLess);
        })
      } else {
        _this.animate({height: hPartial}, 500, function(){
          _this.addClass('partial');
          _readAll.text(textAll);
        })
      }
    })
  });

  function getExpansileNewHeight(){
    hFull = _expansile.find('.innerPart').innerHeight();
    if(_expansile.hasClass('partial')){
      _expansile.removeAttr('style');
    } else {
      _expansile.height(hFull);
    }
  }


  // 2021 Sep. 11
  // Official Records 和 Award：文字資訊 過長以刪節號（...）表示，hover 時顯示完整資訊
  var _ghostBlock = $('.officialRec, .awardList').find('li').find('.info');
  _ghostBlock.each(function(){
    let _this = $(this);
    _this.after(_this.clone().addClass('ghost'));
  })



// ========================================================================

  //rwdTable();
  
  // window resize *************
  var winResizeTimer;
  _window.resize(function(){
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout(function(){
      wwNew = _window.width();
      

      // console.log(ww, wwNew);
      
      if(wwNew>=wwWide){
        _menu = $('.menu');
        _topMenu = $('.topMenu');
        _topMenuClone.removeAttr('style');
        _topMenuCtrl.removeClass('closeIt');
        _sidebarMask.hide();
        $('.aboutUsAll').find('.expansible').removeAttr('style');
      }
      if( ww<wwWide && wwNew>=wwWide ){
        _sideBarCtrl.removeClass('closeIt');//20200721 added
        _sideBar.removeClass('reveal');//20200721 added
        _pdTreeBottom.add(_coverAll).removeAttr('style');
        _showPdCate.removeClass('closeIt');
        // fixMenu(); 20201211 removed
        _tabGroup.find('.tabBody').removeAttr('style');
        // $('.thisPdDetails').find('.slideArea').removeAttr('style');
        $('.thisPdDetails').find('.toggleArea').removeAttr('style'); //20201224
        fixHead();//20201211 added
        _ttBadges.removeClass('slideout');//20201228 added
      }
      if( ww>=wwWide && wwNew<wwWide ){
        _topZone.removeClass('fixed');
        _body.removeAttr('style');
        _tabGroup.find('.tabContent').removeAttr('style');
      }
      if( ww<wwMedium && wwNew>=wwMedium ){
        _togSlide.find('.toggleArea').removeAttr('style');
        _togSlide.find('.toggleCtrl').removeClass('closeIt');
      }
      if( ww>=wwMedium && wwNew<wwMedium ){
        _togSlide.find('.toggleArea').removeAttr('style');
        _togSlide.find('.toggleCtrl').removeClass('closeIt');// 10/04暫時
      }

      ww = wwNew;
      // console.log(ww, wwNew);



      tabSet();
      infoCardShowHide();
      fixThisCompanyNow();
      // fixMenu();

      _nationsOpt.stop().animate({scrollTop: 0}, 300, function(){
         getOffsetTop();
      }); 
  
    }, 200);

  });


  // 加 loading animation 的圓點元件
  $('.loadingAni').append('<span></span><span></span><span></span><span></span>');

	$('.btnDv input[type="reset"]').click(function() {
		selectedType = [];
  });
});