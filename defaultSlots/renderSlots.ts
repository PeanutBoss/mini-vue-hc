import { createVNode } from '../src/runtime-core/vNode'

export function renderSlots (slots, name) {
    const slot = slots[name] || slots
    if (slot) {
        return createVNode('div', {}, slot)
    }
}
