import { FC } from "react"
import type { SxProps, Theme } from "@mui/material"
import { styled } from "@mui/material/styles"

const BoxStyle = styled("img")(({ theme }) => ({
  marginTop: "7px",
  width: 40,
  height: 40,
  maxWidth: 60,
  [theme.breakpoints.up("sm")]: {
    width: 120,
    height: 60,
  },
  [theme.breakpoints.up("lg")]: {
    width: 60,
    height: 60,
  },
}))

interface Props {
  sx?: SxProps<Theme>
}

const Logo: FC<Props> = function Logo({ sx = null }) {
  return <BoxStyle alt={"BugTrakr"} src={"/static/logo.png"} sx={sx} />
}

export default Logo
