import { useState, useCallback, useEffect } from 'react';

//@ts-ignore
import { enquireScreen } from 'enquire-js';

export default function SystmeModel() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return {
    isMobile,
    setIsMobile,
  };
}
