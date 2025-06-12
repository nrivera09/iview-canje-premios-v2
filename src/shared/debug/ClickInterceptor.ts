import { useDebugStore } from '@/store/debugStore';

export class ClickInterceptor {
  static init() {
    const addLog = useDebugStore.getState().addLog;

    document.addEventListener(
      'click',
      (event) => {
        const target = event.target as HTMLElement;
        const tagName = target?.tagName;
        const id = target?.id ? `#${target.id}` : '';
        const classes = target?.className ? `.${target.className}` : '';

        addLog(`[CLICK] ${tagName}${id}${classes}`);
      },
      { capture: true }
    );
  }
}
