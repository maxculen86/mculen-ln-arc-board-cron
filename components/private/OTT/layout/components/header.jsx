import React from 'react'
import HeaderItem from '../containers/headerItem';

export default function HeaderComponent({ items }) {
  return items.map((item, index) => {
    return (
    <HeaderItem
      description={item.description}
      href={item.href}
      data={item.data}
      alt={item.alt}
      key={index}
    />)
  })
}

