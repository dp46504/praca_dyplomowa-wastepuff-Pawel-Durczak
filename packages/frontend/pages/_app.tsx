import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    setAppReady(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {(typeof window === 'undefined') !== null && appReady && (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default MyApp;
