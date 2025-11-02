import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/helpers/services/products.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RippleModule
  ],
  providers: [MessageService, ConfirmationService, ProductService]
})
export class UsersComponent implements OnInit {
  products: any[] = [];
  totalRecords: number = 0;
  loading = false;

  productDialog = false;
  product: any = {};
  submitted = false;
  selectedProducts: any[] = [];
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ch: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadProductsLazy({ first: 0, rows: 10 });
  }

  loadProductsLazy(event: TableLazyLoadEvent) {
    this.loading = true;
    const page = event.first ? event.first / (event.rows || 10) : 0;
    const limit = event.rows || 10;
    const sortField = event.sortField || '';
    const sortOrder = event.sortOrder || 1;

    this.productService
      .getProductsPaginated(page, limit, sortField, sortOrder, this.searchTerm)
      .subscribe({
        next: (res) => {
          this.products = res;
          this.totalRecords = 100; // MockAPI δεν επιστρέφει total count — βάλε ένα περίπου ή μέτρα με άλλο call
          this.loading = false;
          this.ch.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching products', err);
          this.loading = false;
        }
      });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      const request = this.product.id
        ? this.productService.updateProduct(this.product.id, this.product)
        : this.productService.createProduct(this.product);

      request.subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: this.product.id ? 'Product Updated' : 'Product Created',
            life: 3000
          });
          this.productDialog = false;
          this.loadProductsLazy({ first: 0, rows: 10 });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Operation failed',
            life: 3000
          });
        }
      });
    }
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Product deleted successfully',
              life: 3000
            });
            this.loadProductsLazy({ first: 0, rows: 10 });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete product',
              life: 3000
            });
          }
        });
      }
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deletes = this.selectedProducts.map((p) =>
          this.productService.deleteProduct(p.id).toPromise()
        );
        Promise.all(deletes).then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000
          });
          this.selectedProducts = [];
          this.loadProductsLazy({ first: 0, rows: 10 });
        });
      }
    });
  }

  onSearch() {
    this.loadProductsLazy({ first: 0, rows: 10 });
  }

  editProduct(product: any) {
    this.product = { ...product }; // κάνουμε shallow copy για να μην πειράζουμε το original
    this.productDialog = true; // ανοίγει το dialog
  }

}
