var addClasses = function () {
  var tags = 'pre, code, kbd, samp, tt, textarea'.split(', '),
    tags_enabled = 'pre, code, kbd, samp, tt'.split(', ');
  var defaults = {}, i, tag;
  for (i in tags) {
    tag = tags[i];
    defaults['enable-' + tag] = (tags_enabled.indexOf(tag) > -1);
  }
  // load values
  chrome.storage.sync.get(
    defaults,
    function (items) {
      var html = document.getElementsByTagName('html')[0], i, item;
      for (i in items) {
        item = items[i];

        if (i.match(/^enable-/) && item) {
          // add class name for all HTML tags to enable Hack for
          html.className += ' hack-font-browser-extensions-' + i;
        }
      }
    });
};

addClasses();
