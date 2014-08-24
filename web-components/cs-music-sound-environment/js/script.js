// Generated by CoffeeScript 1.4.0

/**
 * @package     CleverStyle Music
 * @category    Web Components
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
*/


(function() {

  document.webL10n.ready(function() {
    var $body, mode, modes, sound_processing;
    $body = $('body');
    sound_processing = cs.sound_processing;
    modes = {};
    modes[_('reset')] = '';
    (function() {
      var loaded_modes, mode, _i, _len, _results;
      loaded_modes = sound_processing.get_reverb_modes();
      _results = [];
      for (_i = 0, _len = loaded_modes.length; _i < _len; _i++) {
        mode = loaded_modes[_i];
        _results.push(modes[mode] = mode);
      }
      return _results;
    })();
    return Polymer('cs-music-sound-environment', {
      current_mode: sound_processing.get_reverb_mode(),
      modes: (function() {
        var _results;
        _results = [];
        for (mode in modes) {
          _results.push(mode);
        }
        return _results;
      })(),
      open: function() {
        return $body.addClass('sound-environment');
      },
      update_mode: function(e) {
        this.current_mode = $(e.target).data('mode');
        return sound_processing.set_reverb_mode(modes[this.current_mode]);
      },
      back: function() {
        return $body.removeClass('sound-environment');
      }
    });
  });

}).call(this);
