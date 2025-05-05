export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement
  if (!form) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const submitBtn = form.querySelector('button[type=submit]') as HTMLButtonElement
    const originalText = submitBtn.textContent

    try {
      // 表单验证
      const formData = new FormData(form)
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const message = formData.get('message') as string

      if (!name || !email || !message) {
        throw new Error('请填写所有必填字段')
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('请输入有效的邮箱地址')
      }

      // 更新按钮状态
      submitBtn.disabled = true
      submitBtn.textContent = '发送中...'

      // 提交表单
      const data = await submitContactForm({
        name,
        email,
        message,
        to: form.dataset.email || ''
      })

      // 成功处理
      alert('消息发送成功！')
      form.reset()
    } catch (error) {
      // 错误处理
      console.error('提交表单错误:', error)
      if (error instanceof Error && error.message.includes('Receiving end does not exist')) {
        alert('服务暂时不可用，请稍后再试')
      } else {
        alert(error instanceof Error ? error.message : '发送失败，请稍后重试')
      }
    } finally {
      // 恢复按钮状态
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  })
}

interface ContactFormData {
  name: string
  email: string
  message: string
  to: string
}

async function submitContactForm(data: ContactFormData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('提交失败，请稍后重试')
  }

  return response.json()
}
