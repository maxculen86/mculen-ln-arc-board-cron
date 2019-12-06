import React from 'react';
import Carousell from '.';
import Item from './galleryItem';

const gallery = props => {
    console.log('props ******** gallery ********* ', props);
    const galleryItems = props.globalContent.content_elements.filter(
        element => element.type === 'gallery'
    );
    console.log('props ******** galleryItems ********* ', galleryItems);
    const currentItem = galleryItems.map(gallery => {
        let totalGallery = gallery.content_elements.length;
        return gallery.content_elements.map(photo => {
            return <Item {...photo} totalGallery={totalGallery} />;
        });
    });
    console.log('props ******** currentItem ********* ', currentItem[0]);
    return <Carousell>{currentItem[0]}</Carousell>;
};

export default gallery;
