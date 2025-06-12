export const callHandleClose = () => {
  if (typeof (window as any).handleCloseClick === 'function') {
    (window as any).handleCloseClick();
  } else {
    console.error('handleCloseClick no está definido en window');
  }
};
