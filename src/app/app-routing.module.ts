import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardComponent} from './pages/card/card.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DetailComponent} from './pages/product-detail/detail.component';
import {CartComponent} from './pages/cart/cart.component';
import {AuthGuard} from "./_guards/auth.guard";
import {OrderComponent} from "./pages/order/order.component";
import {OrderDetailComponent} from "./pages/order-detail/order-detail.component";
import {ProductListComponent} from "./pages/product-list/product.list.component";
import {UserDetailComponent} from "./pages/user-edit/user-detail.component";
import {ProductEditComponent} from "./pages/product-edit/product-edit.component";
import {Role} from "./enum/Role";
import { EmailComponent } from './pages/email/email.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { products } from './mockData';
import { AdminuserComponent } from './pages/adminuser/adminuser.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';

const routes: Routes = [
    {path: '', redirectTo: '/product', pathMatch: 'full'},
    {path: 'product/:id', component: DetailComponent},
    {path: 'category/:id', component: CardComponent},
    {path: 'product', component: CardComponent},
    {path: 'category', component: CardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'register', component: SignupComponent},
    {path: 'cart', component: CartComponent},
    {path: 'success', component: SignupComponent},
    {path: 'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
    {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
    {path: 'email', component: EmailComponent},
    {path: 'admin/user', component: AdminuserComponent},
    {path:'product/email', component: ProductListComponent},
    {path:'discount',component:DiscountComponent},
    {path:'wishlist',component:WishListComponent},
    {path: 'seller', redirectTo: 'seller/product', pathMatch: 'full'},
    {path:'sales',component:SalesComponent},
    {path:'addProduct',component:AddProductsComponent},
    {
        path: 'seller/product',
        component: ProductListComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Manager, Role.Employee]}
    },
    {
        path: 'profile',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'seller/product/:id/edit',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Manager, Role.Employee]}
    },
    {
        path: 'seller/product/:id/new',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Employee]}
    },

];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)//{onSameUrlNavigation: 'reload'}
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
