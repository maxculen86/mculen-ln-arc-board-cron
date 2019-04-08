import React from 'react'
import Buttom from '../../../../common/containers/button';

export default function ShowMoreVideos(props) {
    console.log("ShowMoreVideosComponent", props)
  return <Buttom onClick={props.onClick}>VER MAS VIDEOS</Buttom>
}
