import { combineReducers } from 'redux'
import { songcardlist } from './songcardlist.redux'
import { playqueue } from './playqueue.redux'
import { playlistinfo } from './playlistinfo.redux'
import { toplist } from './toplist.redux'
import { artistinfo } from './artistinfo.redux'
import { starredlist } from './starredlist.redux'
import { swiper } from './swiper.redux'
import { lyric } from './lyric.redux'


export default combineReducers({
  songcardlist, playqueue, playlistinfo, toplist, artistinfo, starredlist, swiper, lyric,
})
