###*
 * @package     CleverStyle Music
 * @category    Web Components
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
###

document.webL10n.ready ->
	music_playlist	= cs.music_playlist
	$body			= $('body')
	player			= document.querySelector('cs-music-player')

	Polymer(
		'cs-music-library-rescan'
		searching_for_music_text	: _('searching-for-music')
		files_found_text			: _('files-found')
		created						: ->
			cs.bus.on('library/rescan/found', (found) =>
				@found	= found
			)
		found						: 0
		open						: ->
			if !@found
				cs.music_library.rescan(=>
					music_playlist.refresh()
					alert _('library-rescanned-playlist-updated')
					$body.removeClass('library-rescan menu')
					setTimeout (=>
						@found	= 0
						player.next ->
							player.play()
					), 200
				)
		back						: ->
			$body.removeClass('library-rescan')
	)
