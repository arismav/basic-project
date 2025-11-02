import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  private baseUrl = 'https://68f40509b16eb6f46833b4b1.mockapi.io/products/v1/products'; // ⚠️ βάλε το δικό σου URL εδώ

  constructor(private http: HttpClient) {}

  getProductsPaginated(
    page: number,
    limit: number,
    sortField?: string | string[],
    sortOrder?: number,
    searchTerm?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', (page + 1).toString())
      .set('limit', limit.toString());
  
    // 👉 Διορθωμένο
    const field = Array.isArray(sortField) ? sortField[0] : sortField;
  
    if (field) params = params.set('sortBy', field);
    if (sortOrder === -1) params = params.set('order', 'desc');
    if (searchTerm && searchTerm.trim() !== '')
      params = params.set('search', searchTerm.trim());
  
    return this.http.get<any>(this.baseUrl, { params });
  }
  

  createProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
