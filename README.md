# Book Search App

Um aplicativo em **React Native com Expo** que permite buscar livros usando a **Google Books API**, exibir detalhes e salvar livros favoritos no **armazenamento local** do dispositivo.

---

## 📱 Funcionalidades

- 🔍 **Busca de Livros**: Pesquise livros por título ou autor na tela inicial.
- 📘 **Detalhes do Livro**: Veja título, autor, descrição e ano de publicação.
- ⭐ **Favoritos**: Adicione livros aos favoritos, visualize ou remova em uma tela dedicada.
- 💾 **Armazenamento Local**: Usa **AsyncStorage** para manter os favoritos salvos.

---

## 🛠 Tecnologias Utilizadas

- **React Native com Expo**
- **React Navigation** (Stack e Bottom Tabs)
- **React Native Paper**
- **Axios**
- **@react-native-async-storage/async-storage**
- **Material Icons** (ícones)

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instale com: `npm install -g expo-cli`)
- Dispositivo/emulador Android ou iOS, ou o app **Expo Go**

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mgabriiella/Book-Search-App.git
cd Book-Search-App
```

2. Instale as dependências:

```bash
npm install
```

3. Instale as dependências específicas:

```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-paper react-native-vector-icons axios @react-native-async-storage/async-storage
```

---

## 📁 Estrutura de Pastas

```
Book-Search-App/
├── screens/
│   ├── HomeScreen.js
│   ├── DetailsScreen.js
│   └── FavoritesScreen.js
├── App.js
├── babel.config.js
└── README.md
```

---

## ▶️ Como Executar

```bash
npx expo start
```

- Escaneie o QR code com o **Expo Go** no celular
- Ou use um emulador Android/iOS

### Para build (opcional):

```bash
# Android
npx expo run:android

# iOS (requer macOS)
npx expo run:ios
```

---

## 💡 Uso

1. Na tela **Home**, digite o título ou autor e clique em "Buscar".
2. Clique em **"Ver Detalhes"** para visualizar mais informações.
3. Clique em **"Adicionar aos Favoritos"** para salvar.
4. Na aba **Favoritos**, veja, acesse ou remova livros salvos.

---

## 🌐 API Utilizada

- **Google Books API**: [https://www.googleapis.com/books/v1/volumes](https://www.googleapis.com/books/v1/volumes)
- Não requer chave de API para buscas básicas.
- Fornece: título, autor, descrição, capa, etc.

---

## 📝 Notas

- Se a capa não estiver disponível, uma imagem placeholder será usada.
- Apenas dados essenciais são salvos no **AsyncStorage**.
- Testado com **Expo SDK 51**.

---
