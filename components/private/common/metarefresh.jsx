import React, { useEffect } from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import get from './utils/get';
import withScreenUtils from './hocs/withScreenUtils';
import withLoginData from '../LN/common/hocs/withLoginData';
import handleCookie from '../LN/common/utils/handleCookie';

const { getCookie } = handleCookie();

const findTemplate = type => {
    if (['story', 'results'].includes(type)) return 'nota';
    if (type === '/deportes') return 'home_deportes';
    return 'home';
};

const getInterval = (type, resolution, config) => {
    const template = findTemplate(type);
    const device = resolution === 'tablet' ? 'mobile' : resolution;
    const seconds = config ? config[`${template}_${device}`] : 0;
    return parseInt(seconds, 10) * 1000;
};

const shouldBeExcluded = (contentElements, promoItem) =>
    (contentElements &&
        contentElements.some(
            contentElement =>
                contentElement.type === 'raw_html' ||
                contentElement.type === 'oembed_response' ||
                contentElement.type === 'video'
        )) ||
    (promoItem && promoItem.type === 'video');

const Component = props => {
    const contentElements = get(props, 'globalContent.content_elements', null);
    const promoItem = get(props, 'globalContent.promo_items.basic', null);
    const type = get(props, 'globalContent.type', null);
    const _id = get(props, 'globalContent._id', null);
    const subscription = get(props, 'loginData.subscription', null);
    const website = get(props, 'arcSite', null);
    const resolution = get(props, 'screenUtils.device', null);
    const isAdmin = get(props, 'isAdmin');
    const outputType = get(props, 'outputType');
    const metarefresh = useContent({
        source: 'navigationTreeSource',
        query: {
            website
        },
        transform: resp => {
            return get(resp, 'Metarefresh', undefined);
        }
    });

    // const metarefresh = content && content.Metarefresh;
    const interval = getInterval(type || _id, resolution, metarefresh);
    const cookieProductoPremium = getCookie('ProductoPremiumId');
    const template = findTemplate(type);

    useEffect(() => {
        if (
            !metarefresh ||
            isAdmin ||
            outputType === 'amp' ||
            (subscription && template !== 'home') ||
            interval < 1 ||
            shouldBeExcluded(contentElements, promoItem)
        ) {
            return;
        }

        setTimeout(() => {
            (!cookieProductoPremium || template === 'home') &&
                localStorage.setItem('CDmetaRefresh', true);
            window.location.reload();
        }, interval);
    }, [
        contentElements,
        cookieProductoPremium,
        interval,
        isAdmin,
        metarefresh,
        outputType,
        promoItem,
        subscription,
        template
    ]);

    return <></>;
};

Component.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
    loginData: PropTypes.shape({
        subscription: PropTypes.bool
    }).isRequired
};

const Metarefresh = Context(withScreenUtils(withLoginData(Component)));
Metarefresh.WrappedComponent = Component;

export default Metarefresh;
