import { router, useLocalSearchParams } from 'expo-router';
import { Share2 } from 'lucide-react-native';
import { Share, View } from 'react-native';
import { Button } from '../../src/components/Button';
import { TelaSucesso } from '../../src/components/TelaSucesso';
import { TEXTO_COMPARTILHAR } from '../../src/mocks';

export default function PedidoPublicado() {
  const { id } = useLocalSearchParams<{ id: string }>();

  async function compartilhar() {
    try {
      await Share.share({ message: TEXTO_COMPARTILHAR });
    } catch {
      // Compartilhamento cancelado ou indisponível: nada a fazer.
    }
  }

  return (
    <TelaSucesso
      titulo="Seu pedido está no ar!"
      descricao="Avisamos você quando chegar a primeira oferta. Quer agilizar? Chame os vizinhos."
      acoes={
        <>
          <View className="flex-row">
            <Button title="Compartilhar com vizinhos" icon={Share2} onPress={compartilhar} />
          </View>
          <View className="flex-row">
            <Button title="Ver meu pedido" variant="secundario" onPress={() => router.replace(`/pedido/${id}`)} />
          </View>
        </>
      }
    />
  );
}
