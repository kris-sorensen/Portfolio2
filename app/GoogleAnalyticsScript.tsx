import Script from "next/script";
import React from "react";

const GoogleAnalyticsScript = () => {
  // * needs to be in component or layout using it. Global layout is fine if needed in whole app
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID" />
      <Script id="google-analytics-script">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'TAG_ID');`}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
