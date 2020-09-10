import React from 'react';

import ComTitle from './com-title';
import ComDate from './com-date';

//import '../../../resources/dist/css/ln/modules/mod-description.css';

const ModDescription = props => {
    const {
        link,
        titleTag,
        titleSize,
        titleText,
        marqueeSize,
        marqueeText,
        subheadText,
        subheadSize,
        dateText,
        dateSize
    } = props;

    return (
        <section className="mod-description">
            <ComTitle
                tag={titleTag || 'h2'}
                size={titleSize || '--l'}
                link={link}
                content={titleText}
            />
            {subheadText ? (
                <p className={`com-subhead ${subheadSize || '--threexs'}`}>
                    <a href={link} className="com-link" title={subheadText}>
                        {subheadText}
                    </a>
                </p>
            ) : (
                <></>
            )}
            {marqueeText ? (
                <>
                    <strong
                        className={`mod-marquee ${marqueeSize || '--fivexs'}`}
                    >
                        <a href={link} title={marqueeText}>
                            {marqueeText}
                        </a>
                    </strong>
                </>
            ) : (
                <></>
            )}
            {dateText ? (
                <>
                    <ComDate display_date={dateText} />
                </>
            ) : (
                <></>
            )}
        </section>
    );
};

export default ModDescription;
