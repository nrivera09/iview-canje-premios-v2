import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useDebugUIStore } from '@/store/debugUiStore';

const UserFakeSetter = () => {
  const Card = useUserStore((s) => s.card);
  const Asset = useUserStore((s) => s.asset);
  const View = useUserStore((s) => s.view);

  const setCardFake = useUserStore((s) => s.setCardFake);
  const setAssetFake = useUserStore((s) => s.setAssetFake);
  const setViewFake = useUserStore((s) => s.setViewFake);
  const setForceRedeemFake = useUserStore((s) => s.setForceRedeemFake);
  const resetFakes = useUserStore((s) => s.resetFakes);

  const show = useDebugUIStore((state) => state.activePanel === 'fakeId');
  const closeAll = useDebugUIStore((state) => state.closeAll);

  const [card, setCard] = useState('');
  const [asset, setAsset] = useState('');
  const [view, setView] = useState('');
  const [forceRedeem, setForceRedeem] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cardParam = params.get('id') ?? '';
    const assetParam = params.get('asset') ?? '';
    const viewParam = (params.get('iview') ?? '').toUpperCase();

    setCard(cardParam);
    setAsset(assetParam);
    setView(viewParam);

    const forceRedeemValue = useUserStore.getState().forceRedeemFake;
    setForceRedeem(forceRedeemValue);
  }, []);

  const handleSetFakes = () => {
    useUserStore.getState().setOldCard(useUserStore.getState().card);
    useUserStore.getState().setOldAsset(useUserStore.getState().asset);
    useUserStore.getState().setOldView(useUserStore.getState().view);

    setCardFake(card || null);
    setAssetFake(asset ? parseInt(asset) : null);
    setViewFake(view || null);
    setForceRedeemFake(forceRedeem);

    const url = new URL(window.location.href);
    url.searchParams.set('id', card);
    url.searchParams.set('asset', asset);
    url.searchParams.set('iview', view.toUpperCase());

    window.history.replaceState({}, '', url.toString());
    window.location.reload();
  };

  const handleResetFakes = () => {
    resetFakes();

    const oldCard = useUserStore.getState().oldcard;
    const oldAsset = useUserStore.getState().oldasset;
    const oldView = useUserStore.getState().oldview;

    useUserStore.getState().setCard(oldCard);
    useUserStore.getState().setAsset(oldAsset);
    useUserStore.getState().setView(oldView);

    const url = new URL(window.location.href);
    url.searchParams.set('id', oldCard);
    url.searchParams.set('asset', oldAsset.toString());
    url.searchParams.set('iview', oldView.toUpperCase());

    window.history.replaceState({}, '', url.toString());
    window.location.reload();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 bg-[#111111] text-[#00ff00] p-2 text-[12px] min-h-[200px] w-full z-[9999] font-mono whitespace-pre-wrap flex flex-col transform transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex flex-row items-center justify-between min-h-[24px] mb-[5px]">
        <p>
          <span className="animate-marquee-full">Hack Iview </span>___ :)
        </p>
        <div>
          <code>
            id: {card} | asset: {asset} | iview: {view}
          </code>
        </div>

        <div className="flex flex-row gap-2">
          <button
            className="rounded-md bg-[#333] text-[#0f0] border border-[#0f0] px-[5px] py-[2px] cursor-pointer"
            onClick={closeAll}
          >
            X
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto h-full">
        <div className="flex flex-row gap-2">
          <div className="mb-2 w-full">
            <label>Card: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
          </div>
          <div className="mb-2 w-full">
            <label>Asset: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="mb-2 w-full">
            <label>View: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={view}
              onChange={(e) => setView(e.target.value)}
            />
          </div>

          <div className="mb-2 w-full">
            <label>¿Forzar canje?: </label>
            <div className="flex flex-row gap-3 min-h-[33px] items-center justify-start">
              <label>
                <input
                  type="radio"
                  name="forceRedeem"
                  value="si"
                  checked={forceRedeem === true}
                  onChange={() => setForceRedeem(true)}
                />{' '}
                Si
              </label>
              <label>
                <input
                  type="radio"
                  name="forceRedeem"
                  value="no"
                  checked={forceRedeem !== true}
                  onChange={() => setForceRedeem(null)}
                />{' '}
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-between">
        <button
          className="bg-[#333333] text-[#00ff00] border border-[#00ff00] px-[5px] py-[2px] cursor-pointer w-full rounded-sm"
          onClick={handleSetFakes}
        >
          Setear Fakes
        </button>
        <button
          className="bg-[#333333] text-[#00ff00] border border-[#00ff00] px-[5px] py-[2px] cursor-pointer w-full rounded-sm"
          onClick={handleResetFakes}
        >
          Resetear Fakes
        </button>
      </div>
    </div>
  );
};

export default UserFakeSetter;
