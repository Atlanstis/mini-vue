import { readonly, isReadonly, isProxy } from '../reactive';

describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);

    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
  });

  it('warn when call set', () => {
    console.warn = jest.fn();

    const user = readonly({
      age: 10,
    });
    user.age = 11;

    expect(console.warn).toBeCalledTimes(1);
    expect(user.age).toBe(10);
  });

  it('isReadonly', () => {
    const original = { foo: 1 };
    const wrapped = readonly(original);

    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);
  });

  it('nested readonly', () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);

    expect(isReadonly(wrapped.bar)).toBe(true);
  });

  it('isProxy', () => {
    const original = { foo: 1 };
    const wrapped = readonly(original);

    expect(isProxy(wrapped)).toBe(true);
  });
});
