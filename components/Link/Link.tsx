import { forwardRef } from "react"
import type { AnchorHTMLAttributes } from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import NextLink from "next/link"
import MuiLink from "@mui/material/Link"
import type { LinkProps as MuiLinkProps } from "@mui/material/Link"

type Props = MuiLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string
    activeClassName?: string
    noLinkStyle?: boolean
  }

const Link = forwardRef<HTMLAnchorElement, Props>(({ activeClassName = "active", noLinkStyle, href = "/", className, ...props }, ref) => {
  const { pathname } = useRouter()
  const classes = clsx(className, { [activeClassName]: pathname === href })
  if (noLinkStyle) return <NextLink ref={ref} href={href} className={classes} {...props} />
  return <MuiLink component={NextLink} ref={ref} href={href} className={classes} {...props} />
})
export default Link
