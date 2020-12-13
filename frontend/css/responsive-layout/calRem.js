// == <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
// == <meta name="apple-mobile-web-app-capable" content="yes" />
// == <meta name="apple-mobile-web-app-status-bar-style" content="black" />
// == <meta name="format-detection" content="telephone=no, email=no"/>

;(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;
  
    function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
  
      if (width >= 750) width = 750;
      if(widt h<= 320) width = 320;
      // == 将屏幕宽度分成10份， 1份为1rem
      var rem = width / 7.5;
      docEl.style.fontSize = rem + 'px';
  
    }
    win.addEventListener('resize', function() {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    }, false);
    refreshRem();
  })(window);