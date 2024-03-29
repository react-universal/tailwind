import { parsedRuleToClassName, matchCssObject } from '@universal-labs/native-twin';
import type { Rule } from '@universal-labs/native-twin';
import type { __Theme__ } from '@universal-labs/native-twin';

export const outlineRules: Rule<__Theme__>[] = [
  // matchThemeValue('outline-width-', 'lineWidth', 'outlineWidth'),
  // matchThemeColor('outline-', 'outlineColor'),
  // matchThemeValue('outline-offset-', 'lineWidth', 'outlineOffset'),
  // matchThemeValue('outline-', '', 'outlineStyle', {
  //   customValues: Object.fromEntries(outlineStyles),
  // }),
  matchCssObject('outline-none', (match, ctx, rule) => {
    return {
      className: parsedRuleToClassName(rule),
      declarations: [
        {
          prop: 'outline',
          value: '2px solid transparent',
        },
        {
          prop: 'outlineOffset',
          value: '2px',
        },
      ],
      selectors: [],
      conditions: rule.v,
      important: rule.i,
      precedence: rule.p,
    };
  }),
];

export const appearanceRules: Rule[] = [
  matchCssObject('appearance-none', (match, ctx, rule) => ({
    className: parsedRuleToClassName(rule),
    declarations: [
      {
        prop: 'appearance',
        value: 'none',
      },
    ],
    conditions: rule.v,
    selectors: [],
    important: rule.i,
    precedence: rule.p,
  })),
];
