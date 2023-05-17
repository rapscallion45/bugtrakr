import React, { FC } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const NextAuthBtnStyle = styled(Button)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  borderColor: 'rgba(0,0,0,.1)',
  borderWidth: '2px',
  borderStyle: 'outset',
  borderRadius: '0.5rem',
  color: theme.palette.common.black,
  fontSize: '.9rem',
  fontWeight: '500',
  margin: '0 0 .75rem',
  minHeight: '62px',
  padding: '.75rem 1rem',
  position: 'relative',
  transition: 'all .1s ease-in-out',
}));

interface NextAuthBtnsProps {
  providers: any;
}

const NextAuthBtns: FC<NextAuthBtnsProps> = function NextAuthBtns({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider: any) =>
        provider.name !== 'Credentials' ? (
          <NextAuthBtnStyle key={provider.name} onClick={() => signIn(provider.id)}>
            <Image
              loading="lazy"
              height="24"
              width="24"
              id={`provider-logo-${provider.name}`}
              src={`https://authjs.dev/img/providers/${provider.name?.toLowerCase()}.svg`}
              alt={`${provider.name} logo`}
            />
            <span style={{ marginLeft: 20 }}>Sign in with {provider.name}</span>
          </NextAuthBtnStyle>
        ) : null
      )}
    </>
  );
};
export default React.memo(NextAuthBtns);
