import { hasChanged, isObejct } from '../shared';
import { isTracking, trackEffects, triggerEffects } from './effect';
import { reactive } from './reactive';

class RefImpl {
  private _value: any;
  private _rawValue: any;
  public __v_isRef = true;

  public dep = new Set();

  constructor(value) {
    this._rawValue = value;
    // 判断 value 是不是对象，是 -> 通过 reactive 进行包裹
    this._value = convert(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    if (!hasChanged(this._rawValue, newVal)) return;
    this._value = convert(newVal);
    this._rawValue = newVal;
    triggerEffects(this.dep);
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

function convert(value) {
  return isObejct(value) ? reactive(value) : value;
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function ref(value) {
  return new RefImpl(value);
}
