import { Parser } from '../Parser';
import { matchMany } from '../composers/many';
import { matchBetween } from '../composers/separated';
import { matchChoice } from '../composers/sequence';
import { updateParserError } from '../helpers';
import { matchLetters } from './letters';
import { matchDigits } from './numbers';
import { matchString } from './string';

export const matchCssDeclarations = new Parser((parserState) => {
  const { targetString, index, isError } = parserState;

  if (isError) {
    return parserState;
  }

  const slicedTarget = targetString.slice(index);

  if (slicedTarget.length === 0) {
    return updateParserError(parserState, `declarations: Got unexpected end of input`);
  }

  const peek = slicedTarget.slice(0, 1);
  if (peek === '{') {
    const parser = matchBetween(matchString('{'), matchString('}'));
    const nextState = parser(
      matchMany(
        matchChoice([
          matchLetters,
          matchDigits,
          matchString(','),
          matchString('.'),
          matchString('-'),
          matchString(':'),
          matchString(';'),
          matchString('('),
          matchString(')'),
          matchString('!'),
          matchString('['),
          matchString(']'),
          matchString('%'),
          matchString('*'),
          matchString(' '),
        ]),
      ),
    ).parserStateTransformerFn(parserState);
    return nextState;
  }

  return updateParserError(
    parserState,
    `declarations: Couldn't match declarations at index ${index}`,
  );
}).map((result: any) => ({
  type: 'declarations',
  value: result.join(''),
}));

// .chain((result: any) => {
//   return new Parser((parserState) => {
//     const variables: [string, string][] = [];
//     const separatedBySemiColon = matchSeparatedBy(matchString(';'));
//     const separatedByColon = matchSeparatedBy(matchString(':'));
//     const nextState = separatedBySemiColon(
//       matchMany(
//         matchChoice([
//           matchLetters,
//           matchDigits,
//           matchString(','),
//           matchString('.'),
//           matchString('-'),
//           matchString('('),
//           matchString(':'),
//           matchString(')'),
//           matchString('!'),
//           matchString('['),
//           matchString(']'),
//           matchString('%'),
//           matchString('*'),
//           matchString(' '),
//         ]),
//       ).map((result: any) => {
//         return result.join('');
//       }),
//     )
//       .map((result: any) => {
//         console.log('RESULT_MAP_COLON: ', result);
//         return result;
//       })
//       .run(result.value);
//     console.log('NEXT STATE: ', nextState);

//     return parserState;
//   });
// });
