import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import HeaderContainer from '../../private/OTT/common/header/containers/header';

import {
    buildHeaderCustomFields,
    getHeaderCustomFields
} from './../../private/OTT/common/header/CustomFieldsHeaderHelper';

let MAX_LINKS_COUNT = 6;

class Header extends Component {
    constructor(props) {
        super(props);
        this.HeaderCustomFields = getHeaderCustomFields(
            MAX_LINKS_COUNT,
            this.props
        ).filter(elem => elem != null && elem.description != null);
    }
    render() {
        return <HeaderContainer items={this.HeaderCustomFields} />;
    }
}

function getCustomFields() {
    const HeaderCustomFields = buildHeaderCustomFields(MAX_LINKS_COUNT);
    return PropTypes.shape(Object.assign(HeaderCustomFields));
}

Header.propTypes = {
    customFields: getCustomFields()
};

Header.static = true;

export default Header;
