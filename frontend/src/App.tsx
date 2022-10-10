import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Footer, Header } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainContent } from './modules';

import styles from './App.module.scss';

const queryClient = new QueryClient();

const App = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <div className={styles.layout}>
        <Header />
        <main className={styles.mainContentWrapper}>
          <MainContent />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
