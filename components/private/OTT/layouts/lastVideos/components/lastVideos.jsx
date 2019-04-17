import React from 'react'
import Carousell from '../../../common/containers/carousell'
import LastVideoItem from '../containers/lastVideoItem';
import get from 'lodash.get';



export default function LastVideos({ videos }) {
  const currentItem = videos.map((video,index)=>{
    const title = get(video, 'headlines.basic', null)
    const imgSrc = get(video, 'promo_items.basic.url', null)

    return <LastVideoItem title={title} key={index} imgSrc={imgSrc}/>
  })
  return (
      <Carousell>
      {currentItem}
      </Carousell>
  )
}
