import Velocity from 'velocity-animate'

export default {
  functional: true,
  render(createElement, context) {
    const data = {
      class: 'ex-transition-list',
      props: {
        name: 'ex-transition-list',
        mode: 'out-in',
        tag: 'div',
      },
      on: {
        beforeEnter(el) {
          el.style.opacity   = 0
          el.style.top = '1rem'
        },
        enter(el, done) {
          const delay = el.dataset.index * 150
          setTimeout(() => {
            Velocity(
              el,
              {opacity: 1, top: 0},
              {complete: done}
            )
          }, delay)
        },
        leave(el, done) {
          const delay = el.dataset.index * 150
          setTimeout(() => {
            Velocity(
              el,
              {opacity: 0, top: '1rem'},
              {complete: done}
            )
          }, delay)
        }
      }
    }
    return createElement('transition-group', data, context.children)
  }
}
