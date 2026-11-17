import type { SxProps, Theme } from "@mui/material"
import { FC } from "react"
import SimpleBarReact from "simplebar-react"
import { alpha, styled } from "@mui/material/styles"

const RootStyle = styled("div")({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
})

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}))

interface ScrollBarProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const ScrollBar: FC<ScrollBarProps> = function ScrollBar({ children, sx, ...other }) {
  return (
    <RootStyle>
      <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  )
}

export default ScrollBar
