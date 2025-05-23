import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteItem = ({ item, removeFavorite, navigateToDetails }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150' }} />
      <Card.Content>
        <Title>{item.volumeInfo.title}</Title>
        <Paragraph>{item.volumeInfo.publishedDate?.substring(0, 4) || 'N/A'}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigateToDetails(item.id)}>Ver Detalhes</Button>
        <Button onPress={() => removeFavorite(item.id)}>Remover dos Favoritos</Button>
      </Card.Actions>
    </Card>
  );
};

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem('favoriteBooks');
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
        } catch (error) {
          console.error(error);
        }
      };
      loadFavorites();
    }, [])
  );

  const removeFavorite = async (id) => {
    try {
      const updatedFavorites = favorites.filter((book) => book.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      alert('Livro removido dos favoritos!');
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToDetails = (id) => {
    navigation.navigate('Details', { bookId: id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteItem
            item={item}
            removeFavorite={removeFavorite}
            navigateToDetails={navigateToDetails}
          />
        )}
        initialNumToRender={5}
        getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
        windowSize={10}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default FavoritesScreen;