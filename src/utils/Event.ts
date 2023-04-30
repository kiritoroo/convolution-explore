interface CustomEventMap {
  "eUpdate": CustomEvent;
  "eResourcesReady": CustomEvent;
}

const emitEvent = <K extends keyof CustomEventMap>(eventType: K): void => {
  document.dispatchEvent(new CustomEvent(eventType));
}

export { emitEvent };