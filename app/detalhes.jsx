import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Detalhes() {
  const { nome, preco, categoria } = useLocalSearchParams();
  
  const formatarPreco = (valor) => {
    if (!valor) return "N/A";
    const numero = parseFloat(valor);
    if (isNaN(numero)) return "Valor Inválido";
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const precoFormatado = formatarPreco(preco);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Item</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome do Produto:</Text>
        <Text style={styles.valor}>{nome || 'Produto Não Encontrado'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.valor}>{categoria || 'Não Especificada'}</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Preço Sugerido:</Text>
        <Text style={styles.valorPreco}>{precoFormatado}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#121212", 
    alignItems: "center"
  },
  titulo: { 
    fontSize: 30, 
    color: "#fff", 
    marginBottom: 40,
    fontWeight: 'bold',

    borderBottomWidth: 2,
    borderBottomColor: '#A020F0' 
  },
  card: {
    width: '100%',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#A020F0'
  },
  label: { 
    fontSize: 16, 
    color: "#ddd", 
    marginBottom: 5 
  },
  valor: { 
    fontSize: 22, 
    color: "#fff", 
    fontWeight: '600'
  },
  valorPreco: {
    fontSize: 26,
    color: "#A020F0",
    fontWeight: 'bold'
  }
});