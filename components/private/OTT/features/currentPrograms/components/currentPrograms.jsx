import React from 'react'
import Carousell from '../../../common/containers/carousell'
import CurrentProgramItem from '../containers/currentProgramItem';

export default function CurrentPrograms({ items }) {
  const currentItem = items.map((item,index)=>{
    return <CurrentProgramItem description={item.description} imgSrc={item.imgSrc} href={item.href} key={index}/>
  })
  return (
      <Carousell>
      {currentItem}
      </Carousell>
  )
}
