import { animate, inView, stagger } from 'motion'

// 不再需要全局Window接口声明，因为我们直接导入Lenis库

interface AnimationOptions {
  duration?: number
  delay?: number
}

function getAnimationDuration(element: HTMLElement, defaultDuration: number): number {
  return parseFloat(element.getAttribute('data-duration') || String(defaultDuration))
}

function initFadeAnimation() {
  document.querySelectorAll('[data-in]').forEach((element) => {
    inView(element, (element, entry) => {
      const targetElement = entry.target as HTMLElement
      const animationType = targetElement.getAttribute('data-in')
      if (!animationType) return

      const duration = getAnimationDuration(targetElement, 0.5)

      try {
        handleAnimation(targetElement, animationType, duration)
      } catch (error) {
        console.warn(`Animation error for ${animationType}:`, error)
      }
    })
  })
}

function handleAnimation(element: HTMLElement, type: string, duration: number) {
  switch (type) {
    case 'fadeDown':
      animate(element, { y: ['-100%', 0], opacity: [0, 1] }, { duration })
      break
    case 'fadeUp':
      animate(element, { y: [100, 0], opacity: [0, 1] }, { duration })
      break
    case 'fadeUpChild':
      if (element.children.length > 0) {
        const children = Array.from(element.children)
        animate(children, { y: [100, 0], opacity: [0, 1] }, { duration, delay: stagger(0.2) })
      }
      break
    case 'wordFade':
      const text = element.textContent
      if (text && text.trim()) {
        const words = text.trim().split(' ')
        if (words.length > 0) {
          element.innerHTML = words.map((word: string) => `<span style="display: inline-block; opacity: 0">${word}</span>`).join(' ')

          const spans = element.querySelectorAll('span')
          if (spans.length > 0) {
            animate(spans, { opacity: [0, 1], y: [10, 0] }, { duration: getAnimationDuration(element, 0.4), delay: stagger(0.1) })
          }
        }
      }
      break
    case 'zoomIn':
      animate(element, { scale: [0.5, 1], opacity: [0, 1] }, { duration })
      break
    case 'rotateX':
      animate(element, { transform: ['perspective(1000px) rotateX(30deg)', 'rotateX(0)'] }, { duration: getAnimationDuration(element as HTMLElement, 1) })
      break
  }
}

// 初始化动画
document.addEventListener('astro:page-load', initFadeAnimation)
initFadeAnimation()
