/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Opening } from '@ln/contenidos-ui-opening';
import {
    cajaTemasCustomsFields,
    getCommonProps
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import StaticContent from '../../private/common/staticContent';
import getDataChainManual from '../utils/getDataChainManual';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import '../../../resources/packages/css/@ln/contenidos-ui-opening/index.css';
import '../../../resources/dist/css/ln/components/timeline.css';
import Timeline from '../../private/LN/common/timeline';
import {
    setTLDistribution,
    setTLOrderClass
} from '../../private/LN/common/utils/timeline';
import getFeatureByLayout from '../../private/LN/common/utils/getFeatureByLayout';

const CajaApertura = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: { layout = '', hideCaja },
        childProps,
        children,
        renderables = []
    } = props;

    if (hideCaja)
        return (
            <StaticContent id={featureId}>
                <></>
            </StaticContent>
        );

    const { notesQuantity, classCondition } = getCommonProps(props);
    const features = renderables.filter(r => r.collection === 'features');
    const layoutName = 'Timeline';

    const { error } = getDataChainManual({
        featureId,
        renderables,
        childProps,
        children,
        layout
    });

    const options = {
        Timeline: () => {
            const feature = getFeatureByLayout(features, children, layoutName);

            if (!feature) return null;

            const timeline = setTLDistribution(feature.props.id, children);
            const orderClass = setTLOrderClass(timeline);

            return (
                <Timeline
                    content={timeline.content}
                    articles={timeline.articles}
                    orderClass={orderClass}
                />
            );
        }
    };

    const mainComponent =
        (options[layoutName] && options[layoutName]()) || null;

    /*     const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        layoutName,
        layout,
        position,
        sectionName,
        positionInsideSection
    ); */

    // const sectionProps = {
    //     ...extraOpts,
    //     className: `box-articles ${classCondition}`
    // };

    if (isAdmin && error) {
        return (
            <WarningMessage
                id={featureId}
                type={error.type}
                message={error.message}
            />
        );
    }

    if (error) return <></>;

    console.log({ notesQuantity });

    const _children = children.map((item, index) => {
        if (index === children.length - 1) {
            return mainComponent;
        }

        return item;
    });

    return <Opening>{_children}</Opening>;
};

CajaApertura.label = 'LN10 Caja Apertura';

CajaApertura.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaManual')
    }).isRequired
};

export default Consumer(CajaApertura);
