// src/shared/utils/iframeMessenger.ts

type IframeMessageType =
  | 'ACTION_TRIGGER_CLOSE_IFRAME'
  | 'ACTION_SEND_DATA'
  | 'ACTION_CUSTOM';

interface IframeMessagePayload {
  action: string;
  data?: any;
}

export const postToParent = (
  type: IframeMessageType,
  payload: IframeMessagePayload,
  targetOrigin: string = '*'
) => {
  window.parent.postMessage({ type, payload }, targetOrigin);
};

// Accesos rápidos si deseas
export const closeIframe = () => {
  postToParent('ACTION_TRIGGER_CLOSE_IFRAME', { action: 'CLOSE_IFRAME' });
};

export const sendDataToParent = (data: any) => {
  postToParent('ACTION_SEND_DATA', { action: 'SEND_DATA', data });
};
