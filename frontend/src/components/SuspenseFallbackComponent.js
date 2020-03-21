import React, {Suspense} from 'react';

// return fallback gui when translations are not yet loaded
export default function SuspenseFallbackComponent(props) {
    return (
        <Suspense fallback={<div/>}>
            {props.children}
        </Suspense>
    );
}