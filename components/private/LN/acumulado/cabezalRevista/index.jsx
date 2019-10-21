import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import LinkList from './linkList';
import Social from './social';

import '../../../../../resources/dist/css/ln/pages/acu-revista.css';

const HIERARCHY = 'Links-Acumulados';
const CLASS_ACU_REVISTA = 'acu-revista';
class Index extends Component {
    componentDidMount() {
        const { globalContent } = this.props;
        const wrapper = document.getElementById('wrapper');
        if (wrapper && !wrapper.classList.contains(CLASS_ACU_REVISTA)) {
            const classRevista = this.normalizeNameToClass(globalContent.name);
            wrapper.classList.add(CLASS_ACU_REVISTA);
            wrapper.classList.add(classRevista);
        }
    }

    normalizeNameToClass = name =>
        name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

    render() {
        const {
            children,
            globalContent: {
                social: { twitter, facebook, instagram },
                _website,
                _id
            },
            links
        } = this.props;
        return (
            <div className="row mod-opening-revista -with-hl">
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
                        links={links}
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
        _id: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    links: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            ulr: PropTypes.string
        })
    )
};

Index.defaultProps = {
    children: [],
    links: []
};

export default Consumer(Index);
