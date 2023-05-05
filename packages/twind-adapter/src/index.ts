import {
  twind,
  virtual,
  tx as tx$,
  injectGlobal as injectGlobal$,
  cx as cx$,
  stringify,
  escape,
  style,
  hash,
  defineConfig,
  parse,
  parseValue,
  asArray,
  normalize,
  install,
  extract,
} from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import twindPresetReactNative from './presets/preset-react-native';
import { translateRules } from './rules/translate';
import type { CustomConfig } from './types';

const defaultConfig = defineConfig({
  ignorelist: [''],
  preflight: false,
  presets: [
    presetTailwind({ disablePreflight: true }),
    twindPresetReactNative({ baseRem: 16 }),
  ],
  rules: [...translateRules],
});

export function initialize /* #__PURE__ */(
  theme: Exclude<CustomConfig['theme'], undefined> = {},
) {
  const tw = twind(
    {
      ...defaultConfig,
      theme: {
        ...defaultConfig?.theme,
        extend: {
          ...defaultConfig?.theme?.extend,
          ...theme,
        },
      },
    },
    virtual(true),
  );
  const tx = tx$.bind(tw);
  const injectGlobal = injectGlobal$.bind(tw);
  const cx = cx$.bind(tw);
  return {
    tw,
    tx,
    injectGlobal,
    cx,
  };
}

export { escape };
export { stringify };
export { style, hash, normalize };
export { twindPresetReactNative, parse, parseValue, asArray, install, extract };
