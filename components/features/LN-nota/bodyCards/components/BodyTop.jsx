import React from 'react';
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
            className="grid-row-1 grid-col-1 max-w-550 mt-0 mb-0 mr-auto ml-auto grid-col-2-12_m max-w-635_m grid-col-5-13_lg"
        >
            <BreadcrumbArticle className="mb-32" />
            {processChildren}
        </div>
    );
}

export default BodyTop;
