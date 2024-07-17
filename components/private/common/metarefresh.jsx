import React, { useEffect } from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { SITE_LANACION } from 'fusion:environment';
import get from './utils/get';
import withScreenUtils from './hocs/withScreenUtils';
import handleCookie from '../LN/common/utils/handleCookie';
import {
    findTemplate,
    getInterval,
    shouldBeExcluded
} from './utils/metarefreshHelper';

const Component = props => {
    const { getCookie } = handleCookie();
    const globalContent = get(props, 'globalContent', null);
    const type = get(props, 'globalContent.type', null);
    const category = get(props, 'globalContent.category', null);
    const _id = get(props, 'globalContent._id', null);
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

    const interval = getInterval(
        type || _id,
        resolution,
        metarefresh,
        category
    );

    const cookieProductoPremium = getCookie('ProductoPremiumId');
    const template = findTemplate(type);
    const isSubscribed =
        cookieProductoPremium && cookieProductoPremium.includes('2');

    useEffect(() => {
        if (
            !metarefresh ||
            isAdmin ||
            outputType === 'amp' ||
            (isSubscribed && template !== 'home') ||
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
        template,
        isSubscribed
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
