import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import { supabase } from '../services/supabase';

import {
  listarCarrinhoLocal,
  removerDoCarrinho
} from '../database/database';

export default function CarrinhoScreen() {
  const [itens, setItens] = useState([]);

  const carregar = async () => {
    const data = await listarCarrinhoLocal();
    setItens(data);
  };

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const deletar = async (id, nome, preco) => {
    await removerDoCarrinho(id);

    await supabase
      .from('vendas_remotas')
      .update({ no_carrinho: false })
      .eq('produto_nome', nome)
      .eq('preco', preco);

    carregar();
  };

  return (
    <View style={styles.container}>
      <Header title="Carrinho" />

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={{
                color: item.sincronizado ? '#00FF7F' : '#FFAA00',
                marginTop: 4,
                fontSize: 12
              }}>
                {item.sincronizado ? "Sincronizado" : "Offline"}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => deletar(item.id, item.nome, item.preco)}
            >
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
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
  removeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#300',
    borderRadius: 8
  },
  removeText: { color: '#FF4444', fontWeight: 'bold' }
});
