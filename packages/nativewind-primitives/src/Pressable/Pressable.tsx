import { forwardRef } from 'react';
import { Pressable as NativePressable, PressableProps, View } from 'react-native';
import { createStyledComponent, mergeTWClasses } from '@react-universal/nativewind-utils';

const StyledPressable = createStyledComponent(NativePressable);
type StylesPressableProps = PressableProps & { className?: string };

const Pressable = forwardRef<View, StylesPressableProps>(function Pressable(
  { className, ...props },
  ref,
) {
  return <StyledPressable className={mergeTWClasses(className)} ref={ref} {...props} />;
});

Pressable.displayName = 'Pressable';

export default Pressable;
