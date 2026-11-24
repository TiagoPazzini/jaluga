import * as ImagePicker from 'expo-image-picker';
import { ImagePlus, X } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { cores } from '../theme/colors';

interface PhotoPickerProps {
  fotos: string[];
  onChange: (uris: string[]) => void;
  max?: number;
  label?: string;
}

// Abre a galeria e mostra a prévia. Não envia nada.
export function PhotoPicker({ fotos, onChange, max = 4, label = 'Fotos' }: PhotoPickerProps) {
  const [aviso, setAviso] = useState<string | null>(null);

  async function escolher() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      setAviso('Sem acesso à galeria. Você pode seguir sem foto.');
      return;
    }
    setAviso(null);
    const resultado = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.6 });
    if (!resultado.canceled && resultado.assets[0]) {
      onChange([...fotos, resultado.assets[0].uri].slice(0, max));
    }
  }

  return (
    <View className="mb-4">
      <Text className="mb-1 font-body-medium text-body-14 text-primary-900">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {fotos.map((uri) => (
          <View key={uri} className="h-20 w-20">
            <Image source={{ uri }} className="h-20 w-20 rounded-control" accessibilityLabel="Foto escolhida" />
            <Pressable
              onPress={() => onChange(fotos.filter((f) => f !== uri))}
              accessibilityRole="button"
              accessibilityLabel="Remover foto"
              hitSlop={12}
              className="absolute -right-2 -top-2 h-7 w-7 items-center justify-center rounded-pill bg-primary-900"
            >
              <X size={16} color={cores.white} />
            </Pressable>
          </View>
        ))}
        {fotos.length < max ? (
          <Pressable
            onPress={escolher}
            accessibilityRole="button"
            accessibilityLabel="Adicionar foto da galeria"
            className="h-20 w-20 items-center justify-center rounded-control border-2 border-dashed border-primary-300 bg-white"
          >
            <ImagePlus size={24} color={cores.primary600} />
            <Text className="mt-1 font-body-medium text-body-12 text-primary-600">Adicionar</Text>
          </Pressable>
        ) : null}
      </View>
      {aviso ? <Text className="mt-1 font-body text-body-12 text-text-muted">{aviso}</Text> : null}
    </View>
  );
}
