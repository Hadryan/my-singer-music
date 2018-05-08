import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { changeCurrent } from '../../../redux/preparelist.redux'
import { fetchSong } from '../../../redux/song.redux'
import './style.styl'

const parseLyric = (lyricStr) => {
  let lines = lyricStr.split('\n')
  const pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g
  let lyric = ''
  while (!pattern.test(lines[0])) {
    lines = lines.slice(1)
  }
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const value = line.replace(pattern, '')
    lyric = `${lyric}${value}\n`
  }
  return lyric
}
@connect( // 将store和组件联系在一起
  state => ({ // mapStateToProps
    prepareObj: state.prepareListReducer,
  }),
  { // mapDispatchToProps
    changeCurrent, fetchSong,
  },
)
class SongInfo extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.playMusic = this.playMusic.bind(this)
    this.state = { showbg: 'ply' }
  }
  playMusic() {
    this.props.changeCurrent(this.props.songs[0])
    this.props.fetchSong(this.props.match.params.id)
  }
  handleMouseOver() {
    this.setState({ showbg: 'plyhover' })
  }
  handleMouseOut() {
    this.setState({ showbg: 'ply' })
  }
  render() {
    const { songs } = this.props
    const { lrc } = this.props
    let lyric = ''
    if (lrc) {
      console.log(lrc.lyric)
      lyric = parseLyric(lrc.lyric)
    }
    return (
      <div className="song-info-wrap">
        <div className="img-wrap">
          <div className="img-cover">
            <img src={`${songs.length && songs[0].al.picUrl}?param=130y130`} alt="图片" />
            <span className="img-msk" />
          </div>
          <div className="out">
            <i className="icn-music" />
            <Link className="out-link" to="./3">生成外链播放器</Link>
          </div>
        </div>
        <div className="content">
          <div className="head">
            <i className="lab" />
            <div className="title">
              <em>{songs.length && songs[0].name}</em>
            </div>
          </div>
          <p className="des">
            歌手：<span><Link to="singer/123">{songs.length && songs[0].ar[0].name}</Link></span>
          </p>
          <p className="des">
            所属专辑：<span><Link to="album/123">{songs.length && songs[0].al.name}</Link></span>
          </p>
          <div className="btn-group">
            <a className="info-btn icn-blue" onClick={this.playMusic} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}><i className="btn-i icn-play"><em className={this.state.showbg} />播放</i></a>
            <a className="info-btn icn-white"><i className="btn-i icn-collect">收藏</i></a>
            <a className="info-btn icn-white"><i className="btn-i icn-share">分享</i></a>
            <a className="info-btn icn-white"><i className="btn-i icn-download">下载</i></a>
            <a className="info-btn icn-white"><i className="btn-i icn-comment">(4704)</i></a>
          </div>
          <div className="lyric-content">
            {lyric}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SongInfo)
