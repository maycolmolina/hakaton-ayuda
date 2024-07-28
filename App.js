import React from 'react';
import Main from './src/component/main.jsx';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './enviroment.js';

initializeApp(firebaseConfig);

export default function App() {
  
  return (
    <> 
      <StatusBar style='light'> </StatusBar> 
      <Main/>   
    </> 
    
  )

}
