import { useState } from 'react';
import { Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';
import { cores } from '../theme/colors';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (texto: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  prefixo?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required = false,
  secureTextEntry,
  keyboardType,
  multiline = false,
  numberOfLines = 4,
  prefixo,
}: InputProps) {
  const [foco, setFoco] = useState(false);
  const borda = error ? 'border-danger' : foco ? 'border-primary-300' : 'border-border';

  return (
    <View className="mb-4">
      <Text className="mb-1 font-body-medium text-body-14 text-primary-900">
        {label}
        {required ? <Text className="text-danger"> *</Text> : null}
      </Text>
      <View className={`flex-row items-center rounded-control border-2 bg-white px-3 ${borda}`}>
        {prefixo ? <Text className="mr-1 font-body-medium text-body-16 text-text-muted">{prefixo}</Text> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={cores.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={() => setFoco(true)}
          onBlur={() => setFoco(false)}
          accessibilityLabel={label}
          className="flex-1 py-3 font-body text-body-16 text-primary-900"
          style={multiline ? { minHeight: numberOfLines * 24, textAlignVertical: 'top' } : { minHeight: 44 }}
        />
      </View>
      {error ? (
        <Text className="mt-1 font-body-medium text-body-12 text-danger" accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
