// 引入Lenis库
import Lenis from 'lenis'

// 初始化Lenis平滑滚动
function initSmoothScroll() {
  // 创建Lenis实例
  const lenis = new Lenis({
    duration: 1.2 // 滚动动画持续时间
    // easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // orientation: 'vertical', // 垂直滚动
    // gestureOrientation: 'vertical',
    // smoothWheel: true,
    // wheelMultiplier: 1,
    // touchMultiplier: 2,
    // infinite: false
  })

  // 使用requestAnimationFrame来更新Lenis
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  // 启动动画循环
  requestAnimationFrame(raf)

  return lenis
}

// 初始化平滑滚动
let lenisInstance: any = null

// 在页面加载时初始化
if (typeof window !== 'undefined') {
  lenisInstance = initSmoothScroll()
}

// 监听路由变化，重新初始化
document.addEventListener('astro:page-load', () => {
  // 如果已经有实例，先销毁
  if (lenisInstance) {
    lenisInstance.destroy()
  }

  // 重新初始化
  lenisInstance = initSmoothScroll()
})

export default lenisInstance
