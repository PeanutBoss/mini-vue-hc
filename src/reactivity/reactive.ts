import { mutableHandles, readonlyHandles, shallowReadonlyHandlers } from './baseHandle'

export function reactive (raw) {
  return createActiveObject(raw, mutableHandles)
}

// 只读，意味着不能set
export function readonly (raw) {
  return createActiveObject(raw, readonlyHandles)
}

function createActiveObject (raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

// 如果是reactive，那么获取它的值得时候就会 触发它的get方法 去收集起来
export function isReactive (value) {
  // value[ReactiveFlags.IS_REACTIVE] 如果value是一个原始对象，那么它不会去触发get方法，返回的就是undefined，所以取反两次转为布尔值
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadOnly (value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

export function shallowReadonly (raw) {
  return createActiveObject(raw, shallowReadonlyHandlers)
}

export function isProxy(raw) {
  return isReactive(raw) || isReadOnly(raw)
}
