import React, { useEffect } from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { SITE_LANACION } from 'fusion:environment';
import get from './utils/get';
import withScreenUtils from './hocs/withScreenUtils';
import handleCookie from '../LN/common/utils/handleCookie';
import { isSubscribed } from '../LN/common/utils/contextHelper';

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

export const shouldBeExcluded = ({ globalContent }) => {
    const labelMetarefresh = get(globalContent, 'label.metarefresh.text', null);
    const contentElements = get(globalContent, 'content_elements', null);
    const promoItem = get(globalContent, 'promo_items.basic', null);
    return (
        (contentElements &&
            contentElements.some(
                contentElement =>
                    contentElement.type === 'raw_html' ||
                    contentElement.type === 'oembed_response' ||
                    contentElement.type === 'video'
            )) ||
        (promoItem && promoItem.type === 'video') ||
        labelMetarefresh === 'No'
    );
};

const Component = props => {
    const globalContent = get(props, 'globalContent', null);
    const type = get(props, 'globalContent.type', null);
    const _id = get(props, 'globalContent._id', null);
    const subscription = isSubscribed();
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
            shouldBeExcluded({ globalContent })
        ) {
            return;
        }

        setTimeout(() => {
            (!cookieProductoPremium || template === 'home') &&
                localStorage.setItem('CDmetaRefresh', true);
            if (template === 'home') {
                window.scrollTo(0, 0);
                sessionStorage.setItem('hp', 0);
                sessionStorage.setItem('lb', 'apertura1');
                window.location.href = SITE_LANACION;
            } else {
                window.location.reload();
            }
        }, interval);
    }, [
        cookieProductoPremium,
        globalContent,
        interval,
        isAdmin,
        metarefresh,
        outputType,
        subscription,
        template
    ]);

    return <></>;
};

Component.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        _id: PropTypes.string
    }).isRequired
};

const Metarefresh = Context(withScreenUtils(Component));
Metarefresh.WrappedComponent = Component;

export default Metarefresh;
