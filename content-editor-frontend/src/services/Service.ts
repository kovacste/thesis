export class Service {

  protected apiBase: string = 'http://localhost:8000/api/';

  protected async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.apiBase}${url}`);
    return await response.json();
  }

  protected async post<T>(url: string, data: any): Promise<T> {
      const response = await fetch(`${this.apiBase}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
  }
}
