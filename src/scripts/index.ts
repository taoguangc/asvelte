import EmblaCarousel from 'embla-carousel'
import type { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons'
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton'
import '@styles/embla.css'
// 引入Lenis平滑滚动
import './lenis'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start'
}

function initCarousel() {
  const emblaNodes = document.querySelectorAll('.embla')
  if (!emblaNodes.length) return // 如果页面上没有轮播图，直接返回

  emblaNodes.forEach((emblaNode) => {
    const viewportNode = emblaNode.querySelector('.embla__viewport') as HTMLElement
    const prevBtnNode = emblaNode.querySelector('.embla__button--prev') as HTMLElement
    const nextBtnNode = emblaNode.querySelector('.embla__button--next') as HTMLElement
    const dotsNode = emblaNode.querySelector('.embla__dots') as HTMLElement

    if (!viewportNode) return // 确保必要的元素存在

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

    if (prevBtnNode && nextBtnNode) {
      const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtnNode, nextBtnNode)
      emblaApi.on('destroy', removePrevNextBtnsClickHandlers)
    }

    if (dotsNode) {
      const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode)
      emblaApi.on('destroy', removeDotBtnsAndClickHandlers)
    }
  })
}

// 初始化轮播图
initCarousel()

// 在路由变化时重新初始化
document.addEventListener('astro:page-load', () => {
  initCarousel()
})
