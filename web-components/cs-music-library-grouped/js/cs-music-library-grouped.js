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
    var $body, music_library, stop;
    $body = $('body');
    music_library = cs.music_library;
    stop = false;
    return Polymer('cs-music-library-grouped', {
      list: [],
      grouped_field: '',
      open: function(group_field, all) {
        var count, get_next_item, index, list, _unknown,
          _this = this;
        $body.addClass('library-grouped');
        this.grouped_field = group_field;
        stop = false;
        index = 0;
        list = {};
        count = all.length;
        _unknown = _('unknown');
        get_next_item = function() {
          var final_list, items, unknown, value;
          if (index < count) {
            return music_library.get_meta(all[index], function(data) {
              var property;
              property = data[group_field];
              if (!property) {
                property = _unknown;
              }
              if (!list[property]) {
                list[property] = [data.id];
              } else {
                list[property].push(data.id);
              }
              ++index;
              return get_next_item();
            });
          } else if (!stop) {
            final_list = [];
            unknown = list[_unknown];
            delete list[_unknown];
            for (value in list) {
              items = list[value];
              final_list.push({
                field: group_field,
                value: value,
                items: items.join(','),
                count: items.length
              });
            }
            if (unknown) {
              final_list.push({
                field: group_field,
                value: _unknown,
                items: unknown.join(','),
                count: unknown.length
              });
            }
            return _this.list = final_list;
          }
        };
        return get_next_item();
      },
      back: function() {
        $body.removeClass('library-grouped');
        this.list = [];
        return stop = true;
      }
    });
  });

}).call(this);