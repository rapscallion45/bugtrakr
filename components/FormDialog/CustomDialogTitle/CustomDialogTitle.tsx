import type { ReactNode } from "react"
import { DialogTitle as MuiDialogTitle, IconButton, Box } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export default function DialogTitle({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <MuiDialogTitle sx={{ display: "flex", alignItems: "center", p: 2 }}>
      <Box component={"span"} sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <IconButton aria-label={"close"} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  )
}
