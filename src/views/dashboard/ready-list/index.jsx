import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './list-item/'
import { changeSong, deleteSong, clearQueue } from '../../../redux/playqueue.redux'

import './style.styl'

@connect(state => ({ playqueue: state.playqueue }), { changeSong, deleteSong, clearQueue })
export default class ReadyList extends Component {
  render() {
    const { playlist, song } = this.props.playqueue
    return (
      <div className="readylist">
        <div className="list-head">
          <div>播放列表</div>
          <div>收藏全部</div>
          <div onClick={this.props.clearQueue}>清空</div>
        </div>
        <ul className="list-body">
          {playlist.map((v, index) => (
            <Item
              key={v.id}
              v={v}
              song={song}
              index={index}
              changeSong={this.props.changeSong}
              deleteSong={this.props.deleteSong}
            />
          ))}
        </ul>
      </div>
    )
  }
}
