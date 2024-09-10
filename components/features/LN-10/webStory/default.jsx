/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { Card } from '@ln/contenidos-ui-card';
import { GetImage } from '../../../private/LN/common/utils/articuloHelper';
import {
    getDataAttributesForViewability,
    getMediaData
} from '../article/_helper';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import { getChainConfig } from '../article/common/_helper-WebApi';
import { filterWebStoriesRenderables } from '../../../chains/LN10_Caja_WebStories/common/_helper-WebApi';

const WebStoryFeature = props => {
    const { customFields, id: featureId, renderables } = props;
    const { title, lead, link, imageId } = customFields;
    const { isAdmin, arcSite } = useAppContext();
    const { cajaTemaConfig } = getProperties(arcSite);

    const image = GetImage({
        imageId,
        imageConfig: 'webStories',
        id: '',
        onlyOneApeturaValidateForWWW: false,
        isAdmin,
        filterImage
    });

    const mediaData = getMediaData({
        article: {},
        video: null,
        customFields,
        image,
        layout: '',
        renderables,
        isLoadWithPicture: true
    });

    const { index, boxPosition } = getChainConfig({
        featureId,
        renderables: filterWebStoriesRenderables(renderables),
        cajaTemaConfig
    });

    const extraOpts = getDataAttributesForViewability(
        imageId,
        boxPosition,
        index
    );

    return (
        <Card
            title={title}
            lead={lead}
            href={link}
            mediaData={mediaData}
            data-pos={extraOpts['data-pos']}
            data-id={extraOpts['data-id']}
            data-notaid={extraOpts['data-notaid']}
            data-source={extraOpts['data-source']}
        />
    );
};

WebStoryFeature.label = 'LN10 WebStory';

WebStoryFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese el texto del título.',
            default: ''
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            default: ''
        }),
        imageId: PropTypes.string.tag({
            name: 'Foto',
            description: 'Ingrese aquí el id de la imagen en PhotoCenter',
            default: ''
        }),
        link: PropTypes.string.tag({
            name: 'Link',
            description: 'Ingrese aquí el Link de la nota',
            default: ''
        })
    })
};

export default Consumer(WebStoryFeature);
