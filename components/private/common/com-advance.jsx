/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/components/com-advance.css';
import ComTitle from './com-title';
import Badge from './badge/Badge';

const ComAdvance = props => {
    const {
        classCondition = '',
        size = '',
        title,
        link = '',
        withBadgeLiveblog = false
    } = props;

    return (
        <section className={`com-advance ${classCondition || ``}`}>
            {withBadgeLiveblog && <Badge type="liveblog-red">EN VIVO</Badge>}
            <ComTitle
                tag="h2"
                size={size || '--m'}
                content={title}
                link={link || ''}
            />
        </section>
    );
};

ComAdvance.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    classCondition: PropTypes.string,
    link: PropTypes.string,
    withBadgeLiveblog: PropTypes.bool
};

export default ComAdvance;
