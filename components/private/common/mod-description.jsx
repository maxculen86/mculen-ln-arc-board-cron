import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from './com-title';
import ComDate from './com-date';
import ModBajada from './mod-bajada';
import ModMarquesina from './mod-marquee';

const ModDescription = props => {
    const {
        link,
        titleTag,
        titleSize,
        titleText,
        authorSize,
        authors,
        subheadText,
        subheadSize,
        dateText,
        dateSize
    } = props;

    return (
        <section className="mod-description">
            <ComTitle
                tag={titleTag || 'h2'}
                size={titleSize || '--s'}
                link={link}
                content={titleText}
            />

            {subheadText && (
                <ModBajada
                    link={link}
                    subheadSize={subheadSize}
                    subheadText={subheadText}
                />
            )}

            <ModMarquesina text={authors} link={link} />

            {dateText && <ComDate display_date={dateText} />}
        </section>
    );
};

ModDescription.propTypes = {
    link: PropTypes.string,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    subheadText: PropTypes.string,
    subheadSize: PropTypes.string,
    dateText: PropTypes.string,
    dateSize: PropTypes.string,
    authors: PropTypes.string
};

ModDescription.defaultProps = {
    titleTag: 'h4',
    titleSize: '--s',
    subheadText: false,
    subheadSize: '',
    dateText: undefined,
    dateSize: undefined,
    authors: '',
    link: undefined
};

export default ModDescription;
