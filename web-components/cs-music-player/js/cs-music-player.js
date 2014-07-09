// Generated by CoffeeScript 1.4.0

/**
 * @package     CleverStyle Music
 * @category    Web Components
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
*/


(function() {
  var music_library, music_playlist, music_storage, player;

  music_storage = navigator.getDeviceStorage('music');

  music_library = cs.music_library;

  music_playlist = cs.music_playlist;

  player = null;

  Polymer('cs-music-player', {
    title: 'Unknown',
    artist: 'Unknown',
    ready: function() {
      return new Blur({
        el: this,
        path: '/web-components/cs-music-player/img/bg.jpg',
        radius: 10
      });
    },
    rescan: function() {
      return music_library.rescan(function() {
        music_playlist.refresh();
        return alert('Rescanned successfully, playlist refreshed');
      });
    },
    play: function(id) {
      var element, play_button,
        _this = this;
      id = !isNaN(parseInt(id)) ? id : void 0;
      element = this;
      play_button = element.shadowRoot.querySelector('[icon=play]');
      if (player && !id) {
        if (player.playing) {
          player.pause();
          return play_button.icon = 'play';
        } else {
          player.play();
          return play_button.icon = 'pause';
        }
      } else if (id) {
        return music_library.get(id, function(data) {
          return music_storage.get(data.name).onsuccess = function() {
            if (player != null) {
              player.stop();
            }
            player = AV.Player.fromURL(window.URL.createObjectURL(this.result));
            player.on('ready', function() {
              var _this = this;
              return setTimeout((function() {
                var cover, _ref;
                cover = ((_ref = player.asset.metadata.coverArt) != null ? _ref.toBlobURL() : void 0) || '/web-components/cs-music-player/img/bg.jpg';
                _this.device.device.node.context.mozAudioChannelType = 'content';
                element.style.backgroundImage = "url(" + cover;
                element.shadowRoot.querySelector('cs-cover').style.backgroundImage = "url(" + cover;
                return new Blur({
                  el: element,
                  path: cover,
                  radius: 10
                });
              }), 0);
            });
            player.on('end', function() {
              return element.next();
            });
            player.play();
            play_button.icon = 'pause';
            return music_library.get_meta(id, function(data) {
              if (data) {
                element.title = data.title || 'Unknown';
                element.artist = data.artist || 'Unknown';
                if (data.album) {
                  return element.artist += ": " + data.album;
                }
              } else {
                element.title = 'Unknown';
                return element.artist = 'Unknown';
              }
            });
          };
        });
      } else {
        return music_playlist.current(function(id) {
          return _this.play(id);
        });
      }
    },
    prev: function() {
      var _this = this;
      return music_playlist.prev(function(id) {
        return _this.play(id);
      });
    },
    next: function() {
      var _this = this;
      return music_playlist.next(function(id) {
        return _this.play(id);
      });
    }
  });

}).call(this);
