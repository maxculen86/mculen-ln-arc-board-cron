import React from 'react';
import { SITE_LANACION, API_ENV } from 'fusion:environment';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon';
import findTermica from '../../../common/utils/findTermica';
import { isSubscribed } from '../utils/contextHelper';
import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

const ListMenu = ({ toglleDesplegable, amp, isHome }) => {
    const withBookmark = findTermica('bookmark_web') && isSubscribed();
    const classCondition = withBookmark ? 'col-2' : 'col-3';
    const bookmarkUrl =
        API_ENV === 'prod'
            ? `${SITE_LANACION}/mis-notas/`
            : `${SITE_LANACION}/pf/mis-notas/?_website=la-nacion-ar`;

    return (
        <nav className="com-nav-mobile">
            <div className="row">
                <Icon
                    name="home"
                    href={isHome ? '#' : 'https://www.lanacion.com.ar/'}
                    target="_top"
                    extraClass={`${classCondition} item-foo nacion-home`}
                >
                    <p>Home</p>
                </Icon>

                {amp ? (
                    <button
                        type="button"
                        className="col-3 item-foo"
                        on="tap:sidebar-left.toggle"
                    >
                        <Icon name="sections" />
                        <p>Secciones</p>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="col-3 item-foo"
                        onClick={toglleDesplegable}
                    >
                        <Icon name="sections" />
                        <p>Secciones</p>
                    </button>
                )}

                {withBookmark && !amp && (
                    <Icon
                        name="ln"
                        href={bookmarkUrl}
                        target="_top"
                        extraClass={`${classCondition} item-foo nacion-home`}
                    >
                        <p>Mis Notas</p>
                    </Icon>
                )}

                <Icon
                    name="club-card"
                    href="https://club.lanacion.com.ar/"
                    extraClass={`${classCondition} item-foo`}
                >
                    <p>Club LN</p>
                </Icon>

                <Icon
                    name="user"
                    href="https://myaccount.lanacion.com.ar/mi-usuario/"
                    extraClass={`${classCondition} item-foo`}
                >
                    <p>Mi Cuenta</p>
                </Icon>
            </div>
        </nav>
    );
};

ListMenu.propTypes = {
    // showNav: PropTypes.string.isRequired,
    isHome: PropTypes.bool.isRequired,
    amp: PropTypes.bool,
    toglleDesplegable: PropTypes.func.isRequired
};

ListMenu.defaultProps = {
    amp: false
};

export default ListMenu;
