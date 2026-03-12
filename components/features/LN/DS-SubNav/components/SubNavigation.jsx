import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import Link from '../../../ui/ln/link/default';

function SubNavigation({ navigation, style }) {
    const { contextPath, deployment } = useAppContext();

    if (!navigation?.length) return null;
    // FALTA FRONT
    return (
        <>
            <Button
                id="left-arrow"
                variant="custom"
                style={style}
                size="inherit"
                iconOnly
            >
                <Icon name="arrowLeft" />
            </Button>
            <ul>
                {navigation.map(item => {
                    const {
                        key,
                        link,
                        textname,
                        title,
                        style: itemStyle
                    } = item;
                    return (
                        <li key={key} className="item">
                            <Link href={link} title={title} style={itemStyle}>
                                {textname}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Button
                id="right-arrow"
                variant="custom"
                style={style}
                size="inherit"
                iconOnly
            >
                <Icon name="arrowRight" />
            </Button>
            <script
                async
                id="mod-navigation"
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptModNavigation.min.js`
                )}
            />
        </>
    );
}

SubNavigation.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            link: PropTypes.string,
            textname: PropTypes.string,
            title: PropTypes.string,
            style: PropTypes.shape({
                color: PropTypes.string
            })
        })
    ),
    style: PropTypes.shape({
        color: PropTypes.string
    })
};

SubNavigation.defaultProps = {
    navigation: null,
    style: undefined
};

export default SubNavigation;
