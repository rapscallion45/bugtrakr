import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface NextLinkComposedProps {
  href?: string;
  linkAs?: any;
  locale?: string;
  passHref?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  className?: string;
  to: any;
}

export const NextLinkComposed: FC<NextLinkComposedProps> = forwardRef((props, ref) => {
  const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      {/* @ts-ignore */}
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

interface LinkProps {
  activeClassName?: string;
  as?: any;
  className?: string;
  href?: string;
  linkAs?: any;
  noLinkStyle?: boolean;
  role?: string;
  // All other props
  [x: string]: any;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link: FC<LinkProps> = forwardRef((props, ref) => {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don't have roles.
    ...other
  } = props;

  const router = useRouter();
  // @ts-ignore
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      // @ts-ignore
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    // @ts-ignore
    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    // @ts-ignore
    return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      // @ts-ignore
      ref={ref}
      to={href}
      {...other}
    />
  );
});

export default Link;
