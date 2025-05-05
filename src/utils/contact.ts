interface ContactFormData {
  name: string
  email: string
  message: string
  to: string
}

export async function submitContactForm(formData: ContactFormData) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30秒超时

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '发送失败')
    }

    return data
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new Error('请求超时，请稍后重试')
    }
    console.error('提交表单时出错：', error)
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}
