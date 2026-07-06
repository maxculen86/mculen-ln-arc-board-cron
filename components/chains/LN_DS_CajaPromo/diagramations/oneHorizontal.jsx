import React, { Children } from 'react';
import { cx } from '@ln/ds-cva';

const mb = 'mb-16 md:mb-24 xl:mb-32';

function CardGridOneHorizontal({ children, className }) {
    const [first] = Children.toArray(children);
    return (
        <div
            className={cx(
                'grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-16',
                mb,
                className
            )}
        >
            <div className="lg:col-start-2 lg:col-end-12 xl:col-start-3 xl:col-end-15">
                {first}
            </div>
        </div>
    );
}

CardGridOneHorizontal.displayName = 'CardDiagramation.One';

export default CardGridOneHorizontal;
