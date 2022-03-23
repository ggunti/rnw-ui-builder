export * from './View';
export * from './Text';
export * from './Button';
export * from './Input';
export * from './Image';
export * from './Icon';

import { View } from './View';
import { Text } from './Text';
import { Button } from './Button';
import { Input } from './Input';
import { Image } from './Image';
import { Icon } from './Icon';

export const draggableComponents: Record<string, React.ElementType> = { View, Text, Button, Input, Image, Icon };
