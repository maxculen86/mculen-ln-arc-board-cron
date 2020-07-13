import { useAppContext } from 'fusion:context';

export default function AmpContainer({ children, isForAmp }) {
    const { outputType } = useAppContext();

    if (outputType === 'amp' && isForAmp) return children;

    if (outputType !== 'amp' && !isForAmp) return children;

    return null;
}
