import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { ENV } from '../config/env';

export const useStockSignalR = (onStockUpdate: (message: any) => void) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${ENV.REACT_APP_ACITY_SOCKET}hub/stock`, {
        transport: signalR.HttpTransportType.LongPolling,
        headers: {
          'X-Api-Key': ENV.API_KEY || '',
        },
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    // Handler de eventos ANTES de iniciar la conexión
    connection.on('StockActualizadoCanje', (data, message) => {
      console.log("📦 Evento 'StockActualizadoCanje':", data);
      console.log('📦 Mensaje:', message);
      onStockUpdate(data);
    });

    connection
      .start()
      .then(() => {
        console.log('✅ Conectado a SignalR con API Key');
      })
      .catch((err) =>
        console.error('❌ Error al conectar a SignalR:', err.message)
      );

    return () => {
      connection.stop();
    };
  }, [onStockUpdate]);
};
