/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-danger            */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';

import { useContent } from 'fusion:content';
import get from 'lodash.get';

import withScreenUtils from './hocs/withScreenUtils';
import withLoginData from '../LN/common/hocs/withLoginData';

const getInterval = type => resolution => config => {
    const template = ['story', 'results'].includes(type) ? 'nota' : 'home';
    const device = resolution === 'tablet' ? 'mobile' : resolution;
    const seconds = config[`${template}_${device}`];
    return parseInt(seconds, 10) * 1000;
};

const hasVideo = contentElements => promoItem =>
    contentElements.some(contentElement => contentElement.type === 'video') ||
    (promoItem && promoItem.type === 'video');

const hasAudioFromSpotify = contentElements =>
    contentElements.some(
        contentElement => contentElement.subtype === 'spotify'
    );

const Component = props => {
    const contentElements = get(props, 'globalContent.content_elements', null);
    const promoItem = get(props, 'globalContent.promo_items.basic', null);
    const website = get(props, 'arcSite', null);
    const resolution = get(props, 'screenUtils.device', null);
    const isAdmin = get(props, 'isAdmin');
    const outputType = get(props, 'outputType');

    const content = useContent({
        source: 'navigationTreeSource',
        query: {
            website
        }
    });

    const {
        globalContent: { type },
        loginData: { subscription }
    } = props;

    if (isAdmin) return null; // It won't render in pagebuilder

    const metarefresh = content.Metarefresh;

    const interval = getInterval(type)(resolution)(metarefresh);

    const script = `
        setInterval(() => {
            window.location.reload();
        }, ${interval});
    `;

    if (outputType === 'amp') return null;
    if (hasVideo(contentElements)(promoItem)) return null;
    if (hasAudioFromSpotify(contentElements)) return null;
    if (subscription || interval < 1) return null;
    return (
        <script id="metarefresh" dangerouslySetInnerHTML={{ __html: script }} />
    );
};

Component.propTypes = {
    arcSite: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        type: PropTypes.string
    }).isRequired
};

const Metarefresh = Context(withScreenUtils(withLoginData(Component)));
Metarefresh.WrappedComponent = Component;

export default Metarefresh;
