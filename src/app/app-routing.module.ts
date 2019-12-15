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
import { OfferResultsComponent } from './Pages/OfferResults/OfferResults.component';
import { TokenExpiredComponent } from './Pages/TokenExpired/TokenExpired.component';
import { UnavailableComponent } from './Pages/Unavailable/Unavailable.component';
import { DashboardComponent } from './Pages/Dashboard/Dashboard.component';
import { VerifiedEmailComponent } from './Pages/VerifiedEmail/VerifiedEmail.component';
import { ResetPasswordComponent } from './Pages/ResetPassword/ResetPassword.component';

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
  { path: "create_offer", component: CreateOfferComponent },
  { path: "offer_results", component: OfferResultsComponent },
  { path: "sell/:id", component: BuyOfferComponent },
  { path: "token_expired", component: TokenExpiredComponent },
  { path: "not_available", component: UnavailableComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "verify_email/:id", component: VerifiedEmailComponent },
  { path: "reset_password/:id", component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
