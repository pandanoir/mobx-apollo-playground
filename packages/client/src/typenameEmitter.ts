// addEventListenerの返り値がそのままcleanup関数になってるEventTarget
class BetterEventTarget extends EventTarget {
  addEventListener(...args: Parameters<EventTarget['addEventListener']>) {
    super.addEventListener(...args);
    return () => {
      super.removeEventListener(...args);
    };
  }
}
export const typenameEmitter = new BetterEventTarget();
