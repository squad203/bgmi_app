import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { TournamentComponent } from './tournament/tournament.component';
import { MatchComponent } from './components/match/match.component';
import { TeamComponent } from './components/team/team.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThanksComponent } from './thanks/thanks.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PlayerFormComponent,
    NavComponent,
    TournamentComponent,
    MatchComponent,
    TeamComponent,
    ScoreboardComponent,
    ThanksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
