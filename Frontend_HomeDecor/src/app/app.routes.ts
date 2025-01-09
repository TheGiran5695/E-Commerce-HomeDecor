import { Routes } from '@angular/router';
import { HomePageDecorComponent } from './home-page-decor/home-page-decor.component';
import { AllProductsDecorComponent } from './all-products-decor/all-products-decor.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { BedCollectionComponent } from './bed-collection/bed-collection.component';
import { TvSetsCollectionComponent } from './tv-sets-collection/tv-sets-collection.component';
import { CoffeTabelCollectionComponent } from './coffe-tabel-collection/coffe-tabel-collection.component';
import { SofaCollectionComponent } from './sofa-collection/sofa-collection.component';
import { DiningTabelCollectionComponent } from './dining-tabel-collection/dining-tabel-collection.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';

export const routes: Routes = [
    { path: '', component: HomePageDecorComponent },
    { path: 'DIH_Decor/Avvertise/DataShore', component: HomePageDecorComponent },
    { path: 'DIH_Decor/All_Products/DataVisible/Products', component: AllProductsDecorComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order/success/:id', component: OrderSuccessComponent },
    { path: 'HomeDecor_Bed-Collection', component: BedCollectionComponent },
    { path: 'HomeDecor_Tv-Collection', component: TvSetsCollectionComponent },
    { path: 'HomeDecor_CoffeTabel-Collection', component: CoffeTabelCollectionComponent },
    { path: 'HomeDecor_SofaSets-Collection/Data', component: SofaCollectionComponent },
    { path: 'HomeDecor_DiningSets-Collection', component: DiningTabelCollectionComponent },
    { path: 'Signup', component: SignupPageComponent },
    { path: 'Signin', component: SigninPageComponent }
    
];
