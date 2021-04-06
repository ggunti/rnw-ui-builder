export * from './Container';
export * from './Text';
export * from './Button';
export * from './Input';

import { Container } from './Container';
import { Text } from './Text';
import { Button } from './Button';
import { Input } from './Input';

export const userComponents: Record<string, React.ElementType> = { Container, Text, Button, Input };
