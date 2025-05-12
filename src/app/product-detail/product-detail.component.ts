import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MySerService } from '../my-ser.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any = null; 
  activeTab: string = 'details'; 
  reviewModalVisible: boolean = false; 
  reviewForm = {
    rating: 0,
    comment: '',
    reviewerName: ''
  };

  constructor(private route: ActivatedRoute, private service: MySerService) {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string) {
    this.service.getProductById(id).subscribe({
      next: (data) => this.product = data,
      error: (error) => console.error('Ошибка загрузки продукта:', error)
    });
  }

  addToCart() {
    if (this.product) {
      this.service.addToCart(this.product.id).subscribe({
        next: () => console.log('Добавлено в корзину'),
        error: (error) => console.error('Ошибка:', error)
      });
    }
  }

  openReviewModal() {
    this.reviewModalVisible = true;
  }

  closeReviewModal() {
    this.reviewModalVisible = false;
    this.reviewForm = { rating: 0, comment: '', reviewerName: '' };
  }

  submitReview() {
    if (this.product) {
      this.service.postReview(this.product.id, this.reviewForm.rating, this.reviewForm.comment, this.reviewForm.reviewerName)
        .subscribe({
          next: () => {
            console.log('Отзыв отправлен');
            this.closeReviewModal();
            this.loadProduct(this.product.id); 
          },
          error: (error) => console.error('Ошибка отправки отзыва:', error)
        });
    }
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}