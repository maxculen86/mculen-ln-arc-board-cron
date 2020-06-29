import { useAppContext } from 'fusion:context';

export default function NotAmp({ children }) {
    const { outputType } = useAppContext();

    return outputType !== 'amp' ? children : null;
}
