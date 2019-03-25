import React from 'react'
import HeaderItem from '../containers/headerItem';

export default function HeaderComponent({ items, data }) {
  return items.map((item, index) => {
    return (
    <HeaderItem
      description={item.description}
      href={item.href}
      data={data}
      alt={item.description}
      key={index}
    />)
  })
}

