import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

const MagazineTheme = React.lazy(() => import('./types/magazine'));

const isMagazine = sections =>
    sections.some(section => section._id.includes('/revista-'));

const Theme = ({
    children,
    globalContent: {
        taxonomy: { sections }
    }
}) => {
    const magazine = isMagazine(sections);

    return (
        <>
            <React.Suspense fallback={<></>}>
                {magazine && <MagazineTheme />}
            </React.Suspense>
            {children}
        </>
    );
};

Theme.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.shape({
                _id: PropTypes.string
            })
        })
    }).isRequired
};

export default Consumer(Theme);
