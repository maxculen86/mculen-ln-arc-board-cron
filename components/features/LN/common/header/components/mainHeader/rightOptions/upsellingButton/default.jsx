import React from 'react';
import { MY_ACCOUNT_URL } from 'fusion:environment';
import Button from '../../../../../../../ui/ln/button/default';
import useTermica from '../../../../../../../../private/common/hooks/useTermica';
import handleCookie from '../../../../../../../../private/LN/common/utils/handleCookie';
import get from '../../../../../../../../private/common/utils/get';
import { isMultiproductGaComboType } from '../../../../../../../../private/LN/common/utils/upsellingHelper';
import {
    getTermicaValues,
    termicaValuesUpselling,
    upsellingLabels
} from '../helpers';
import { useHeaderContext } from '../../../../context';
import { addEventToDataLayerV2 } from '../../../../../../../../private/LN/common/utils/addEventToDataLayer';
import UpsellingTooltip from './UpsellingTooltip';
import { USER_TYPES } from '../../../../../utils/constants';

function UpsellingButton({ isHome }) {
    const { userType } = useHeaderContext();
    const isActiveTermicaUpselling = useTermica('termica_upselling');
    const { getCookie } = handleCookie();
    const gaComboType = getCookie('gaComboType') || '';
    const [valueCookie] = gaComboType.split(',');
    const isMultiproductUser = isMultiproductGaComboType(gaComboType);

    const upsellingLabel = upsellingLabels[valueCookie] || '';

    const {
        black_button_text: blackButtonText,
        duo_button_text: duoButtonText,
        triple_button_text: tripleButtonText,
        upselling_tooltip_text: upsellingTooltipText
    } = getTermicaValues(termicaValuesUpselling);

    const upsellingData = {
        'ga-combo2': {
            text: duoButtonText,
            url: `${MY_ACCOUNT_URL}/confirmar-upselling/up-selling/pasate-a-duo?cv=733&fc=277`
        },
        'ga-comboDuo': {
            text: tripleButtonText,
            url: `${MY_ACCOUNT_URL}/confirmar-upselling/up-selling/pasate-a-triple?cv=733&fc=277`
        },
        'ga-comboTriple': {
            text: blackButtonText,
            url: `${MY_ACCOUNT_URL}/confirmar-upselling/up-selling/pasate-a-black?cv=733&fc=277`
        }
    };

    const upsellingText = get(upsellingData, `${valueCookie}.text`, '');
    const upsellingUrl = get(upsellingData, `${valueCookie}.url`, '');

    if (
        userType !== USER_TYPES.SUBSCRIBED ||
        !upsellingText ||
        !upsellingUrl ||
        isMultiproductUser ||
        !isActiveTermicaUpselling
    )
        return null;

    return (
        <UpsellingTooltip
            defaultOpen={Boolean(upsellingTooltipText)}
            tooltipText={upsellingTooltipText}
            isActiveTermicaUpselling={isActiveTermicaUpselling}
            isHome={isHome}
        >
            <Button
                id="btn-upselling"
                title={upsellingText}
                color="subscribe"
                className="relative"
                asChild
                onClick={() => {
                    addEventToDataLayerV2({
                        event: 'e_linkclick',
                        label: upsellingLabel,
                        category: 'home_ln10',
                        action: 'header_logo'
                    });
                }}
            >
                <a href={upsellingUrl} aria-label={upsellingText}>
                    <span
                        id="button-text-upselling"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: upsellingText
                        }}
                    />
                </a>
            </Button>
        </UpsellingTooltip>
    );
}

export default UpsellingButton;
