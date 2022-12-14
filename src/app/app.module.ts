import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { CatlistComponent } from './catlist/catlist.component';
import { CatcardComponent } from './catcard/catcard.component';
import { FilterbarComponent } from './filterbar/filterbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from "@angular/material/core";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import { MatRippleModule } from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {favouriteReducer, loadingReducer, pageReducer} from "../store/store.reducers";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    CatlistComponent,
    CatcardComponent,
    FilterbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatCommonModule,
    MatRippleModule,
    MatIconModule,
    StoreModule.forRoot({favourite: favouriteReducer, loading: loadingReducer, page: pageReducer}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
