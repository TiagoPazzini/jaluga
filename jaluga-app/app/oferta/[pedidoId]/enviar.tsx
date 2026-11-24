import { router, useLocalSearchParams } from 'expo-router';
import { Store, Truck } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { BottomActionBar } from '../../../src/components/BottomActionBar';
import { Button } from '../../../src/components/Button';
import { Header } from '../../../src/components/Header';
import { Input } from '../../../src/components/Input';
import { OpcaoCard } from '../../../src/components/OpcaoCard';
import { PhotoPicker } from '../../../src/components/PhotoPicker';
import { ResumoLinha } from '../../../src/components/ResumoLinha';
import { Screen } from '../../../src/components/Screen';
import { Select } from '../../../src/components/Select';
import { TextArea } from '../../../src/components/TextArea';
import { usePedido } from '../../../src/hooks/usePedido';
import { opcoesConservacao, resumoOfertaReferencia } from '../../../src/mocks';
import type { Porte } from '../../../src/types';

type Erros = Partial<Record<'preco' | 'valorItem' | 'porte' | 'modalidade', string>>;

export default function EnviarOferta() {
  const { pedidoId } = useLocalSearchParams<{ pedidoId: string }>();
  const pedido = usePedido(pedidoId);

  const [preco, setPreco] = useState('');
  const [valorItem, setValorItem] = useState('');
  const [porte, setPorte] = useState<Porte | null>(null);
  const [fotos, setFotos] = useState<string[]>([]);
  const [conservacao, setConservacao] = useState<string | null>(null);
  const [entrega, setEntrega] = useState(false);
  const [retirada, setRetirada] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState<Erros>({});

  // Só checa campo obrigatório vazio. Os valores do resumo são fixos.
  function enviar() {
    const e: Erros = {};
    if (!preco.trim()) e.preco = 'Informe o preço total.';
    if (!valorItem.trim()) e.valorItem = 'Informe quanto vale o item.';
    if (!porte) e.porte = 'Escolha o porte do item.';
    if (!entrega && !retirada) e.modalidade = 'Escolha entrega, retirada ou as duas.';
    setErros(e);
    if (Object.keys(e).length === 0) router.replace('/oferta/enviada');
  }

  const r = resumoOfertaReferencia;
  const somenteNumeros = (t: string) => t.replace(/[^0-9,]/g, '');

  return (
    <Screen
      header={<Header titulo="Enviar oferta" onBack={() => router.back()} />}
      rodape={
        <BottomActionBar>
          <Button title="Enviar oferta" onPress={enviar} />
        </BottomActionBar>
      }
    >
      {pedido ? (
        <Text className="mb-4 font-body text-body-14 text-text-muted">
          Para: <Text className="font-body-semibold text-primary-900">{pedido.titulo}</Text> · {pedido.inicio}
        </Text>
      ) : null}

      <Text className="mb-4 font-title-xbold text-title-24 text-primary-900" accessibilityRole="header">
        Sua oferta
      </Text>

      <Input
        label="Preço total do período"
        required
        prefixo="R$"
        keyboardType="decimal-pad"
        value={preco}
        onChangeText={(t) => setPreco(somenteNumeros(t))}
        placeholder="0,00"
        error={erros.preco}
      />
      <Input
        label="Quanto vale o item"
        required
        prefixo="R$"
        keyboardType="decimal-pad"
        value={valorItem}
        onChangeText={(t) => setValorItem(somenteNumeros(t))}
        placeholder="Valor para comprar um novo"
        error={erros.valorItem}
      />
      <Select
        label="Porte do item"
        required
        value={porte}
        options={[
          { value: 'P', label: 'P · cabe numa sacola' },
          { value: 'M', label: 'M · cabe no porta-malas' },
          { value: 'G', label: 'G · precisa de carro grande' },
        ]}
        onChange={(v) => setPorte(v as Porte)}
        placeholder="Escolha o porte"
        error={erros.porte}
      />
      <PhotoPicker label="Fotos do item" fotos={fotos} onChange={setFotos} max={4} />
      <Select
        label="Estado de conservação"
        value={conservacao}
        options={opcoesConservacao.map((o) => ({ value: o, label: o }))}
        onChange={setConservacao}
        placeholder="Como está o item?"
      />

      <Text className="mb-2 font-body-medium text-body-14 text-primary-900">
        Como o vizinho recebe o item<Text className="text-danger"> *</Text>
      </Text>
      <OpcaoCard
        titulo="Retirada"
        descricao="O vizinho busca com você"
        icon={Store}
        selecionada={retirada}
        onPress={() => setRetirada(!retirada)}
      />
      <OpcaoCard
        titulo="Entrega"
        descricao="Um entregador parceiro leva o item"
        icon={Truck}
        selecionada={entrega}
        onPress={() => setEntrega(!entrega)}
      />
      {erros.modalidade ? (
        <Text className="mb-2 font-body-medium text-body-12 text-danger">{erros.modalidade}</Text>
      ) : null}

      <View className="mt-2">
        <TextArea
          label="Mensagem para o vizinho"
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Ex.: Acompanha jogo de brocas."
          numberOfLines={3}
        />
      </View>

      <View className="rounded-card border-2 border-border bg-primary-100 p-4">
        <Text className="mb-1 font-title text-title-18 text-primary-900">Resumo da oferta</Text>
        <Text className="mb-2 font-body text-body-12 text-text-muted">Valores de exemplo neste protótipo.</Text>
        <ResumoLinha rotulo="Aluguel" valor={r.precoAluguel} />
        <ResumoLinha rotulo="Taxa de serviço" valor={r.taxaServico} observacao="Paga pelo vizinho que aluga" />
        <ResumoLinha rotulo="Caução" valor={r.caucao} observacao="Fica guardada e volta para o vizinho na devolução" />
        <ResumoLinha rotulo="Você recebe" valor={r.voceRecebe} destaque />
      </View>
    </Screen>
  );
}
