const API_URL = 'http://apiestoque.webapptech.site/api/produtos';
import { Alert } from 'react-native';

export const fetchProdutos = async (setRegistros) => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const dados = await response.json();
    console.log('Produtos recebidos da API: ', dados)
    setRegistros(dados.data);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const cadastrarProdutos = async (produtoData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produtoData),
    });

    if(response.status === 204) {
      Alert.alert('Sucesso', 'Produto cadastrado!!!');
      return {};
    }

    const textResponse = await response.text();
    console.log('Resposta bruta da API: ', textResponse);

    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
      responseData = null;
    }

    if(!response.ok || !responseData) {
      throw new Error(responseData?.message || 'Erro desconhecido ao cadastra o produto');
    }
    return responseData;
  } catch (error) {
    console.error('Erro ao cadastrar o produto: ', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes:  ${error.message}`);
    return null;
  }
};

export const alterarProdutos = async (produtoId, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}/${produtoId}`, {
      'method': 'PUT',
      'headers': {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    console.log("Produtos atualizados:", updatedData);

    if(response.status === 200) {
      Alert.alert('Sucesso', 'Produto atualizado!!!');
      navigation.navigate('Home');
    } else {
      const textResponse = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
        responseData = null;
      }
      throw new Error(responseData?.message || 'Erro desconhecido ao alterar produto');
    }
  } catch (error) {
    console.error('Erro ao atualizar o produto: ', error.message);
    Alert.alert('Erro ao atualizar: ', `Detalhes:  ${error.message}`);
  }
};

export const deletarProduto = async (produtoId, setRegistros) => {
  try {
    const response = await fetch(`${API_URL}/${produtoId}`, {
      'method': 'DELETE',
    });
    
    if(response.ok) {
      const responseData = await response.json();
      
      if(responseData.success) {
        Alert.alert('Erro ', responseData.message || 'Produto excluído!');
        
        if(typeof setRegistros == 'function') {
          setRegistros(prevRegistros => {
            const novaLista = prevRegistros.filter(produto => produto.id !== produtoId);
            console.log('Nova lista de produtos: ', novaLista);
            return novaLista;
          });
        }
      } else {
        Alert.alert('Erro ', responseData.message || 'Não foi possível excluir o produto.');
      }
    } else {
      let mensagemErro = 'Erro desconhecido ao excluir o produto.';
      
      try {
        const texto = await response.text();
        const erroJson = JSON.parse(texto);
        mensagemErro = erroJson?.message || mensagemErro;
      } catch (e) {
        console.warn('A resposta não é um JSON válido.');
      }
      throw new Error(mensagemErro);
    }
  } catch (error) {
    console.error('Erro ao deletar produto: ', error);
    Alert.alert('Erro ao deletar', `Detalhes: ${error.message}`);
  }
};

