/**********************************************
 * Readapted from Twind                       *
 * Credits: @sastan https://github.com/sastan *
 * Repo: https://github.com/tw-in-js/twind    *
 * ********************************************
 */
import { defineConfig } from './config/define-config';
import { translateRuleSet } from './convert/ruleToEntry';
import { parseTWTokens } from './parsers/tailwind-classes.parser';
import { createThemeContext } from './theme/theme.context';
import type { Preset, TailwindConfig, TailwindUserConfig } from './types/config.types';
import type { Sheet, SheetEntry } from './types/css.types';
import type { ExtractThemes, RuntimeTW, __Theme__ } from './types/theme.types';
import { sortedInsertionIndex } from './utils/sorted-insertion-index';
import { interpolate } from './utils/string-utils';

export function createTailwind<Theme extends __Theme__ = __Theme__, Target = unknown>(
  config: TailwindConfig<Theme>,
  sheet: Sheet<Target>,
): RuntimeTW<Theme, Target>;

export function createTailwind<
  Theme = __Theme__,
  Presets extends Preset<any>[] = Preset[],
  Target = unknown,
>(
  config: TailwindUserConfig<Theme, Presets>,
  sheet: Sheet<Target>,
): RuntimeTW<__Theme__ & ExtractThemes<Theme, Presets>, Target>;

export function createTailwind(
  userConfig: TailwindConfig<any> | TailwindUserConfig<any>,
  sheet: Sheet,
): RuntimeTW {
  const config = defineConfig(userConfig);
  const context = createThemeContext<__Theme__>(config);
  let cache = new Map<string, SheetEntry[]>();
  const insertedRules = new Set<string>();
  // An array of precedence by index within the sheet
  // always sorted
  let sortedPrecedences: SheetEntry[] = [];

  function insert(entry: SheetEntry) {
    insertedRules.add(entry.className);
    const index = sortedInsertionIndex(sortedPrecedences, entry);
    sheet.insert(entry, index);
    sortedPrecedences.splice(index, 0, entry);
  }

  const runtime = Object.defineProperties(
    function tw(tokens) {
      tokens = interpolate`${[tokens]}`;
      if (cache.has(tokens)) {
        return cache.get(tokens);
      }
      const styles: SheetEntry[] = [];
      for (const entry of translateRuleSet(parseTWTokens(tokens), context)) {
        if (!insertedRules.has(entry.className)) {
          insert(entry);
        }
        styles.push(entry);
      }
      cache.set(tokens, styles);
      return styles;
    } as RuntimeTW,

    Object.getOwnPropertyDescriptors({
      get sheet() {
        return sheet;
      },
      get target() {
        return sheet.target;
      },
      theme: context.theme,
      get config() {
        return config;
      },
      snapshot() {
        const restoreSheet = sheet.snapshot();
        const cache$ = new Map(cache);

        return () => {
          restoreSheet();
          cache = cache$;
        };
      },
      clear() {
        sheet.clear();
        cache = new Map();
      },
      destroy() {
        this.clear();
        sheet.destroy();
      },
    }),
  );
  return runtime;
}

// const test = createTailwind(
//   {
//     mode: 'native',
//     theme: {
//       asd: {
//         asd: '1rem',
//         case: '2rem',
//       },
//       colors: {
//         black: '#000',
//       },
//     },
//     rules: [matchThemeColor('text-', 'color'), matchThemeValue('asd-', 'asd', 'padding')],
//   },
//   createVirtualSheet(),
// );
// test.theme('asd'); //?
// test('asd-case'); //?
