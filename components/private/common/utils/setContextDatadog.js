/* eslint-disable react-hooks/rules-of-hooks */
import { useAppContext } from 'fusion:context';

const setContextDatadog = () => {
    const {
        globalContent,
        template,
        outputType,
        globalContentConfig,
        layout
    } = useAppContext();
    if (typeof window !== 'undefined') {
        const attName = 'fusion_info';
        const obj = {
            layout,
            contentSource: globalContentConfig && globalContentConfig.source,
            outputType,
            subtype: globalContent && globalContent.subtype,
            template,
            nodeType: globalContent && globalContent.node_type
        };

        window.DD_LOGS.onReady(() => {
            window.DD_LOGS.logger.addContext(attName, obj);
        });

        window.DD_RUM.onReady(() => {
            window.DD_RUM.addRumGlobalContext(attName, obj);
        });
    }
};

export default setContextDatadog;
