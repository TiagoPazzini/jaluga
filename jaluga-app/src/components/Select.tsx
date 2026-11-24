import { Check, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../theme/colors';

export interface SelectOpcao {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string | null;
  options: SelectOpcao[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function Select({ label, value, options, onChange, placeholder = 'Escolha', error, required }: SelectProps) {
  const [aberto, setAberto] = useState(false);
  const insets = useSafeAreaInsets();
  const selecionada = options.find((o) => o.value === value);

  return (
    <View className="mb-4">
      <Text className="mb-1 font-body-medium text-body-14 text-primary-900">
        {label}
        {required ? <Text className="text-danger"> *</Text> : null}
      </Text>
      <Pressable
        onPress={() => setAberto(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selecionada?.label ?? placeholder}`}
        className={`min-h-[48px] flex-row items-center justify-between rounded-control border-2 bg-white px-3 ${
          error ? 'border-danger' : 'border-border'
        }`}
      >
        <Text className={`font-body text-body-16 ${selecionada ? 'text-primary-900' : 'text-text-muted'}`}>
          {selecionada?.label ?? placeholder}
        </Text>
        <ChevronDown size={20} color={cores.primary600} />
      </Pressable>
      {error ? <Text className="mt-1 font-body-medium text-body-12 text-danger">{error}</Text> : null}

      <Modal visible={aberto} transparent animationType="slide" onRequestClose={() => setAberto(false)}>
        <Pressable
          className="flex-1 bg-primary-900/50"
          onPress={() => setAberto(false)}
          accessibilityRole="button"
          accessibilityLabel="Fechar"
        />
        <View className="rounded-t-card bg-white px-4 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <Text className="mb-2 font-title text-title-18 text-primary-900">{label}</Text>
          <ScrollView style={{ maxHeight: 360 }}>
            {options.map((o) => {
              const ativa = o.value === value;
              return (
                <Pressable
                  key={o.value}
                  onPress={() => {
                    onChange(o.value);
                    setAberto(false);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: ativa }}
                  className="min-h-[48px] flex-row items-center justify-between border-b border-border"
                >
                  <Text className={`text-body-16 ${ativa ? 'font-body-semibold text-primary-600' : 'font-body text-primary-900'}`}>
                    {o.label}
                  </Text>
                  {ativa ? <Check size={20} color={cores.primary600} /> : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
