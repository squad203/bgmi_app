import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GetPlayersScore,
  GetTeamScore,
  GetTeamScoreNew,
  logoUrl,
} from '../../config';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent {
  players: any;
  team: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  matchId: any;
  type: any;
  mainTeam: any[] = [];
  logoUrl = logoUrl;
  apiCall: any;
  interval: any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);

      this.matchId = params.match_id;
      this.type = params.type;
      console.log(this.matchId);
      console.log(this.type);

      if (this.matchId && this.type == 'player') {
        this.interval = setInterval(() => {
          this.apiCall = this.http
            // .get(GetPlayersScore + '?match_id=' + this.matchId)
            .get(GetPlayersScore + '/?match_id=' + this.matchId)
            .subscribe((data) => {
              this.players = data;
            });
        }, 1000);
      }

      if (this.matchId && this.type == 'team') {
        this.interval = setInterval(() => {
          this.apiCall = this.http
            // .get(GetPlayersScore + '?match_id=' + this.matchId)
            .get(GetTeamScoreNew + '?match_id=' + this.matchId)
            .subscribe((data) => {
              this.team = data;
            });
        }, 1000);
      }
    });
  }
  ngOnDestroy() {
    this.apiCall.unsubscribe();
    clearInterval(this.interval);
  }
}
