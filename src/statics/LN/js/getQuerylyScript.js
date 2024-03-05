import dynamicallyLoadScript from '../../../../components/private/LN/common/utils/dynamicallyLoadScript';

window.addEventListener('DOMContentLoaded', () => {
    dynamicallyLoadScript('//www.queryly.com/js/queryly.v4.js', 'body').then(
        () => {
            const initScript = document.createElement('script');
            initScript.innerHTML = `queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));`;
            document.body.appendChild(initScript);
        }
    );
});
