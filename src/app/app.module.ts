import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const config: SocketIoConfig = { url: 'https://findpinearyou.herokuapp.com', options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ResetPasswordComponent } from './Pages/ResetPassword/ResetPassword.component';
import { GoogleAuthComponent } from './Components/GoogleAuth/GoogleAuth.component';
import { FacebookAuthComponent } from './Components/FacebookAuth/FacebookAuth.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EditOfferDialogComponent } from './Components/EditOfferDialog/EditOfferDialog.component';
import { BuisnessComponent } from './Pages/Buisness/Buisness.component';
import { CreateBuisnessComponent } from './Pages/CreateBuisness/CreateBuisness.component';
import { GetBuisnessComponent } from './Pages/GetBuisness/GetBuisness.component';
import { BuisnessBottomSheetComponent } from './Components/BuisnessBottomSheet/BuisnessBottomSheet.component';
import { ContactMeDialogComponent } from './Components/ContactMeDialog/ContactMeDialog.component';
import { CreateReviewDialogComponent } from './Components/CreateReviewDialog/CreateReviewDialog.component';
import { ReportDialogComponent } from './Components/ReportDialog/ReportDialog.component';

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
    WarningComponent,
    ResetPasswordComponent,
    GoogleAuthComponent,
    FacebookAuthComponent,
    EditOfferDialogComponent,
    BuisnessComponent,
    CreateBuisnessComponent,
    GetBuisnessComponent,
    BuisnessBottomSheetComponent,
    ContactMeDialogComponent,
    CreateReviewDialogComponent,
    ReportDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    EditOfferDialogComponent,
    ErrorComponent,
    BuisnessBottomSheetComponent,
    ContactMeDialogComponent,
    CreateReviewDialogComponent,
    ReportDialogComponent
  ]
})
export class AppModule { }
