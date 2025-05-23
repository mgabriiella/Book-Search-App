import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  const addToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favoriteBooks') || '[]';
      const favorites = JSON.parse(existingFavorites);
      if (!favorites.find((fav) => fav.id === book.id)) {
        favorites.push({
          id: book.id,
          volumeInfo: {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            publishedDate: book.volumeInfo.publishedDate,
            imageLinks: book.volumeInfo.imageLinks,
          },
        });
        await AsyncStorage.setItem('favoriteBooks', JSON.stringify(favorites));
        alert('Livro adicionado aos favoritos!');
      } else {
        alert('Livro já está nos favoritos!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) {
    return <Paragraph>Carregando...</Paragraph>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150' }} />
        <Card.Content>
          <Title>{book.volumeInfo.title}</Title>
          <Paragraph>Autor(es): {book.volumeInfo.authors?.join(', ') || 'N/A'}</Paragraph>
          <Paragraph>Descrição: {book.volumeInfo.description || 'Sem descrição'}</Paragraph>
          <Paragraph>Ano: {book.volumeInfo.publishedDate?.substring(0, 4) || 'N/A'}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={addToFavorites}>Adicionar aos Favoritos</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DetailsScreen;