import type { Preset, __Theme__ } from '@universal-labs/native-twin';
import { themeRules } from './tailwind-rules';
import * as tailwindTheme from './tailwind-theme';
import { preflight } from './tailwind-theme/preflight';

export interface TailwindPresetBaseOptions {
  colors?: __Theme__['colors'];
  /** Allows to disable to tailwind preflight (default: `false` eg include the tailwind preflight ) */
  disablePreflight?: boolean | undefined;
}

export function presetTailwind({
  colors,
  disablePreflight,
}: TailwindPresetBaseOptions = {}): Preset<__Theme__> {
  let userColors: __Theme__['colors'] = {};
  if (colors) {
    userColors = {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      ...colors,
    };
  } else {
    userColors = tailwindTheme.colors;
  }
  return {
    // allow other preflight to run
    preflight: disablePreflight ? undefined : preflight,
    theme: {
      ...tailwindTheme,
      ...tailwindTheme.theme,
      colors: {
        ...userColors,
      },
    },
    rules: themeRules,
  };
}
