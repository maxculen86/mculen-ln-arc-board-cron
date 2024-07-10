import React from 'react';
import { SITE_LANACION, API_ENV } from 'fusion:environment';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon';
import useTermica from '../../../common/hooks/useTermica';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../auth/helper/loginHelper';
import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

const ListMenu = ({ toggleDesplegable, amp, isHome }) => {
    const withBookmark =
        useTermica('bookmark_web') && isSubscribed(SUBSCRIBED_HELPER.LN);
    const classCondition = withBookmark ? 'col-2' : 'col-3';
    const bookmarkUrl =
        API_ENV === 'prod'
            ? `${SITE_LANACION}/mis-notas/`
            : `${SITE_LANACION}/pf/mis-notas/?_website=la-nacion-ar`;

    return (
        <nav className="com-nav-mobile --no-app">
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
                        className={`${classCondition} item-foo`}
                        onClick={toggleDesplegable}
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
    isHome: PropTypes.bool.isRequired,
    amp: PropTypes.bool,
    toggleDesplegable: PropTypes.func.isRequired
};

ListMenu.defaultProps = {
    amp: false
};

export default ListMenu;
