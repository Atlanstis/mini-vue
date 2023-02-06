export const extend = Object.assign;

export const isObejct = (val) => {
  return val !== null && typeof val === 'object';
};

export const hasChanged = (val, newVal) => {
  return !Object.is(val, newVal);
};
