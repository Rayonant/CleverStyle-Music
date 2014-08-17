###*
 * @package     CleverStyle Music
 * @category    Web Components
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
###

document.webL10n.ready ->
	$body			= $('body')
	music_library	= cs.music_library
	music_playlist	= cs.music_playlist
	music_settings	= cs.music_settings
	player			= document.querySelector('cs-music-player')
	scroll_interval	= 0
	stop			= false

	Polymer(
		'cs-music-library'
		all_text		: _('all-songs')
		artists_text	: _('artists')
		albums_text		: _('albums')
		genres_text		: _('genres')
		years_text		: _('years')
		ratings_text	: _('ratings')
		list			: []
		open			: ->
			@list	= []
#			stop	= false
#			music_playlist.current (current_id) =>
#				music_playlist.get_all (all) =>
#					index			= 0
#					list			= []
#					count			= all.length
#					get_next_item	= =>
#						if index < count
#							music_library.get_meta(all[index], (data) =>
#								data.playing		= if data.id == current_id then 'yes' else 'no'
#								data.icon			= if cs.bus.state.player == 'playing' then 'play' else 'pause'
#								data.artist_title	= []
#								if data.artist
#									data.artist_title.push(data.artist)
#								if data.title
#									data.artist_title.push(data.title)
#								data.artist_title	= data.artist_title.join(' — ') || 'Unknown'
#								list.push(data)
#								++index
#								get_next_item()
#							)
#						else if !stop
#							@list			= list
#							scroll_interval	= setInterval (=>
#								items_container	= @shadowRoot.querySelector('cs-playlist-items')
#								if items_container
#									item			= items_container.querySelector('cs-playlist-item[playing=yes]')
#									clearInterval(scroll_interval)
#									scroll_interval				= 0
#									items_container.scrollTop	= item.offsetTop
#							), 100
#					get_next_item()
		group			: (e) ->
			group_field	= $(e.originalTarget).data('group-field')
			switch group_field
				when 'artist', 'album', 'genre', 'year', 'rating'
					#xxx
				else
					music_library.get_all (all) ->
						for value, i in all
							all[i] = value.id
						music_playlist.set(all, ->
							player.next ->
								$body.removeClass('library menu')
						)
		play			: (e) ->
			music_playlist.current (old_id) =>
				music_playlist.set_current(
					e.target.dataset.index
				)
				music_playlist.current (id) =>
					if id != old_id
						player.play(id)
						@update(id)
					else
						player.play()
						@update(id)
		update			: (new_id) ->
			@list.forEach (data, index) =>
				if data.id == new_id
					@list[index].playing	= 'yes'
					@list[index].icon		= if cs.bus.state.player == 'playing' then 'play' else 'pause'
				else
					@list[index].playing = 'no'
					delete @list[index].icon
		back			: ->
			$body.removeClass('library')
#			stop	= true
#			setTimeout (=>
#				@list = []
#				if scroll_interval
#					clearInterval(scroll_interval)
#					scroll_interval	= 0
#			), 500
	)
