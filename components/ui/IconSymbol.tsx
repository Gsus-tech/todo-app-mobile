import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

// Map SFSymbols to MaterialIcons
const MAPPING = {
  // Add your SFSymbol to MaterialIcons mappings here.
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS and MaterialIcons on Android and web.
 * This ensures a consistent look across platforms and optimal resource usage.
 *
 * The `name` is based on SFSymbols and requires manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;  // Style prop is now TextStyle to be compatible with icons
  weight?: 'light' | 'regular' | 'bold';  // Optional weight for MaterialIcons
}) {
  // Get the mapped icon name from MAPPING
  const iconName = MAPPING[name];

  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
