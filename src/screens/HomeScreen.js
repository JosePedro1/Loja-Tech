import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text
} from 'react-native';

import Header from '../components/Header';
import { adicionarAoCarrinho } from '../database/database';
import { syncData } from '../services/syncService';

export default function HomeScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products/category/electronics');
      const data = await res.json();
      setProdutos(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (item) => {
    await adicionarAoCarrinho(item.title, item.price);
    await syncData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Loja Tech" />
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Loja Tech" />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />

            <View style={styles.info}>
              <Text style={styles.nome}>{item.title}</Text>
              <Text style={styles.preco}>R$ {item.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAdd(item)}
            >
              <Text style={styles.buttonText}>+</Text>
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
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },

  img: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 8
  },

  info: {
    flex: 1,
    marginLeft: 10
  },

  nome: {
    color: '#FFF',
    fontSize: 14
  },

  preco: {
    color: '#BBB',
    marginTop: 4
  },

  button: {
    backgroundColor: '#8A2BE2',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
