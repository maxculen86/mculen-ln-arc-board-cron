import { useAppContext } from 'fusion:context';

const TRUST_PROJECT_URL =
    'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/';

const useTrustProjectData = () => {
    const { deployment, contextPath } = useAppContext();

    return {
        image: {
            height: 20,
            src: deployment(
                `${contextPath}/resources/images/the-trust-project.webp`
            ),
            alt: 'The Trust Project'
        },
        link: {
            href: TRUST_PROJECT_URL,
            title: 'Ir a Proyecto Trust'
        }
    };
};

export default useTrustProjectData;
