import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { createEstoque } from './Api';

export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    marca: '',
    preco: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.marca) {
      Alert.alert("Erro: Preencha pelo menos o Nome e a Marca.");
      return;
    }
    await createEstoque(form);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Produto..."
        value={form.nome}
        onChangeText={(value) => handleChange('nome', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca..."
        value={form.marca}
        onChangeText={(value) => handleChange('marca', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço..."
        keyboardType="numeric"
        value={form.preco}
        onChangeText={(value) => handleChange('preco', value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
