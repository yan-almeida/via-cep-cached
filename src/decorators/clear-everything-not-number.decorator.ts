export function ClearEverythingNotNumber() {
  return (target: any, propertyKey: string) => {
    let value: string = target[propertyKey];

    const getter = () => value;

    const setter = (val: string) => {
      if (val) {
        value = val.replace(/\D+/g, '');
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
