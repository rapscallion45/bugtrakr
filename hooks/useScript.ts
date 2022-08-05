import { useEffect } from 'react';

const useScript = (url, onLoad, async, defer) => {
  useEffect(() => {
    const script = document.createElement('script');

    /* set url of script as source */
    script.src = url;

    /* set onload of script */
    script.onload = onLoad;

    /* set script params */
    script.async = async;
    script.defer = defer;

    /* add script to the document head */
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onLoad]);
};
export default useScript;
