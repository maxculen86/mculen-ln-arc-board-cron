import { SITE_FOODIT } from 'fusion:environment';

export const BuildComments = ({
    _id = '',
    canonicalUrl = '',
    mobile = '',
    basic = '',
    layoutsName = {},
    layout = '',
    allowComments
}) => {
    const layoutsWithComments = [
        layoutsName.FooditFichaReceta,
        layoutsName.FooditFichaNota
    ];

    if (!layoutsWithComments.includes(layout) || !allowComments) {
        return <></>;
    }

    const title = mobile || basic;

    return (
        <>
            <meta name="vf:container_id" content={_id} />
            <meta name="vf:lang" content="es" />
            <meta name="vf:url" content={`${SITE_FOODIT}${canonicalUrl}`} />
            <meta name="vf:title" content={title} />
        </>
    );
};

export default BuildComments;
