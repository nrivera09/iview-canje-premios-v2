import React, { FC, useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

interface UserFakeSetterProps {
  show: boolean;
  open: () => void;
}

const UserFakeSetter: FC<UserFakeSetterProps> = ({ show = false, open }) => {
  const setCardFake = useUserStore((s) => s.setCardFake);
  const setAssetFake = useUserStore((s) => s.setAssetFake);
  const setViewFake = useUserStore((s) => s.setViewFake);
  const resetFakes = useUserStore((s) => s.resetFakes);

  const [card, setCard] = useState('');
  const [asset, setAsset] = useState('');
  const [view, setView] = useState('');

  // Inicializamos los valores desde la URL al montar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cardParam = params.get('id') ?? '';
    const assetParam = params.get('asset') ?? '';
    const viewParam = (params.get('iview') ?? '').toUpperCase();

    setCard(cardParam);
    setAsset(assetParam);
    setView(viewParam);
  }, []);

  const handleSetFakes = () => {
    setCardFake(card || null);
    setAssetFake(asset ? parseInt(asset) : null);
    setViewFake(view || null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: '#111',
        color: '#0f0',
        padding: '8px',
        fontSize: '12px',
        maxHeight: '30vh',
        overflowY: 'auto',
        width: '100%',
        zIndex: 9999,
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
      }}
      className={`flex flex-col transform transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <h3>Configurar FakeId</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>Card: </label>
        <input
          className="input"
          type="text"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Asset: </label>
        <input
          className="input"
          type="number"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>View: </label>
        <input
          className="input"
          type="text"
          value={view}
          onChange={(e) => setView(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleSetFakes}>Setear Fakes</button>
        <button onClick={resetFakes}>Resetear Fakes</button>
        <button onClick={open}>Cerrar</button>
      </div>
    </div>
  );
};

export default UserFakeSetter;
