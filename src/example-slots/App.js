import { h, renderSlots } from '../../lib/guide-mini-vue-esm.js'

const Child = {
  setup (props, { emit }) {
    // props.count++
    const emitAdd = (e) => {
      e.stopPropagation()
      emit('add', 'a', 'b', 'c')
    }
    const emitChange = (e) => {
      e.stopPropagation()
      emit('change', 1, 2, 3)
    }
    return {
      emitAdd,
      emitChange
    }
  },
  render() {
    const btn = h('button', {
      onClick: this.emitAdd
    }, 'add')
    const change = h('button', {
      onClick: this.emitChange
    }, 'change')
    const foo = h('div', {}, 'count = ' + this.count)
    return h('div', {}, [foo, btn, change])
  }
}

const SlotComp = {
  setup () {},
  render() {
    const foo = h('div', {}, 'slotComp')
    // return h('div', {}, [foo, h('div', {}, this.$slots)])
    return h('div', {}, [foo, renderSlots(this.$slots)])
    // return h('div', {}, [renderSlots(this.$slots, 'header'), foo, renderSlots(this.$slots, 'footer')])
    // return h('div', {}, [renderSlots(this.$slots, 'header'), foo, renderSlots(this.$slots, 'footer')])
  }
}

export default {
  name: 'App',
  render () {
    window.self = this
    return h(
      'p',
      {
        id: 'root',
        onClick: () => {
          console.log('click')
        }
      },
      [
        h('div', {}, 'hello, ' + this.msg),
        h(
          SlotComp,
          {},
            // h('p', {}, '123')
            [h('p', {}, '123'), h('p', {}, '456')]
          // {
          //   header: h('p', {}, 'header'),
          //   footer: h('p', {}, 'footer')
          // }
        )
      ]
    )
  },
  setup () {
    return {
      msg: 'mini-vue'
    }
  }
}
