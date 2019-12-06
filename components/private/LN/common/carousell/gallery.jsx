import React from 'react';
import Carousell from './index';
import Item from './galleryItem';

const gallery = props => {
    const galleryItems = props.globalContent.content_elements.filter(
        element => element.type === 'gallery'
    );
    const currentItem = galleryItems.map(gallery => {
        let totalGallery = gallery.content_elements.length;
        return gallery.content_elements.map(photo => {
            return <Item {...photo} totalGallery={totalGallery} />;
        });
    });
    return <Carousell>{currentItem}</Carousell>;
};

export default gallery;
