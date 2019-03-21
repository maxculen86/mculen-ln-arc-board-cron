import React from 'react'

export default function VideoOpening(props) {
  console.log(props)
  return <iframe width="100%" height="100%" style={{"position": "absolute"}} src={props.source} frameBorder="0" allowFullScreen="" enablejsapi="true"></iframe>
}
