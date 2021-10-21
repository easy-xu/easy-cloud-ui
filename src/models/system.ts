import { useState, useCallback } from 'react';

export default function SystmeModel() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return {
    isMobile,
    setIsMobile,
  };
}
