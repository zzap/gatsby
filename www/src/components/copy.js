import React, { useState } from "react"
import PropTypes from "prop-types"

import { ScreenReaderText } from "./feedback-widget/styled-elements"
import {
  space,
  fonts,
  fontSizes,
  colors,
  lineHeights,
  shadows,
  transition,
} from "../utils/presets"

const copyToClipboard = content => {
  const el = document.createElement(`textarea`)
  el.value = content
  el.setAttribute(`readonly`, ``)
  el.style.position = `absolute`
  el.style.left = `-9999px`
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  document.body.removeChild(el)
}

const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

function Copy({ className, content, duration, fileName, trim = false }) {
  const [copied, setCopied] = useState(false)

  const label = copied
    ? `${fileName ? fileName + ` ` : ``}copied to clipboard`
    : `${fileName ? fileName + `: ` : ``}copy code to clipboard`

  return (
    <button
      name={label}
      className={className}
      disabled={copied}
      css={{
        backgroundColor: `transparent`,
        border: `none`,
        color: colors.grey[60],
        cursor: `pointer`,
        fontSize: fontSizes[2],
        fontFamily: fonts.header,
        lineHeight: lineHeights.solid,
        padding: `${space[2]} ${space[2]}`,
        transition: `${transition.speed.default} ${transition.curve.default}`,
        "&[disabled]": {
          cursor: `not-allowed`,
        },
        ":not([disabled]):hover": {
          backgroundColor: colors.purple[60],
          boxShadow: shadows.raised,
          color: colors.white,
        },
        ":active": {
          boxShadow: shadows.floating,
        },
      }}
      onClick={async () => {
        copyToClipboard(trim ? content.trim() : content)

        setCopied(true)

        await delay(duration)

        setCopied(false)
      }}
    >
      {copied ? `Copied` : `Copy`}
      <ScreenReaderText aria-roledescription="status">{label}</ScreenReaderText>
    </button>
  )
}

Copy.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trim: PropTypes.bool,
}

Copy.defaultProps = {
  duration: 5000,
  fileName: ``,
}

export default Copy
