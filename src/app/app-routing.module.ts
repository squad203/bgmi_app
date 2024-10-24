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
import { TeamPageComponent } from './components/team-page/team-page.component';
import { FinalPtsComponent } from './components/final-pts/final-pts.component';
import { KillAnimationComponent } from './components/kill-animation/kill-animation.component';

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
    path: 'formteam',
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
  {
    path: 'team_page/:team_code',
    component: TeamPageComponent,
  },
  {
    path: 'final_pts',
    component: FinalPtsComponent,
  },
  {
    path: 'kill_animation',
    component: KillAnimationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
