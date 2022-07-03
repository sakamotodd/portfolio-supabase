import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const useMail = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const sendAPI = useCallback(async () => {
    await fetch('/api/mail', {
      method: 'POST',
      body: `
        名前
        ${name}
        お問い合わせ内容
        ${message}
        `,
    }).then((res) => res.json());
    setName('');
    setMail('');
    setMessage('');
    router.push('/');
  }, []);

  return {
    mail,
    setMail,
    name,
    setName,
    message,
    setMessage,
    sendAPI,
  };
};
