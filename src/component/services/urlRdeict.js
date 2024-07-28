import { Alert, Linking } from 'react-native';

export const whatsappredirecto = ( telefono, texto) => {
    const url = `whatsapp://send?phone=${telefono}&text=${encodeURIComponent(texto)}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('WhatsApp no está instalado');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => Alert.alert('Error','Error al abrir WhatsApp', err));
};