import { useState, useEffect } from 'react';
import { AUTH_CONFIG } from '../constants/config';
import { isLocalhost, isInsideTelegram, getTelegramUser, initTelegramApp } from '../lib/utils';

/**
 * Hook untuk handle autentikasi Telegram
 * @returns {object} Auth state dan user data
 */
export function useAuth() {
  const [user, setUser] = useState({ first_name: 'Teknisi', username: 'Guest', id: null });
  const [techData, setTechData] = useState({ namaLengkap: '', nik: '', area: '', mitra: '' });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      const { BYPASS_AUTH, ALLOWED_USERS } = AUTH_CONFIG;

      // Bypass mode - untuk development/testing
      if (BYPASS_AUTH) {
        setUser({ first_name: 'Teknisi', id: 'BYPASS', username: 'guest' });
        setTechData({ namaLengkap: 'Mode Akses Sementara', nik: '------', area: '---', mitra: '---' });
        setIsAuthorized(true);
        setLoading(false);
        return;
      }

      // Localhost development mode
      if (isLocalhost()) {
        setUser({ first_name: 'Developer', id: 'LOCAL', username: 'dev_local' });
        setTechData({ namaLengkap: 'Dev Mode', nik: '000000', area: 'LOCAL', mitra: 'LOCAL' });
        setIsAuthorized(true);
        setLoading(false);
        return;
      }

      // Telegram WebApp mode
      if (isInsideTelegram()) {
        const telegramUser = getTelegramUser();
        if (telegramUser) {
          setUser(telegramUser);
          const found = ALLOWED_USERS.find(u => u.id === Number(telegramUser.id));
          if (found) {
            setTechData(found);
            setIsAuthorized(true);
            initTelegramApp();
          } else {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }

      setLoading(false);
    };

    const timer = setTimeout(checkAccess, 400);
    return () => clearTimeout(timer);
  }, []);

  return { user, techData, isAuthorized, loading };
}
