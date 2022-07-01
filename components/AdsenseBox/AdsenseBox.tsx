import { FC, useEffect } from 'react';

interface AdsenseBoxProps {
  slot: string;
}

const AdsenseBox: FC<AdsenseBoxProps> = function AdsenseBox({ slot }) {
  useEffect(() => {
    /* Grab Google Ads */
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
      data-ad-slot={slot}
      data-adtest={process.env.GOOGLE_ADSENSE_TEST}
      data-ad-format="fluid"
      data-full-width-responsive="true"
    />
  );
};
export default AdsenseBox;
