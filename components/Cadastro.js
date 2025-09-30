import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { cadastrarProdutos } from './Api';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = async () => {
    if (!nome || !marca || !preco) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    
    const novoProduto = {nome, marca, preco};
    
    const adicionaProduto = await cadastrarProdutos(novoProduto);
    
    if(adicionaProduto) {
      Alert.alert('Sucesso', 'Produto cadastrado.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        }
      ]);
    }
    setNome('');
    setMarca('');
    setPreco('');
  };

  return (
    <View>
      <TextInput
        placeholder="Produto..."
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Marca..."
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        placeholder="Preço..."
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      <Button title="Cadastrar" onPress={handleSubmit}/>
    </View>
  );
}


