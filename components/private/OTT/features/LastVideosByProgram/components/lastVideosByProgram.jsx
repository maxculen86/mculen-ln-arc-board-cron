import React from 'react'
import LastVideoItem from '../../../layouts/lastVideos/components/lastVideoItem';
import ShowMoreVideos from '../containers/showMoreVideos';
import get from 'lodash.get';



export default function LastVideosByProgams({ videos, nextPageHandler, hasNext }) {
  const currentItem = videos.map((video,index)=>{
    const title = get(video, 'headlines.basic', null)
    const imgSrc = get(video, 'promo_items.basic.url', null)

    return <LastVideoItem title={title} key={index} imgSrc={imgSrc}/>
  })
  return (
      <div>
      {currentItem}
      {
        hasNext &&
        <ShowMoreVideos onClick={nextPageHandler}/>
      }
      
      </div>
  )
}
