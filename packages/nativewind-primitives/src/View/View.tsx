import { forwardRef } from 'react';
import { View as ReactNativeView, ViewProps as NativeViewProps } from 'react-native';
import { createStyledComponent, mergeTWClasses } from '@react-universal/nativewind-utils';

type ViewProps = Omit<NativeViewProps, 'className'> & {
  className?: string;
};

const StyledView = createStyledComponent(ReactNativeView);

const View = forwardRef<ReactNativeView, ViewProps>(function View(
  { className, ...props },
  ref,
) {
  return <StyledView {...props} className={mergeTWClasses(className)} ref={ref} />;
});

StyledView.displayName = 'View';

export type { ViewProps };

export default View;
