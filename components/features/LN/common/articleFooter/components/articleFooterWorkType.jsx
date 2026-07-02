import React from 'react';
import { Tooltip } from '@ln/common-ui-tooltip';
import '../../../../../../resources/packages/css/@ln/common-ui-tooltip/index.css';

/**
 * Tipo de trabajo de la nota (reemplaza el texto "Noticia original" del mock).
 *
 * Recibe un objeto `tooltipData`. Si `tooltipData.label` existe, el texto se
 * muestra como disparador de un tooltip que revela la descripción completa;
 * de lo contrario se muestra como texto plano.
 *
 * @param {object} props
 * @param {{ label?: string, text?: string }} [props.tooltipData] - Texto visible
 *   (`text`) y descripción completa del tooltip (`label`).
 * @returns {React.ReactElement|null}
 */
function WorkType({ tooltipData }) {
    if (!tooltipData?.text) return null;

    return (
        <div className="w-full flex flex-row items-center md:w-auto gap-4">
            <span className="text-small-lg font-normal text-base-default">
                Tipo de trabajo:
            </span>
            {tooltipData?.label ? (
                <Tooltip
                    toggleOn="hover"
                    position="bottom-center"
                    className="bg-white-default border-muted shadow-[0px_0px_8px_0px_rgba(0,0,0,0.32),0px_16px_32px_0px_rgba(0,0,0,0.24)] max-w-250 rounded-4 border-solid border-1 z-1500"
                    content={
                        <span className="leading-[130%] text-small-lg font-normal text-base-default">
                            {tooltipData?.label}
                        </span>
                    }
                    disableTrigger={Boolean(!tooltipData?.label)}
                >
                    <span className="tooltip-sibling-hover text-label-sm font-bold text-base-default">
                        {tooltipData?.text}
                    </span>
                </Tooltip>
            ) : (
                <strong className="text-label-sm font-bold text-base-default">
                    {tooltipData?.text}
                </strong>
            )}
        </div>
    );
}

WorkType.displayName = 'ArticleFooterUi.WorkType';

export default WorkType;
