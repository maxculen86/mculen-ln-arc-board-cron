import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import LinkList from './linkList';
import Social from './social';

import '../../../../../resources/dist/css/ln/pages/acu-revista.css';

const HIERARCHY = 'Links-Acumulados';
const CLASS_ACU_REVISTA = 'acu-revista';
class Index extends Component {
    componentDidMount() {
        const {
            globalContent: {
                style: { section_style_name }
            }
        } = this.props;
        const wrapper = document.getElementById('wrapper');
        if (wrapper && !wrapper.classList.contains(CLASS_ACU_REVISTA)) {
            wrapper.classList.add(CLASS_ACU_REVISTA);
            wrapper.classList.add(section_style_name);
        }
    }

    render() {
        const {
            children,
            globalContent: {
                social: { twitter, facebook, instagram },
                _website,
                _id
            }
        } = this.props;
        return (
            <div className="row subheader-acu">
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
        );
    }
}

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

// Index.defaultProps = {
//     children: []
// };

export default Index;
