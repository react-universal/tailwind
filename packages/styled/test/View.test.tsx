import { View, Text } from 'react-native';
import { reactNativeTailwindPreset } from '@universal-labs/core/tailwind/preset';
import { setTailwindConfig } from '@universal-labs/stylesheets';
import renderer from 'react-test-renderer';
import { describe, expect, it } from 'vitest';
import { styled } from '../src';

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

setTailwindConfig({ content: ['__'], presets: [reactNativeTailwindPreset()] });

const StyledView = styled(View);
const StyledText = styled(Text);

describe('@universal-labs/styled', () => {
  it('View render', () => {
    const component = renderer.create(
      // @ts-ignore
      <StyledView className='flex-1' parentID='test'>
        {/* @ts-ignore */}
        <StyledText className='text-sm' parentID='test'>
          Test View
        </StyledText>
      </StyledView>,
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
