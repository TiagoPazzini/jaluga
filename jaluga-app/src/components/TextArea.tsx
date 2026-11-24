import { Input } from './Input';

interface TextAreaProps {
  label: string;
  value: string;
  onChangeText: (texto: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  numberOfLines?: number;
}

export function TextArea(props: TextAreaProps) {
  return <Input {...props} multiline numberOfLines={props.numberOfLines ?? 4} />;
}
