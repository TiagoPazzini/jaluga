import type { ViewStyle } from 'react-native';
import { shadow } from './tokens';

export const shadowCard: ViewStyle = {
  shadowColor: shadow.color,
  shadowOpacity: shadow.opacity,
  shadowOffset: shadow.offset,
  shadowRadius: shadow.radius,
  elevation: shadow.elevation,
};
