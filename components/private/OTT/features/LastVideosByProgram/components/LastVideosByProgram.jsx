import React from 'react'
import LastVideoItem from '../../../../../private/OTT/layouts/lastVideos/components/lastVideoItem';
import get from 'lodash.get';



export default function LastVideosByProgams({ videos }) {
  const currentItem = videos.map((video,index)=>{
    const title = get(video, 'headlines.basic', null)
    const imgSrc = get(video, 'promo_items.basic.url', null)

    return <LastVideoItem title={title} key={index} imgSrc={imgSrc}/>
  })
  return (
      <div>
      {currentItem}
      </div>
  )
}
