import React from 'react';
import PropTypes from 'fusion:prop-types';
import { getLogoSectionClass } from '../../../common/utils/sectionUtils';

const TituloNota = ({
    globalContent: {
        headlines: { basic },
        taxonomy
    }
}) => {
    const logoSectionClass = getLogoSectionClass(taxonomy);
    return (
        <>
            {logoSectionClass && (
                <div className="hlp-marginBottom-20">
                    <i className={logoSectionClass} />
                </div>
            )}
            <h1 className="com-title-nota hlp-marginBottom-40">{basic}</h1>
        </>
    );
};

TituloNota.propTypes = {
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired,
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    additional_properties: PropTypes.shape({
                        original: PropTypes.shape({
                            style: PropTypes.shape({
                                section_logo_class: PropTypes.string
                            })
                        })
                    })
                })
            )
        })
    }).isRequired
};

export default TituloNota;
