import React from 'react';
import PropTypes from 'fusion:prop-types';
import LinkList from './linkList';
import Social from './social';

import '../../../../../resources/dist/css/ln/pages/acu-revista.css';

const HIERARCHY = 'Links-Acumulados';

const Index = props => {
    const {
        children,
        globalContent: {
            social: { twitter, facebook, instagram },
            _website,
            _id
        }
    } = props;
    return (
        <div className="row subheader-acu">
            <div className="col-12">
                {/* LUGAR PARA EL ANEXO */}
                {children}
                <section className="lay">
                    <Social
                        twitter={twitter}
                        facebook={facebook}
                        instagram={instagram}
                    />
                    <div className="logo">
                        <i className="logo-revista" />
                    </div>
                    <LinkList
                        hierarchy={HIERARCHY}
                        website={_website}
                        id={_id}
                    />
                </section>
            </div>
        </div>
    );
};

Index.propTypes = {
    globalContent: PropTypes.shape({
        social: PropTypes.shape({
            twitter: PropTypes.string,
            facebook: PropTypes.string,
            instagram: PropTypes.string
        }),
        _website: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        style: PropTypes.shape({
            section_style_name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Index;
