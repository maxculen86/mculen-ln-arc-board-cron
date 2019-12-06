declare module 'react' {
    interface HTMLAttributes<T> extends React.DOMAttributes<T> {
        'amp'?: string;
    }
}