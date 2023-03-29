import { useState, useEffect } from 'react';
import getChildrenBySection from '../../../../chains/utils/getChildrenBySection';
import checkChildInSection from '../../../../chains/utils/checkChildBySection';

const validateSectionByDOM = (section, chainId) => {
    const wrapperSection =
        section && document.querySelector(`[data-section="${section}"]`);
    const chain =
        wrapperSection &&
        wrapperSection.querySelector(`[data-chain-id="${chainId}"]`);

    return Boolean(chain);
};

const validateByRenderables = ({
    chainId,
    renderables,
    nameSection,
    sectionValidation,
    callbackValidation
}) => {
    const section = getChildrenBySection({
        renderables,
        section: {
            title: nameSection,
            validation: sectionValidation
        }
    });

    const isValidSection = checkChildInSection(chainId, section);

    return callbackValidation(isValidSection);
};

const useValidateChain = ({
    isAdmin,
    chainId,
    renderables,
    dataSection,
    nameSection = '',
    hideChain = false,
    sectionValidation,
    callbackValidation
}) => {
    const initialValue =
        !isAdmin &&
        validateByRenderables({
            chainId,
            renderables,
            nameSection,
            sectionValidation,
            callbackValidation
        });

    const [error, setError] = useState(initialValue);

    useEffect(() => {
        if (isAdmin && !hideChain) {
            const isValidSection = validateSectionByDOM(dataSection, chainId);
            const err = callbackValidation(isValidSection);

            setError(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin, dataSection, chainId, hideChain]);
    return error;
};

export default useValidateChain;
