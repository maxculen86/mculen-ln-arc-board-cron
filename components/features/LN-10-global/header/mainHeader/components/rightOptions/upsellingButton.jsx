/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import React from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Tooltip } from '@ln/contenidos-ui-tooltip';
import classNames from 'classnames';
import { useHeaderContext } from '../../../context';
import { getTermicaValues } from '../../_helper';
import { termicaValuesUpselling } from './_helper';
import useTermica from '../../../../../../private/common/hooks/useTermica';
import get from '../../../../../../private/common/utils/get';
import handleCookie from '../../../../../../private/LN/common/utils/handleCookie';
import { addEventToDataLayerV2 } from '../../../../../../private/LN/common/utils/addEventToDataLayer';
import { isMultiproductGaComboType } from '../../../../../../private/LN/common/utils/upsellingHelper';

export function UpsellingButton() {
    const { userType, isHome } = useHeaderContext();

    const termicaUpselling = useTermica('termica_upselling');

    const { getCookie } = handleCookie();
    const gaComboType = getCookie('gaComboType') || '';
    const [valueCookie] = gaComboType.split(',');
    const isMultiproductUser = isMultiproductGaComboType(gaComboType);

    const upsellingLabels = {
        'ga-combo2': 'upselling_duo',
        'ga-comboDuo': 'upselling_triple',
        'ga-comboTriple': 'upselling_black'
    };

    const upsellingLabel = upsellingLabels[valueCookie] || '';

    const {
        black_button_text,
        class_upselling_tooltip,
        duo_button_text,
        triple_button_text,
        upselling_tooltip_text
    } = getTermicaValues(termicaValuesUpselling);

    const upsellingData = {
        'ga-combo2': {
            text: duo_button_text,
            // TODO: por  pedido del equipo de experiencias, se dejan dominios viejos de myaccount en upselling, una vez terminen la migracion, se deben apuntar nuevamente usando la variable de entorno MY_ACCOUNT_URL
            url: `https://myaccount.lanacion.com.ar/confirmar-upselling/up-selling/pasate-a-duo?cv=733&fc=277`
        },
        'ga-comboDuo': {
            text: triple_button_text,
            url: `https://myaccount.lanacion.com.ar/confirmar-upselling/up-selling/pasate-a-triple?cv=733&fc=277`
        },
        'ga-comboTriple': {
            text: black_button_text,
            url: `https://myaccount.lanacion.com.ar/confirmar-upselling/up-selling/pasate-a-black?cv=733&fc=277`
        }
    };

    const upsellingText = get(upsellingData, `${valueCookie}.text`, '');
    const upsellingUrl = get(upsellingData, `${valueCookie}.url`, '');

    const upsellingTooltipClassName = classNames(
        !isHome && 'none',
        '--mobile-none',
        class_upselling_tooltip
    );

    if (
        userType !== 'subscribed' ||
        !upsellingText ||
        !upsellingUrl ||
        isMultiproductUser ||
        !termicaUpselling
    )
        return null;

    return (
        <Button
            id="btn-upselling"
            title={upsellingText}
            variant="subscribe"
            size={{ sm: 32, md: 40 }}
            className="relative"
            onClick={() => {
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    label: upsellingLabel,
                    category: 'home_ln10',
                    action: 'header_logo'
                });
                window.location.href = valueCookie && upsellingUrl;
            }}
        >
            {upselling_tooltip_text && (
                <Tooltip
                    className={upsellingTooltipClassName}
                    text={upselling_tooltip_text}
                />
            )}
            <span
                id="button-text-upselling"
                dangerouslySetInnerHTML={{
                    __html: upsellingText
                }}
            />
        </Button>
    );
}
