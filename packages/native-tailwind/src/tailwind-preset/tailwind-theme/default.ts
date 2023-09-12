import type { __Theme__ } from '../../types/theme.types';
import { colors } from './colors';
import { blur, dropShadow } from './filters';
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textIndent,
  textShadow,
  textStrokeWidth,
  wordSpacing,
} from './font';
import {
  borderRadius,
  boxShadow,
  breakpoints,
  duration,
  easing,
  lineWidth,
  ringWidth,
  spacing,
  verticalBreakpoints,
} from './mixed';
import { preflightBase } from './preflight';
import { containers, height, maxHeight, maxWidth, width } from './size';

export const theme = {
  blockSize: height,
  blur,
  borderRadius,
  boxShadow,
  breakpoints,
  colors,
  containers,
  dropShadow,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  inlineSize: width,
  letterSpacing,
  lineHeight,
  lineWidth,
  maxBlockSize: maxHeight,
  maxHeight,
  maxInlineSize: maxWidth,
  maxWidth,
  minBlockSize: maxHeight,
  minHeight: maxHeight,
  minInlineSize: maxWidth,
  minWidth: maxWidth,
  preflightBase,
  ringWidth,
  spacing,
  textIndent,
  textShadow,
  textStrokeWidth,
  verticalBreakpoints,
  width,
  wordSpacing,
} satisfies __Theme__;