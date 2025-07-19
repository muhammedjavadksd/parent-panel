import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // If you are using Next.js or another SSR framework,
    // you need to ensure this code only runs on the client.
    // The `mounted` state check handles this.
    if (typeof document === 'undefined') {
        return null;
    }

    let portalRoot = document.getElementById('portal-root');
    if (!portalRoot) {
        portalRoot = document.createElement('div');
        portalRoot.id = 'portal-root';
        // Add styles to ensure it doesn't affect layout
        portalRoot.style.position = 'relative';
        portalRoot.style.zIndex = '9999'; // High z-index for the container
        document.body.appendChild(portalRoot);
    }

    return mounted ? createPortal(children, portalRoot) : null;
};

export default Portal;