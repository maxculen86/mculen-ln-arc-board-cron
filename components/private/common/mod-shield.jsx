import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComShield from './com-shield';
import ModheaderSection from './mod-headerSection';
import '../../../resources/dist/css/ln/modules/mod-shields.css';

const ModShield = props => {
    const { title, size, children, data } = props;
    if (!title && !data) return null;
    return (
        <div className="row">
            <div className="col-12">
                <section className="mod-image --shields">
                    <div className="sports">
                        <ModheaderSection line size={size} title={title} />

                        {children}

                        {data &&
                            data.map((x, i) => (
                                <ComShield
                                    key={i}
                                    nameShield={x.name}
                                    src={x.image}
                                    link={x.link}
                                />
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ModShield;
