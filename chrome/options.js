/* global chrome */

var tags = 'pre, code, kbd, samp, tt, textarea'.split(', '),
  tags_enabled = 'pre, code, kbd, samp, tt'.split(', ');

// Saves options to chrome.storage.sync
function save_options(e) {
  e.preventDefault();
  var items = {}, i, tag;
  for (i in tags) {
    tag = tags[i];
    items['enable-' + tag] = (document.getElementById('enable-' + tag).checked);
  }
  chrome.storage.sync.set(
    items,
    function () {
      // Update status to let user know options were saved
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage
var restore_options = function () {
  // build defaults
  var defaults = {}, i, tag;
  for (i in tags) {
    tag = tags[i];
    defaults['enable-' + tag] = (tags_enabled.indexOf(tag) > -1);
  }
  // load values
  chrome.storage.sync.get(
    defaults,
    function (items) {
      var i, item;
      for (i in items) {
        item = items[i];
        if (i.match(/^enable-/)) {
          document.getElementById(i).checked = item;
        }
      }
    });
};
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
