export abstract class Service {

  protected apiBase: string = 'http://localhost:8000/api/';


  protected async get<T>(url: string): Promise<T> {
    // http get kérés küldése a megadott url-re
    const response = await fetch(`${this.apiBase}${url}`, {
      credentials: 'include',
    });
    // a válasz bodyjának szövegét json objektummá alakítjuk
    return await response.json();
  }

  protected async post<T>(url: string, data: any): Promise<T> {
    // http post kérés küldése a megadott url-re
      const response = await fetch(`${this.apiBase}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      return await response.json();
  }
}
