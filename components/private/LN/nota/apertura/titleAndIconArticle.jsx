import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

import LogoBase from '../../common/logoBase';
import TitleArticle from './titleArticle';
import '../../../../../resources/dist/css/ln/components/title.css';
import getTooltip from '../../common/utils/getTooltip';
import { GlobalContext } from '../../../common/context/globalContext';
import { VIDEO, LIVEBLOG } from '../../../common/utils/subtypes/subtypeHelper';
import Badge from '../../../common/badge/Badge';
import { isOlderThanXHoursAgo } from '../../../common/utils/dateAndTimeUtil';

const TitleAndIconArticle = ({
    customFields: { prefix },
    globalContent: {
        taxonomy: { sections },
        headlines,
        label,
        distributor = { name: 'LA NACION' },
        owner,
        subtype,
        display_date: displayDate
    },
    layout
}) => {
    const gc = useContext(GlobalContext);
    const siteService = get(gc, 'state.siteService', {});
    const sponsored = get(owner, 'sponsored', false);
    const advertiser = get(label, 'marca_anunciante.text', null);

    let keyTooltip = '';
    if (sponsored) keyTooltip = 'Espacio Patrocinado';
    if (advertiser) keyTooltip = 'Content LAB';
    const tooltip = getTooltip(keyTooltip, siteService);
    const coverageEndTime = !isOlderThanXHoursAgo(displayDate, 12);
    return (
        <>
            <LogoBase
                sections={sections}
                layout={layout}
                distributor={distributor}
                sponsored={sponsored}
                advertiser={advertiser}
                subtype={subtype}
                tooltip={tooltip}
            />
            {subtype === LIVEBLOG && coverageEndTime && (
                <div className="badge-container">
                    <Badge type="liveblog-red">EN VIVO</Badge>
                </div>
            )}
            <TitleArticle
                prefix={prefix || ''}
                size={subtype === VIDEO && '--xl'}
                headlines={headlines}
            />
        </>
    );
};

TitleAndIconArticle.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    }).isRequired,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            volanta: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        headlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired,
        distributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired
        }).isRequired,
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        }).isRequired,
        owner: PropTypes.shape({
            sponsored: PropTypes.bool
        }),
        subtype: PropTypes.string,
        display_date: PropTypes.string,
        siteService: PropTypes.shape({
            tooltips: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    label: PropTypes.string
                })
            )
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default TitleAndIconArticle;
