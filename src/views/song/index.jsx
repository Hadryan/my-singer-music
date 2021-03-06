import React from 'react'
import { connect } from 'react-redux'
import SongInfo from './song-info'
import Comment from './comment'
import Associate from './associate'
import { fetchSongDetail } from '../../redux/songdetail.redux'
import { fetchLyric } from '../../redux/lyric.redux'
import './style.styl'

@connect( // 将store和组件联系在一起
  state => ({ // mapStateToProps
    songObj: state.songdetail,
    lyricObj: state.lyricReducer,
  }),
  { // mapDispatchToProps
    fetchSongDetail, fetchLyric,
  },
)
class Song extends React.Component {
  componentWillMount() {
    this.props.fetchSongDetail(this.props.match.params.id)
    this.props.fetchLyric(this.props.match.params.id)
  }
  render() {
    const { songs } = this.props.songObj
    const { lrc } = this.props.lyricObj
    return (
      <div className="song-bg">
        <div className="song-warp">
          <div className="song-info">
            <SongInfo songs={songs} lrc={lrc} />
            <Comment />
          </div>
        </div>
        <div className="right-warp">
          <Associate />
        </div>
      </div>
    )
  }
}
export default Song
