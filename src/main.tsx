import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {registerSW} from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log('LISTO PWA lista para operar sin conexión');
  },
});

createRoot(document.getElementById('root')!).render(<App />);

