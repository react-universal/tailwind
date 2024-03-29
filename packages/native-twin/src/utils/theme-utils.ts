import { atRulePrecedence, pseudoPrecedence } from '@universal-labs/css';
import { parsedRuleToClassName } from '../convert/ruleToClassName';
import type { ThemeContext } from '../types/config.types';
import type { ParsedRule } from '../types/tailwind.types';
import type { Colors, __Theme__ } from '../types/theme.types';
import { mql } from './css-utils';
import { asArray } from './helpers';

// 0: '0px',
// 2: '2px',
// 4: '4px',
// 8: '8px',
export function createExponentialUnits(
  stop: number,
  unit: string,
  start = 0,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (; start <= stop; start = start * 2 || 1) {
    result[start] = start + unit;
  }

  return result;
}

// 3: '.75rem',
// 4: '1rem',
// 5: '1.25rem',
// 6: '1.5rem',
// 7: '1.75rem',
// 8: '2rem',
// 9: '2.25rem',
// 10: '2.5rem',
export function createLinearUnits(
  stop: number,
  unit = '',
  divideBy = 1,
  start = 0,
  step = 1,
  result: Record<string, string> = {},
): Record<string, string> {
  for (; start <= stop; start += step) {
    result[start] = start / divideBy + unit;
  }

  return result;
}

// '1/2': '50%',
// '1/3': '33.333333%',
// '2/3': '66.666667%',
// '1/4': '25%',
// '2/4': '50%',
// '3/4': '75%',
// '1/5': '20%',
// '2/5': '40%',
// '3/5': '60%',
// '4/5': '80%',
// '1/6': '16.666667%',
// '2/6': '33.333333%',
// '3/6': '50%',
// '4/6': '66.666667%',
// '5/6': '83.333333%',
export function createPercentRatios(start: number, end: number): Record<string, string> {
  const result: Record<string, string> = {};

  do {
    // XXX: using var to avoid strange bug when generating cjs where `= 1` is removed
    for (var dividend = 1; dividend < start; dividend++) {
      result[`${dividend}/${start}`] = Number(((dividend / start) * 100).toFixed(6)) + '%';
    }
  } while (++start <= end);

  return result;
}

export function flattenColorPalette(
  colors: Colors,
  path: string[] = [],
): Record<string, string> {
  const flatten: Record<string, string> | Colors = {};

  for (const key in colors) {
    const value = colors[key];

    let keyPath = [...path, key];
    if (value) {
      flatten[keyPath.join('-')] = value;
    }

    if (key == 'DEFAULT') {
      keyPath = path;
      if (value) {
        flatten[path.join('-')] = value;
      }
    }

    if (typeof value == 'object') {
      Object.assign(flatten, flattenColorPalette(value, keyPath));
    }
  }

  return flatten as any;
}

export function flattenThemeSection(obj: any, path: string[] = []) {
  const flatten: Record<string, any> = {};
  for (const key in obj) {
    const value = obj[key];
    let keyPath = [...path, key];
    if (value) {
      flatten[keyPath.join('-')] = value;
    }
    if (key == 'DEFAULT') {
      keyPath = path;
      if (value) {
        flatten[path.join('-')] = value;
      }
    }
    if (typeof value == 'object') {
      Object.assign(flatten, flattenThemeSection(value, keyPath));
    }
  }
  return flatten;
}

export function convert<Theme extends __Theme__ = __Theme__>(
  { n: name, i: important, v: variants = [], m: modifier }: ParsedRule,
  context: ThemeContext<Theme>,
  precedence: number,
  conditions?: string[],
): ParsedRule {
  if (name) {
    name = parsedRuleToClassName({ n: name, i: important, v: variants, m: modifier, p: 0 });
  }

  conditions = [...asArray(conditions)];

  for (const variant of variants) {
    const screen = context.theme('screens', variant);
    if (context.mode == 'native') {
      if (screen) {
        conditions.push(screen);
      } else {
        conditions.push(variant);
      }
      continue;
    }
    for (const condition of asArray((screen && mql(screen)) || context.v(variant))) {
      if (!condition) continue;
      conditions.push(condition);

      precedence |= screen
        ? (1 << 26) /* Shifts.screens */ | atRulePrecedence(condition)
        : variant == 'dark'
        ? 1 << 30 /* Shifts.darkMode */
        : condition[0] == '@'
        ? atRulePrecedence(condition)
        : pseudoPrecedence(condition);
    }
  }

  return { n: name, p: precedence, i: important, m: modifier, v: conditions };
}
