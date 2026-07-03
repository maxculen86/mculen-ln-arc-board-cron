// Publisher del bus para callers cross-bundle; contraparte del subscribe en default.jsx.
export default function publishToast(props) {
    if (window?.LN?.observable?.publish) {
        window.LN.observable.publish('addToast', props);
    }
}
