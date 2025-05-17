import React from 'react';

interface Props {
  word: string;
  cleanWord: string;
  importantFeatures: Array<{term: string, indicator_type: string, weight: number}> | Array<[string, number]>;
}

const FeatureHighlighter: React.FC<Props> = ({ word, cleanWord, importantFeatures }) => {
  let isHighlighted = false;
  let isLegitimate = false;
  
  if (importantFeatures && importantFeatures.length > 0) {
    // Check if we're using array format [term, weight]
    if (Array.isArray(importantFeatures[0])) {
      // Array format
      for (const feature of importantFeatures as Array<[string, number]>) {
        if (cleanWord === feature[0].toLowerCase() || cleanWord.includes(feature[0].toLowerCase())) {
          isHighlighted = true;
          isLegitimate = feature[1] < 0; // Negative weight is legitimate in the example
          break;
        }
      }
    } else {
      // Object format
      for (const feature of importantFeatures as Array<{term: string, indicator_type: string, weight: number}>) {
        if (cleanWord === feature.term.toLowerCase() || cleanWord.includes(feature.term.toLowerCase())) {
          isHighlighted = true;
          isLegitimate = feature.indicator_type.includes('Legitimate');
          break;
        }
      }
    }
  }
  
  return (
    <span className={isHighlighted ? 
      `px-0.5 rounded ${isLegitimate ? 'bg-green-200 dark:bg-green-900/50' : 'bg-yellow-200 dark:bg-yellow-900/50'}` : ''}
    >
      {word}{' '}
    </span>
  );
};

export default FeatureHighlighter;
