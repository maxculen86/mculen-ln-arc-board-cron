/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// TODO: evaluar con queryly cambio de tag <label> por <button> para evitar mal uso de la etiqueta
import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

function FirstSection() {
    return (
        <ul className="list flex flex-column gap-8 gap-0_l lg-none bg-light-100 --first-section">
            <li className="item mb-8 bg-white">
                <label
                    className="flex w-100 cursor-pointer"
                    htmlFor="queryly_toggle"
                    onClick={() =>
                        addEventToDataLayerV2({
                            event: 'e_linkclick',
                            action: 'menu_secciones',
                            category: 'home_ln10',
                            label: 'buscar'
                        })
                    }
                >
                    <div className="flex ai-center flex-grow-1 py-8 px-20">
                        <Text className="text-14">Buscá en LA NACION...</Text>
                    </div>
                    <div className="flex w-50 h-50 ai-center jc-center">
                        <Icon size={16}>
                            <IconSprite name="search" critical />
                        </Icon>
                    </div>
                </label>
            </li>
            <li className="item border border-top border-thin border-light-300 bg-white">
                <Link
                    href="https://masmusica.lanacion.com.ar/"
                    target="_blank"
                    className="ai-center jc-between font-bold"
                    title="Ir a LN 104.9 + Música"
                >
                    <span className="inline-flex ai-center gap-8">
                        <Icon
                            hasWrapper
                            bgColor="var(--neutral-light-50)"
                            size={16}
                        >
                            <IconSprite
                                name="lnRadio"
                                fill="var(--neutral-light-800)"
                                critical
                            />
                        </Icon>
                        LN 104.9 + Música
                    </span>
                </Link>
            </li>
        </ul>
    );
}

export default FirstSection;
