import type { MotionProps } from "framer-motion"
import { FC } from "react"
import { motion } from "framer-motion"
import { Box } from "@mui/material"
import { varWrapEnter } from "./variants"

interface MotionContainerProps {
  initial?: MotionProps["initial"]
  open: boolean
  children?: React.ReactNode
}

const MotionContainer: FC<MotionContainerProps> = function MotionContainer({ open, children = null, ...other }) {
  return (
    <Box component={motion.div} initial={false} animate={open ? "animate" : "exit"} variants={varWrapEnter} {...other}>
      {children}
    </Box>
  )
}

export default MotionContainer
