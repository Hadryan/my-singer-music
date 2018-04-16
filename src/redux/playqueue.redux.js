import axios from 'axios'
import { Mp3Url } from '../config/api'

// constant
const PLAY_SONG = 'PLAY_SONG'
const ADD_SONG = 'ADD_SONG'
const DELETE_SONG = 'DELETE_SONG'
const CHANGE_SONG = 'CHANGE_SONG'
const CLEAR_QUEUE = 'CLEAR_QUEUE'

// inital state
const initState = {
  playlist: [
    {
      al: {
        id: 30614,
        name: '3/8',
        pic: 74766790706391,
        picUrl:
          'https://p1.music.126.net/N1pCSE3EtocC7NowAAuEHQ==/74766790706391.jpg',
        tns: [],
      },
      ar: [
        {
          id: 9952,
          name: '谢安琪',
          tns: [],
        },
      ],
      dt: 277029,
      name: '钟无艳',
      id: 308353,
      url:
        'http://www.170mv.com/kw/other.web.rh01.sycdn.kuwo.cn/resource/n2/85/93/2004871240.mp3',
    },
  ],
  song: {
    al: {
      id: 30614,
      name: '3/8',
      pic: 74766790706391,
      picUrl:
        'https://p1.music.126.net/N1pCSE3EtocC7NowAAuEHQ==/74766790706391.jpg',
      tns: [],
    },
    ar: [
      {
        id: 9952,
        name: '谢安琪',
        tns: [],
      },
    ],
    dt: 277029,
    name: '钟无艳',
    id: 308353,
    url:
      'http://www.170mv.com/kw/other.web.rh01.sycdn.kuwo.cn/resource/n2/85/93/2004871240.mp3',
  },
  index: 0,
  flag: '',
}

// action creator for async method [logic operation]
const playSongAct = song => ({ type: PLAY_SONG, payload: song })

const addSongAct = song => ({ type: ADD_SONG, payload: song })

// action creator [also logic operation]
export const changeSong = ({ song, index, flag = '' }) => ({
  type: CHANGE_SONG,
  payload: {
    song,
    index,
    flag,
  },
})

export const deleteSong = id => ({ type: DELETE_SONG, payload: id })

export const clearQueue = () => ({
  type: CLEAR_QUEUE,
})

// reducer
export const playqueue = (state = initState, action) => {
  let delIndex
  const { playlist } = state
  const len = playlist.length
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        playlist: [action.payload, ...state.playlist],
        song: action.payload,
        index: 0,
        flag: PLAY_SONG,
      }

    case ADD_SONG:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
        flag: ADD_SONG,
      }

    case CHANGE_SONG:
      return {
        ...state,
        song: action.payload.song,
        index: action.payload.index,
        flag: action.payload.flag,
      }
    case DELETE_SONG:
      // 记录要删除歌曲的数组下标
      for (let i = 0; i < len; i += 1) {
        if (playlist[i].id === action.payload) {
          delIndex = i
        }
      }
      playlist.splice(delIndex, 1)
      return {
        ...state,
        playlist,
        // 删除歌曲后记得改变当前播放歌曲的index
        index: state.index ? state.index - 1 : state.playlist.length - 1,
      }
    case CLEAR_QUEUE:
      return {
        ...initState,
      }
    default:
      return state
  }
}

// helper
const isContain = (id, playlist) => {
  const len = playlist.length
  for (let i = 0; i < len; i += 1) {
    const song = playlist[i]
    if (song.id === id) {
      return true
    }
  }
  return false
}

// logic operation
export const playSong2Que = s => (dispatch, getState) => {
  const { playlist } = getState().playqueue
  // 歌曲列表中已经存在的歌曲不允许再次添加
  if (isContain(s.id, playlist)) {
    return
  }
  axios
    .get(Mp3Url(s.id))
    .then((res) => {
      const { url } = res.data.data[0]
      if (url) {
        const song = {
          ...s,
          url,
        }
        dispatch(playSongAct(song))
      } else {
        console.log('歌曲直链不存在')
      }
    })
    .catch((err) => {
      console.log(`获取歌曲链接是发生错误：${err}`)
    })
}

export const addSong2Que = s => (dispatch, getState) => {
  const { playlist } = getState().playqueue
  // 歌曲列表中已经存在的歌曲不允许再次添加
  if (isContain(s.id, playlist)) {
    return
  }
  axios
    .get(Mp3Url(s.id))
    .then((res) => {
      const { url } = res.data.data[0]
      if (url) {
        const song = {
          ...s,
          url,
        }
        dispatch(addSongAct(song))
      } else {
        console.log('歌曲直链不存在')
      }
    })
    .catch((err) => {
      console.log(`获取歌曲链接是发生错误：${err}`)
    })
}
