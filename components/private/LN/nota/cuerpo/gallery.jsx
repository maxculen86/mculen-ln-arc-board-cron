import React from 'react';
import Carousell from '../../../common/carousell';
import Item from './galleryItem';

const gallery = props => {
    const galleryItems = props.globalContent.content_elements.filter(
        element => element.type === 'gallery'
    );
    const currentItem = galleryItems.map(gallery => {
        return gallery.content_elements.map(photo => {
            return <Item {...photo} />;
        });
    });
    return <Carousell>{currentItem}</Carousell>;
};

export default gallery;
