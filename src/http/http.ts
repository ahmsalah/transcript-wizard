class HTTP {
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, options)
      return this.handleResponse<T>(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<TRequest, TResponse>(
    url: string,
    data: TRequest,
    options?: RequestInit,
  ): Promise<TResponse> {
    const defaultOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      return this.handleResponse<TResponse>(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<TResponse>(url: string, options?: RequestInit): Promise<TResponse> {
    const defaultOptions: RequestInit = {
      method: 'DELETE',
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      return this.handleResponse<TResponse>(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async patch<TRequest, TResponse>(
    url: string,
    data: TRequest,
    options?: RequestInit,
  ): Promise<TResponse> {
    const defaultOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      return this.handleResponse<TResponse>(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Log error to sentry or similar
      throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json() as Promise<T>
  }

  private handleError(error: unknown): Promise<never> {
    // Log error to console or Sentry or similar
    if (error instanceof Error) {
      console.error(`Request error: ${error.message}`)
    } else {
      console.error('Unknown request error')
    }

    return Promise.reject(error)
  }
}

export const http = new HTTP()
