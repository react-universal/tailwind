import plugin from 'tailwindcss/plugin';

export const translate = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      translate(value: string) {
        return {
          transform: `translate(${parseFloat(value) * 16}px, ${parseFloat(value) * 16}px)`,
        };
      },
      'translate-x'(value: string) {
        return {
          transform: `translate(${parseFloat(value) * 16}px)`,
        };
      },
      'translate-y'(value: string) {
        return {
          transform: `translate(0, ${parseFloat(value) * 16}px)`,
        };
      },
    },
    {
      values: theme('translate'),
      supportsNegativeValues: true,
    },
  );
});
