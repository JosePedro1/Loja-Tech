import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Produto() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Produtos</Text>

      <Link 
        href={{ 
          pathname: "/detalhes", 
          params: { 
            nome: "Mouse Gamer HyperX", 
            preco: "149.99",
            categoria: "Periféricos" 
          } 
        }}
        asChild
      >
        <Button 
          title="Ver Mouse Gamer" 
          color="#A020F0" 
        />
      </Link>
      
      <View style={{height: 20}} /> 
      
      <Link 
        href={{ 
          pathname: "/detalhes", 
          params: { 
            nome: "Teclado Mecânico Redragon", 
            preco: "299.99",
            categoria: "Periféricos" 
          } 
        }}
        asChild
      >
        <Button 
          title="Ver Teclado Mecânico" 
          color="#A020F0" 
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#121212", 
    padding: 20
  },
  titulo: { 
    fontSize: 28, 
    color: "#fff", 
    marginBottom: 40,
    fontWeight: 'bold'
  }
});