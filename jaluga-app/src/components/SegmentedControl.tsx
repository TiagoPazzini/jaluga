import { Pressable, Text, View } from 'react-native';

interface SegmentedControlProps<T extends string> {
  opcoes: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

// Alternância entre duas ou mais vistas (ex.: Lista / Comparar).
export function SegmentedControl<T extends string>({ opcoes, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View className="mb-4 flex-row rounded-pill bg-primary-100 p-1" accessibilityRole="tablist">
      {opcoes.map((o) => {
        const ativa = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            accessibilityLabel={o.label}
            className={`min-h-[44px] flex-1 items-center justify-center rounded-pill ${ativa ? 'bg-primary-600' : ''}`}
          >
            <Text className={`font-body-semibold text-body-14 ${ativa ? 'text-white' : 'text-primary-900'}`}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
