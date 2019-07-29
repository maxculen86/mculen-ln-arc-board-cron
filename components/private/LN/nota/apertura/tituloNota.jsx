import React from 'react';
import PropTypes from 'fusion:prop-types';

const TituloNota = ({
    globalContent: {
        headlines: { basic },
        taxonomy: { sections }
    }
}) => {
    const logoSection = sections.find(
        x =>
            x.additional_properties &&
            x.additional_properties.original &&
            x.additional_properties.original.style &&
            x.additional_properties.original.style.section_logo_class
    );
    return (
        <>
            {logoSection && (
                <div className="hlp-marginBottom-20">
                    <i
                        className={
                            logoSection.additional_properties.original.style
                                .section_logo_class
                        }
                    />
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
                    additional_properties: PropTypes.object
                })
            )
        }).isRequired
    }).isRequired
};

export default TituloNota;
