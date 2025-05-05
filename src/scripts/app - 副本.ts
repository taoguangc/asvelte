import { animate, inView, stagger, scroll } from 'motion'

// 不再需要全局Window接口声明，因为我们直接导入Lenis库

interface AnimationOptions {
  duration?: number
  delay?: number
}

function getAnimationDuration(element: HTMLElement, defaultDuration: number): number {
  return parseFloat(element.getAttribute('data-duration') || String(defaultDuration))
}

function initFadeAnimation() {
  // 使用 motion 的 inView API 替代 IntersectionObserver
  document.querySelectorAll('[data-in]').forEach((element) => {
    inView(element, ({ target }) => {
      const animationType = target.getAttribute('data-in')
      if (!animationType) return

      const duration = getAnimationDuration(target as HTMLElement, 0.5)

      try {
        switch (animationType) {
          case 'fadeDown':
            animate(target, { y: ['-100%', 0], opacity: [0, 1] }, { duration })
            break
          case 'fadeUp':
            animate(target, { y: [100, 0], opacity: [0, 1] }, { duration })
            break
          case 'fadeUpChild':
            if (target.children.length > 0) {
              const children = Array.from(target.children)
              animate(children, { y: [100, 0], opacity: [0, 1] }, { duration, delay: stagger(0.2) })
            }
            break
          case 'wordFade':
            const text = target.textContent
            if (text && text.trim()) {
              const words = text.trim().split(' ')
              if (words.length > 0) {
                target.innerHTML = words.map((word) => `<span style="display: inline-block; opacity: 0">${word}</span>`).join(' ')
                const spans = target.querySelectorAll('span')
                if (spans.length > 0) {
                  animate(spans, { opacity: [0, 1], y: [10, 0] }, { duration: getAnimationDuration(target as HTMLElement, 0.4), delay: stagger(0.1) })
                }
              }
            }
            break
          case 'zoomIn':
            animate(target, { scale: [0.5, 1], opacity: [0, 1] }, { duration })
            break
          case 'rotateX':
            animate(target, { transform: ['perspective(1000px) rotateX(30deg)', 'rotateX(0)'] }, { duration: getAnimationDuration(target as HTMLElement, 1) })
            break
        }
      } catch (error) {
        console.warn(`Animation error for ${animationType}:`, error)
      }
    })
  })

  // 处理视差滚动
  document.querySelectorAll('[data-parallax]').forEach((item) => {
    try {
      const [start = '-100', end = '100'] = (item.getAttribute('data-parallax') || '').split(',')
      scroll(animate(item, { y: [Number(start), Number(end)] }, { ease: 'linear' }), {
        target: item,
        offset: ['start end', 'end start']
      })
    } catch (error) {
      console.warn('Parallax scroll error:', error)
    }
  })
}

// 初始化动画
initFadeAnimation()

// 监听路由变化
document.addEventListener('astro:page-load', () => {
  // 初始化动画
  initFadeAnimation()
})
