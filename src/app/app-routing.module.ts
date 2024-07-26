import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { FormComponent } from './components/form/form.component';
import { TournamentComponent } from './tournament/tournament.component';
import { MatchComponent } from './components/match/match.component';
import { TeamComponent } from './components/team/team.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ScoreboardUpdateComponent } from './components/scoreboard-update/scoreboard-update.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form',
  },
  {
    path: 'players',

    component: PlayerFormComponent,
  },
  {
    path: 'tournament',

    component: TournamentComponent,
  },
  {
    path: 'match',

    component: MatchComponent,
  },
  {
    path: 'formteam/:id',
    component: FormComponent,
  },
  {
    path: 'scoreboardUpdate/:matchId/:id',
    component: ScoreboardUpdateComponent,
  },
  {
    path: 'thanks',
    component: ThanksComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
