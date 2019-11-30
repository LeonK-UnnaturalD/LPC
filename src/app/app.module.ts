import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://findpinearyou.herokuapp.com', options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/Header/Header.component';
import { SearchComponent } from './Components/Search/Search.component';
import { EmptyComponent } from './Components/Empty/Empty.component';
import { BuyPiComponent } from './Components/BuyPi/BuyPi.component';
import { SellersComponent } from './Components/Sellers/Sellers.component';
import { IntroductionComponent } from './Components/Introduction/Introduction.component';
import { FooterComponent } from './Components/Footer/Footer.component';
import { HomeComponent } from './Pages/Home/Home.component';
import { RegisterComponent } from './Pages/Register/Register.component';
import { BuyComponent } from './Pages/Buy/Buy.component';
import { SellComponent } from './Pages/Sell/Sell.component';
import { BuyOfferComponent } from './Pages/BuyOffer/BuyOffer.component';
import { ChatsComponent } from './Pages/Chats/Chats.component';
import { ChatComponent } from './Pages/Chat/Chat.component';
import { UserComponent } from './Pages/User/User.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Pages/Login/Login.component';
import { ProfileComponent } from './Pages/Profile/Profile.component';
import { LoadingComponent } from './Pages/Loading/Loading.component';
import { CreateOfferComponent } from './Pages/CreateOffer/CreateOffer.component';
import { MessagesComponent } from './Components/Messages/Messages.component';
import { OfferResultsComponent } from './Pages/OfferResults/OfferResults.component';
import { SelectComponent } from './Components/Select/Select.component';
import { SelectCurrencyComponent } from './Components/SelectCurrency/SelectCurrency.component';
import { ErrorComponent } from './Components/Error/Error.component';
import { TokenExpiredComponent } from './Pages/TokenExpired/TokenExpired.component';
import { UnavailableComponent } from './Pages/Unavailable/Unavailable.component';
import { SuccessComponent } from './Components/Success/Success.component';
import { DashboardComponent } from './Pages/Dashboard/Dashboard.component';
import { VerifiedEmailComponent } from './Pages/VerifiedEmail/VerifiedEmail.component';
import { WarningComponent } from './Components/Warning/Warning.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    EmptyComponent,
    BuyPiComponent,
    SellersComponent,
    IntroductionComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    BuyComponent,
    SellComponent,
    BuyOfferComponent,
    ChatsComponent,
    ChatComponent,
    UserComponent,
    LoginComponent,
    ProfileComponent,
    LoadingComponent,
    CreateOfferComponent,
    MessagesComponent,
    OfferResultsComponent,
    SelectComponent,
    SelectCurrencyComponent,
    ErrorComponent,
    TokenExpiredComponent,
    UnavailableComponent,
    SuccessComponent,
    DashboardComponent,
    VerifiedEmailComponent,
    WarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
