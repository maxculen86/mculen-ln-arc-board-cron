import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbArticle from '../../breadcrumbArticle';

function BodyTop({ children }) {
    const processChildren = React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        const imageProps = child.props.data || {};
        const { isFirstImage, isLastImage } = imageProps;

        if (
            child.props?.data?.type === 'image' ||
            isFirstImage ||
            isLastImage
        ) {
            if (isFirstImage) {
                return <div className="mb-80">{child}</div>;
            }

            if (isLastImage) {
                return <div style={{ paddingTop: '48px' }}>{child}</div>;
            }

            return (
                <div style={{ paddingTop: '48px' }} className="mb-80">
                    {child}
                </div>
            );
        }

        return child;
    });

    return (
        <div
            data-testid="body-top"
            id="body-top-notas-card"
            className="grid grid-row-1 grid-col-1 grid-col-3-11_m grid-col-4-10_md grid-col-5-13_lg"
        >
            <BreadcrumbArticle className="mb-40 pb-16" />
            {processChildren}
        </div>
    );
}

BodyTop.propTypes = {
    children: PropTypes.node.isRequired
};

export default BodyTop;
