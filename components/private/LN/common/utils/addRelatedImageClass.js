/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import filter from '../../../../../content/filters/LN/acumulado/promoItemsRelatedImage';
import get from '../../../common/utils/get';

class addRelatedImage extends Component {
    constructor(props) {
        super(props);

        const { article } = props;

        const relatedContent = get(article, 'related_content.basic', []);

        if (article._id === '46P7NCPKIZAE5CY2LULAHCIMFQ')
            console.log('relatedContent', relatedContent);

        const { _id: id } =
            (relatedContent &&
                relatedContent.find(
                    item =>
                        get(item, 'referent.type') === 'image' ||
                        get(item, 'type') === 'image'
                )) ||
            {};

        const withoutPromoItems =
            !get(article, 'promo_items.basic') ||
            get(article, 'promo_items.basic.type') !== 'image';

        id &&
            withoutPromoItems &&
            this.fetchContent({
                imageData: {
                    source: 'relatedImageSource',
                    query: {
                        id,
                        subtype: get(article, 'subtype'),
                        imageConfig: 'm'
                    },
                    filter
                }
            });

        //if (id && id === '46P7NCPKIZAE5CY2LULAHCIMFQ') console.log('imageData', this.imageData);
    }

    render = () => {
        const { imageData } = this.state;
        const { article } = this.props;

        console.log(imageData);

        return 'imageData';
    };
}

export default Consumer(addRelatedImage);
