// Generated by CoffeeScript 1.4.0

/**
 * @package     CleverStyle Music
 * @category    Web Components
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
*/


(function() {

  Polymer('cs-seeking-bar', {
    current_time: '00:00',
    duration: '00:00',
    ready: function() {
      return this.addEventListener('click', function(e) {
        var percents, progress_container;
        progress_container = this.shadowRoot.querySelector('.progress-container');
        percents = (e.pageX - progress_container.offsetLeft - this.offsetLeft) / progress_container.clientWidth * 100;
        if (percents < 0 || percents > 100) {
          return;
        }
        return $(this).trigger('seeking-update', {
          percents: percents
        });
      });
    }
  });

}).call(this);