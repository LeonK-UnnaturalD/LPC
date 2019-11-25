import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/Home/Home.component';
import { RegisterComponent } from './Pages/Register/Register.component';
import { BuyComponent } from './Pages/Buy/Buy.component';
import { SellComponent } from './Pages/Sell/Sell.component';
import { BuyOfferComponent } from './Pages/BuyOffer/BuyOffer.component';
import { ChatsComponent } from './Pages/Chats/Chats.component';
import { ChatComponent } from './Pages/Chat/Chat.component';
import { UserComponent } from './Pages/User/User.component';
import { LoginComponent } from './Pages/Login/Login.component';
import { ProfileComponent } from './Pages/Profile/Profile.component';
import { CreateOfferComponent } from './Pages/CreateOffer/CreateOffer.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "buy", component: BuyComponent },
  { path: "sell", component: SellComponent },
  { path: "buy/:id", component: BuyOfferComponent },
  { path: "chats", component: ChatsComponent },
  { path: "chats/:id", component: ChatComponent },
  { path: "user/:id", component: UserComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent },
  { path: "create_offer", component: CreateOfferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
