import { router } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../../src/components/Button';
import { TelaSucesso } from '../../src/components/TelaSucesso';

export default function OfertaEnviada() {
  return (
    <TelaSucesso
      titulo="Oferta enviada!"
      descricao="O vizinho vai ver sua oferta. Avisamos você quando ele responder."
      acoes={
        <>
          <View className="flex-row">
            <Button title="Ver outros pedidos" onPress={() => router.replace('/ofertar')} />
          </View>
          <View className="flex-row">
            <Button title="Voltar ao início" variant="secundario" onPress={() => router.replace('/inicio')} />
          </View>
        </>
      }
    />
  );
}
