import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-funky.css"; // Apply funky theme
import "prismjs/plugins/autoloader/prism-autoloader"; // Include the autoloader plugin

const PrismJSLoader = () => {
  console.log(`load prismJS Loader component`);
  // Automatically load languages dynamically using the autoloader plugin
  useEffect(() => {
    // Set the path for languages (from CDN or local path)
    Prism.plugins.autoloader.languages_path =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/";

    // Apply syntax highlighting after the languages are dynamically loaded
    Prism.highlightAll();
  }, []);

  return null;
};

export default PrismJSLoader;
