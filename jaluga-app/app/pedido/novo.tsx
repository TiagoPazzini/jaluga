import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { BottomActionBar } from '../../src/components/BottomActionBar';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { CategoryChip } from '../../src/components/CategoryChip';
import { DateRangePicker } from '../../src/components/DateRangePicker';
import { Header } from '../../src/components/Header';
import { RevisaoItem } from '../../src/components/RevisaoItem';
import { Input } from '../../src/components/Input';
import { PhotoPicker } from '../../src/components/PhotoPicker';
import { RaioSelector } from '../../src/components/RaioSelector';
import { Screen } from '../../src/components/Screen';
import { Select } from '../../src/components/Select';
import { StepProgress } from '../../src/components/StepProgress';
import { TextArea } from '../../src/components/TextArea';
import { bairros, categorias, getNomeCategoria, opcoesRaioKm } from '../../src/mocks';
import { usePedidosStore } from '../../src/store/pedidosStore';
import type { Bairro } from '../../src/types';
import { formatDataHora } from '../../src/utils/formatData';

type Passo = 1 | 2 | 3 | 4;
const rotulos: Record<Passo, string> = { 1: 'O que você precisa', 2: 'Quando', 3: 'Onde', 4: 'Revisão' };

type Erros = Partial<Record<'titulo' | 'categoria' | 'inicio' | 'fim' | 'bairro', string>>;

export default function CriarPedido() {
  const rascunho = usePedidosStore((s) => s.rascunho);
  const atualizar = usePedidosStore((s) => s.atualizarRascunho);
  const publicar = usePedidosStore((s) => s.publicarRascunho);
  const [passo, setPasso] = useState<Passo>(1);
  const [erros, setErros] = useState<Erros>({});

  // Só checa campo obrigatório vazio. Sem regras de prazo ou raio.
  function camposVazios(p: Passo): Erros {
    const e: Erros = {};
    if (p === 1) {
      if (!rascunho.titulo.trim()) e.titulo = 'Conte o que você precisa.';
      if (!rascunho.categoriaId) e.categoria = 'Escolha uma categoria.';
    }
    if (p === 2) {
      if (!rascunho.inicio) e.inicio = 'Escolha quando começa.';
      if (!rascunho.fim) e.fim = 'Escolha quando termina.';
    }
    if (p === 3 && !rascunho.bairro) e.bairro = 'Escolha o seu bairro.';
    return e;
  }

  function avancar() {
    if (passo === 4) {
      const id = publicar();
      router.replace({ pathname: '/pedido/publicado', params: { id } });
      return;
    }
    const e = camposVazios(passo);
    setErros(e);
    if (Object.keys(e).length === 0) setPasso((passo + 1) as Passo);
  }

  function voltar() {
    setErros({});
    if (passo === 1) router.back();
    else setPasso((passo - 1) as Passo);
  }

  return (
    <Screen
      header={<Header titulo="Pedir um item" onBack={voltar} />}
      rodape={
        <BottomActionBar>
          <Button title={passo === 4 ? 'Publicar pedido' : 'Continuar'} onPress={avancar} />
        </BottomActionBar>
      }
    >
      <StepProgress atual={passo} total={4} rotulo={rotulos[passo]} />

      {passo === 1 ? (
        <View>
          <Text className="mb-4 font-title-xbold text-title-24 text-primary-900">O que você precisa?</Text>
          <Input
            label="Título do pedido"
            required
            value={rascunho.titulo}
            onChangeText={(titulo) => atualizar({ titulo })}
            placeholder="Ex.: Furadeira para o sábado"
            error={erros.titulo}
          />
          <Text className="mb-2 font-body-medium text-body-14 text-primary-900">
            Categoria<Text className="text-danger"> *</Text>
          </Text>
          <View className="mb-2 flex-row flex-wrap">
            {categorias.map((c) => (
              <CategoryChip
                key={c.id}
                rotulo={c.nome}
                selecionada={rascunho.categoriaId === c.id}
                onPress={() => atualizar({ categoriaId: c.id })}
              />
            ))}
          </View>
          {erros.categoria ? (
            <Text className="mb-4 font-body-medium text-body-12 text-danger">{erros.categoria}</Text>
          ) : null}
          <TextArea
            label="Descrição"
            value={rascunho.descricao}
            onChangeText={(descricao) => atualizar({ descricao })}
            placeholder="Conte para que você vai usar e qualquer detalhe importante."
          />
          <PhotoPicker
            label="Foto de referência (opcional)"
            fotos={rascunho.fotos}
            onChange={(fotos) => atualizar({ fotos })}
            max={1}
          />
        </View>
      ) : null}

      {passo === 2 ? (
        <View>
          <Text className="mb-4 font-title-xbold text-title-24 text-primary-900">Quando você precisa?</Text>
          <DateRangePicker
            inicio={rascunho.inicio}
            fim={rascunho.fim}
            onChange={({ inicio, fim }) => atualizar({ inicio, fim })}
            errorInicio={erros.inicio}
            errorFim={erros.fim}
          />
        </View>
      ) : null}

      {passo === 3 ? (
        <View>
          <Text className="mb-4 font-title-xbold text-title-24 text-primary-900">Onde você está?</Text>
          <Select
            label="Bairro"
            required
            value={rascunho.bairro}
            options={bairros.map((b) => ({ value: b, label: b }))}
            onChange={(b) => atualizar({ bairro: b as Bairro })}
            placeholder="Escolha o seu bairro"
            error={erros.bairro}
          />
          <RaioSelector value={rascunho.raioKm} onChange={(raioKm) => atualizar({ raioKm })} opcoes={opcoesRaioKm} />
        </View>
      ) : null}

      {passo === 4 ? (
        <View>
          <Text className="mb-4 font-title-xbold text-title-24 text-primary-900">Confira seu pedido</Text>
          <Card>
            <RevisaoItem rotulo="O que" valor={rascunho.titulo} onEditar={() => setPasso(1)} />
            <RevisaoItem rotulo="Categoria" valor={getNomeCategoria(rascunho.categoriaId ?? 'outros')} onEditar={() => setPasso(1)} />
            {rascunho.descricao ? <RevisaoItem rotulo="Descrição" valor={rascunho.descricao} onEditar={() => setPasso(1)} /> : null}
            <RevisaoItem
              rotulo="Quando"
              valor={`${rascunho.inicio ? formatDataHora(rascunho.inicio) : ''} até ${
                rascunho.fim ? formatDataHora(rascunho.fim) : ''
              }`}
              onEditar={() => setPasso(2)}
            />
            <RevisaoItem rotulo="Onde" valor={`${rascunho.bairro ?? ''} · até ${rascunho.raioKm} km`} onEditar={() => setPasso(3)} ultimo />
          </Card>
          <Text className="mt-4 font-body text-body-14 text-text-muted">
            Ao publicar, os vizinhos da região podem ver seu pedido e mandar ofertas.
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}
