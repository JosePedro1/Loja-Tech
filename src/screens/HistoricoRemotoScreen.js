import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import { supabase } from '../services/supabase';

import {
  adicionarAoCarrinho,
  listarCarrinhoLocal,
  removerDoCarrinho
} from '../database/database';

export default function HistoricoRemotoScreen() {
  const [dados, setDados] = useState([]);

  const carregarHistorico = async () => {
    const { data } = await supabase
        .from('vendas_remotas')
        .select('*')
        .eq('no_carrinho', false)
        .order('created_at', { ascending: false });
        
    setDados(data || []);
  };

  useFocusEffect(useCallback(() => {
    carregarHistorico();
  }, []));

  const adicionarNovamente = async (item) => {
    await adicionarAoCarrinho(item.produto_nome, item.preco, 1);

    await supabase
      .from('vendas_remotas')
      .update({ no_carrinho: true })
      .eq('id', item.id);

    carregarHistorico();
  };

  const removerHistorico = async (item) => {
    Alert.alert('Remover', 'Deseja remover este item?', [
      { text: 'Cancelar' },
      {
        text: 'Remover',
        onPress: async () => {
          await supabase.from('vendas_remotas').delete().eq('id', item.id);

          const locais = await listarCarrinhoLocal();

          const encontrado = locais.find(
            l => l.nome === item.produto_nome && l.preco === item.preco
          );

          if (encontrado) {
            await removerDoCarrinho(encontrado.id);
          }

          carregarHistorico();
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Histórico" />

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.produto_nome}</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
            </View>

            <View style={styles.actions}>
              {!item.no_carrinho && (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => adicionarNovamente(item)}
                >
                  <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removerHistorico(item)}
              >
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nome: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  preco: { color: '#BBB', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 10 },
  addBtn: {
    backgroundColor: '#8A2BE2',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  removeBtn: {
    backgroundColor: '#300',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeText: { color: '#FF4444', fontWeight: 'bold' }
});
