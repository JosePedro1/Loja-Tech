import { Link } from "expo-router";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Loja Tech</Text>

      <Image
        source={require("../assets/logo.png")} 
        style={styles.img}
      />

      <TextInput 
        style={styles.input}
        placeholder="Digite seu nome para um atendimento personalizado!"
        placeholderTextColor="#888"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />
      
      <Text style={styles.texto}>Bem-vindo(a), {nomeUsuario || 'Cliente'}!</Text>
      
      <Link href="/produto" asChild> 
        <Button 
          title="Explorar Produtos" 
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
    fontSize: 36, 
    color: "#A020F0",
    fontWeight: 'bold',
    marginBottom: 10 
  },
  img: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    marginBottom: 40,
    borderWidth: 3,
    borderColor: '#A020F0'
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A020F0',
    marginBottom: 15
  },
  texto: {
    fontSize: 18, 
    color: '#fff', 
    marginBottom: 30
  }
});