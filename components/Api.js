import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = "http://apiestoque.webapptech.site/api/produtos";

export const fetchEstoque = async (setRegistros) => {
  try {
    const response = await axios.get(API_URL);
    console.log("Produtos recebidos da API:", response.data);

    if (Array.isArray(response.data)) {
      setRegistros(response.data);
    } else if (response.data && response.data.data) {
      // Caso sua API esteja paginada (Laravel costuma mandar dentro de "data")
      setRegistros(response.data.data);
    } else {
      console.log("Estrutura inesperada:", response.data);
      setRegistros([]);
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    Alert.alert("Erro: Não foi possível buscar os dados do estoque.");
  }
};

export const createEstoque = async (novoEstoque) => {
  try {
    const response = await axios.post(API_URL, {
      nome: novoEstoque.nome,
      marca: novoEstoque.marca,
      preco: novoEstoque.preco,
    });
    console.log("Produto cadastrado:", response.data);
    Alert.alert("Sucesso, Produto cadastrado!!!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error.response?.data ||  error.message);
    Alert.alert("Erro: Não foi possível cadastrar o produto.");
  }
};

export const updateEstoque = async (id, dados, navigation) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      nome: dados.nome,
      marca: dados.marca,
      preco: dados.preco,
    });
    console.log("Estoque atualizado:", response.data);
    Alert.alert("Sucesso, Produto atualizado com sucesso!");
    navigation.navigate('Home');
  } catch (error) {
    console.error("Erro ao atualizar:", error.response?.data || error.message);
    Alert.alert("Erro: Não foi possível atualizar o item.");
  }
};

export const deleteEstoque = async (id, setRegistros) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Produto ${id} deletado`);
    fetchEstoque(setRegistros); // atualiza a lista
  } catch (error) {
    console.error("Erro ao deletar produto:", error.response?.data || error.message);
    Alert.alert("Erro: Não foi possível deletar o item.");
  }
};

