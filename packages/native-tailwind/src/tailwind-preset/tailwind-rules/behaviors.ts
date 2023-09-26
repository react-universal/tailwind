import { matchCssObject } from '../../theme/rule-resolver';
import type { Rule } from '../../types/config.types';
import type { __Theme__ } from '../../types/theme.types';

export const outlineRules: Rule<__Theme__>[] = [
  // matchThemeValue('outline-width-', 'lineWidth', 'outlineWidth'),
  // matchThemeColor('outline-', 'outlineColor'),
  // matchThemeValue('outline-offset-', 'lineWidth', 'outlineOffset'),
  // matchThemeValue('outline-', '', 'outlineStyle', {
  //   customValues: Object.fromEntries(outlineStyles),
  // }),
  matchCssObject('outline-none', () => {
    return { outline: '2px solid transparent', outlineOffset: '2px' };
  }),
];

export const appearanceRules: Rule[] = [
  matchCssObject('appearance-none', () => ({
    WebkitAppearance: 'none',
    appearance: 'none',
  })),
];
