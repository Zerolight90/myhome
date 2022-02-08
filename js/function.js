//제이쿼리 방식으로 DOM, 이벤트, Data 핸들링
//read == DOMContentLoaded 와 같은 의미
$(document).ready(function(){

  const $header = $("header");
  const headerH = $header.outerHeight();//헤더의 높이(보더,패딩 포함해서 측정)

  console.log(headerH);

  const $aboutme = $("about");
  const $mnu = $('#wrap > header > nav > .gnb > li > a');//6개의 메뉴셀렉팅
  let idx = 0;//현재 선택된 메뉴의 인덱스

  let arrTopVal = [0];//header이후에 나타나는 section의 top값

  
  // 함수는 반복되는 코드를 많들어 놓고 사용하면 코드의 재활용 측면에서 유용하게 사용 가능
  function pageAni(topVal){
      $('html, body').stop().animate({scrollTop:topVal});
  }



 
  //resize 이벤트는 브라우저의 크기가 바뀌면 일어남
  $(window).on('load resize', function(){

      const $h1 = $('h1');
      const $h2 = $('.Visual h2');
      const $intro = $h2.parent();
      
   
  
      console.log("현재 메뉴의 개수 : "+$mnu.size());
      
      //어떤 요소의 top값(문서/브라우저/body로부터의 거리)를 구하는 방법 -> .offset().top
      //각 section의 top값을 자동으로 계산하는 장점
      //반복문을 이용한 처리
      for(let i=0;i<$mnu.size();i++){
          //arrTopVal[i] = $(".Visual~.Contact").eq(i).offset().top;
          arrTopVal.push($(".Visual~div").eq(i).offset().top);
      }
      
  });
  
  
  console.log(arrTopVal);

  $mnu.on('click', function(evt){
      //이번에 클릭한 요소의 index번호
      idx = $mnu.index(this);//0~4
      pageAni(arrTopVal[idx]-headerH+1);//fixed한 헤더의 높이값
      evt.preventDefault();
  });


  $(window).on('scroll', function(){

      let scrollTop = $(this).scrollTop();
      console.log("scrollTop = ",scrollTop);

      //오른쪽 하단 top 화살표
      if(scrollTop>150){
          //$aside.css({display:"block"});
          //$aside.show();
          $aside.fadeIn();
      }else{
          //$aside.css({display:"none"});
          //$aside.hide();
          $aside.fadeOut();
      }

      //헤더고정
      if(scrollTop>$(this).height()){
          $header.addClass('h-fixed');
          $aboutme.css({marginTop:headerH})
      }else{
          $header.removeClass('h-fixed');
          $aboutme.css({marginTop:0})
      }


      //메뉴 활성화 표시
      for(let i=0;i<$mnu.size();i++){
          if(scrollTop>=arrTopVal[i]-headerH-10){//fixed한 헤더의 높이값
              $mnu.eq(i).parent().addClass('on');
              $mnu.eq(i).parent().siblings().removeClass('on');
          }else if(scrollTop<arrTopVal[0]-headerH-10){//비주얼 슬라이드 구간
              $mnu.parent().removeClass('on');
          }
      }

  });

  //로고에 대한 클릭이벤트 구문
  $(".logo>a, aside").on('click', function(evt){
      evt.preventDefault();
      pageAni(0);
  });


  $(window).on('load', function(){
      pageAni(0);
  });

});




//portfolio
$(function(){

  //페이드 슬라이드
  const $slides = $('#wrap > section > div.Portfolio > .slides > .slides-container > figure');
  const $indicator = $('#wrap > section > div.Portfolio > .slides > .slides-pagination > li > a');

  let nowIdx = 0;
  let oldIdx = nowIdx;


  function fadeFn(){
      $slides.eq(oldIdx).stop().fadeOut(800);//이전 슬라이드 사라짐 처리
      $slides.eq(nowIdx).stop().fadeIn(800).css({display:'flex'});//이번에 나타날 슬라이드 처리
      
      //활성화표시
      $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
  }

  $indicator.on('click', function(evt){

      evt.preventDefault();

      oldIdx = nowIdx;
      nowIdx = $indicator.index(this);

      fadeFn();
  });





//inview 이벤트는 화면이 요소가 출현했을 때 작동
$(".skill").on("inview", function(evt, visible){
  if(visible==true){
    console.log("inview 이벤트 작동완료");
/*			
    $(".skill .bar").each(function(){
      $(this).css({
      //	"width" : $(this).children("span").text()
      
        "width" : $(this).parent().attr("data-bar")+"%"
      });
    });
*/		

    for(var i=0;i<=5;i++){
      var $that = $(".skill .bar").eq(i);
      $that.css({
        "width" : $that.parent().attr("data-bar")+"%"
      });
    }
  }
});


$(window).on("scroll", function(){
  if($(this).scrollTop() < $(".skill").offset().top-$(this).height()){
    $(".skill .bar").width(0);
  }
});


$(".skill-piechart").on("inview", function(evt, visible){
  
  if(visible==true){
    
    $('.chart').easyPieChart({
      //your configuration goes here
      easing: 'easeInOutCubic',
      delay: 3000,
      barColor:'#fff',
      trackColor:'rgba(255,0,0,0.2)',
      scaleColor: false,
      lineWidth: 12,
      size: 150,
      animate: 2000,
      
      onStep: function(from, to, percent) {
        this.el.children[0].innerHTML = Math.round(percent);
      }
    });

  }
  
});


  const spreadFn = function (el) {
      for (let i = 0; i < 6; i++) {
          $(el).eq(i).delay((i * 100) + 100).fadeIn(600);
      }

      for (let k = 0; k < 6; k++) {
          $(el).eq(k).delay((k + 6) * 100).fadeOut(600);
      }
  };

  spreadFn(".ring");

  setInterval(function(){
      spreadFn("h4 .ring");
      spreadFn("h4+div .ring");
  }, 3000);

});



$(function(){

  const $container = $('#wrap > section > div.Portfolio > .slides > .slides-container ');
  const $indicator = $('#wrap > section > div.Portfolio > .slides > .slides-container > figure');
  const $btnNext = $("#uxdesign .next");
  const $btnPrev = $("#uxdesign .prev");
  let nowIdx = 0;


  //컨테이너 이동
  function moveFn(){
      //컨테이너 이동
      $container.stop().animate({
          left : -1100 * nowIdx
      },400,"easeInOutCubic",function(){
          console.log("슬라이드 이동 완료~!");
      });
  }

  //활성화 표시
  function indicatorFn(){
      $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
  }


  $indicator.on('click', function(evt){
      nowIdx = $indicator.index(this);

      moveFn();
      indicatorFn();

      evt.preventDefault();
  });

  


  $btnNext.on('click', function(evt){

      if(nowIdx<=3){
          nowIdx++;
      }else{
          nowIdx = 0;
      }

      //컨테이너 이동
      $container.stop().animate({left : -1100},400,"easeInOutCubic",function(){            
          const $slides = $('.slides-container>li');//li 5개
          $slides.first().appendTo($container);
          $container.css({left:0});
      });
      
      indicatorFn();//인디케이터 활성화

      evt.preventDefault();
  });


  $btnPrev.on('click', function(evt){

      // 보여줄 슬라이드에 대한 인덱스번호 추출
     if(nowIdx>=1) {
      nowIdx--;
     }else{     
       nowIdx=4;
     };

     const $slides = $('.slides-container>li');//li 5개

     //컨테이너 이동
     $slides.last().prependTo($container);
     $container.css({left:-1100});
     $container.stop().animate({left : 0},400,"easeInOutCubic",function(){});

     indicatorFn();//인디케이터 활성화

     evt.preventDefault();
    });



    //자동실행(next 로직과 같음)
    setInterval(function(){


    },5000);



    $(function () {
      const arrSrc = ['./images/k-dokdo_working.png'];
      const arrAlt = ['독도'];

      const $book = $(".work");
      const $lightbox = $('.lightbox');
      const $shadow = $('.shadow');
      const $clse = $('.clse');

      $book.on('click', function (evt) {
        evt.preventDefault();

        let nowIdx = $book.index(this);

        $shadow.show();//그림자 도출
        $lightbox.children('img').attr({
          src: arrSrc[nowIdx],
          alt: arrAlt[nowIdx]
        });

        $lightbox.show();


      });

      $clse.on('click', function () {

        $lightbox.hide();
        $shadow.hide();
      });

      //그림자영역을 클릭하면 닫힘
      $shadow.on('click', function () {

        $lightbox.hide();
        $shadow.hide();
      });

      //이벤트전파 안되게 설정
      $lightbox.on('click', function (evt) {
        evt.stopPropagation();
      });

      //ESC키를 이용한 닫기 설정
      $(document).on('keyup', function (evt) {
        console.log('현재 눌린 키보드 값' + evt.which);
        if (evt.which == '27') {
          $lightbox.hide();
          $shadow.hide();
        }

      })
    });


});


