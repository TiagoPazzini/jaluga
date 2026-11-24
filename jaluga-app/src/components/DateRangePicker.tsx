import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { CalendarDays } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../theme/colors';
import { formatDataHora } from '../utils/formatData';
import { Button } from './Button';

type Campo = 'inicio' | 'fim';

interface DateRangePickerProps {
  inicio: Date | null;
  fim: Date | null;
  onChange: (periodo: { inicio: Date | null; fim: Date | null }) => void;
  errorInicio?: string;
  errorFim?: string;
}

// Escolha de data e hora. Não valida prazos nem antecedência.
export function DateRangePicker({ inicio, fim, onChange, errorInicio, errorFim }: DateRangePickerProps) {
  const insets = useSafeAreaInsets();
  const [editando, setEditando] = useState<{ campo: Campo; modo: 'date' | 'time' } | null>(null);
  const [temporario, setTemporario] = useState<Date>(new Date());

  function abrir(campo: Campo) {
    const atual = campo === 'inicio' ? inicio : fim;
    setTemporario(atual ?? new Date());
    setEditando({ campo, modo: 'date' });
  }

  function aplicar(campo: Campo, data: Date) {
    onChange(campo === 'inicio' ? { inicio: data, fim } : { inicio, fim: data });
  }

  // Android: abre um diálogo de data e depois um de hora.
  function aoMudarAndroid(evento: DateTimePickerEvent, data?: Date) {
    if (!editando) return;
    if (evento.type !== 'set' || !data) {
      setEditando(null);
      return;
    }
    if (editando.modo === 'date') {
      setTemporario(data);
      setEditando({ campo: editando.campo, modo: 'time' });
    } else {
      aplicar(editando.campo, data);
      setEditando(null);
    }
  }

  function renderCampo(campo: Campo, rotulo: string, valor: Date | null, erro?: string) {
    return (
      <View className="mb-4">
        <Text className="mb-1 font-body-medium text-body-14 text-primary-900">
          {rotulo}
          <Text className="text-danger"> *</Text>
        </Text>
        <Pressable
          onPress={() => abrir(campo)}
          accessibilityRole="button"
          accessibilityLabel={`${rotulo}: ${valor ? formatDataHora(valor) : 'escolher data e hora'}`}
          className={`min-h-[48px] flex-row items-center gap-3 rounded-control border-2 bg-white px-3 ${
            erro ? 'border-danger' : 'border-border'
          }`}
        >
          <CalendarDays size={20} color={cores.primary600} />
          <Text className={`font-body text-body-16 ${valor ? 'text-primary-900' : 'text-text-muted'}`}>
            {valor ? formatDataHora(valor) : 'Escolher data e hora'}
          </Text>
        </Pressable>
        {erro ? <Text className="mt-1 font-body-medium text-body-12 text-danger">{erro}</Text> : null}
      </View>
    );
  }

  return (
    <View>
      {renderCampo('inicio', 'Começa em', inicio, errorInicio)}
      {renderCampo('fim', 'Termina em', fim, errorFim)}

      {Platform.OS === 'android' && editando ? (
        <DateTimePicker value={temporario} mode={editando.modo} is24Hour onChange={aoMudarAndroid} />
      ) : null}

      {Platform.OS === 'ios' ? (
        <Modal visible={editando !== null} transparent animationType="slide" onRequestClose={() => setEditando(null)}>
          <Pressable className="flex-1 bg-primary-900/50" onPress={() => setEditando(null)} accessibilityLabel="Fechar" />
          <View className="rounded-t-card bg-white px-4 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
            <Text className="font-title text-title-18 text-primary-900">
              {editando?.campo === 'fim' ? 'Termina em' : 'Começa em'}
            </Text>
            <DateTimePicker
              value={temporario}
              mode="datetime"
              display="spinner"
              locale="pt-BR"
              textColor={cores.primary900}
              onChange={(_, data) => data && setTemporario(data)}
            />
            <View className="flex-row">
              <Button
                title="Pronto"
                onPress={() => {
                  if (editando) aplicar(editando.campo, temporario);
                  setEditando(null);
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}
