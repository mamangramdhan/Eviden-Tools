import { useState } from 'react';

/**
 * Hook untuk handle navigation antar halaman
 * @returns {object} Navigation state dan handlers
 */
export function useNavigation() {
  const [activePage, setActivePage] = useState('home'); // home | generate | settings
  const [subPage, setSubPage] = useState(null); // ganti_nte | reguler | proman | infracare

  const handleNavChange = (page) => {
    setActivePage(page);
    setSubPage(null);
  };

  const handleSubNavigate = (sub) => {
    setSubPage(sub);
  };

  const handleBack = () => {
    setSubPage(null);
  };

  return {
    activePage,
    subPage,
    handleNavChange,
    handleSubNavigate,
    handleBack,
  };
}
