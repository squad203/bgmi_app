import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetTeamsByMatch, toggleIsDead, updateKill } from '../../config';

@Component({
  selector: 'app-scoreboard-update',
  templateUrl: './scoreboard-update.component.html',
  styleUrl: './scoreboard-update.component.scss',
})
export class ScoreboardUpdateComponent {
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}
  matchId: any;
  teams: any;
  teamsId: any;
  ngOnInit() {
    this.activeRoute.params.subscribe((param: any) => {
      this.matchId = param.matchId;
      this.teamsId = param.id.split(',');
      console.log(this.matchId);
      console.log(this.teamsId);
      if (this.matchId && this.teamsId) {
        this.http
          .get(GetTeamsByMatch + this.matchId + '/' + this.teamsId)
          .subscribe((data) => {
            this.teams = data;
          });
      }
    });
  }
  deadClick(player_id: any) {
    this.http
      .put(toggleIsDead + '?player_id=' + player_id, {})
      .subscribe((res) => {
        console.log(res);
        this.refreshPage();
      });
  }
  updateClick(player_id: any, type: any, kill: number) {
    if (kill == 0 && type == 'remove') {
      return;
    }
    this.http
      .put(updateKill + '?player_id=' + player_id + '&type=' + type, {})
      .subscribe((res) => {
        console.log(res);
        this.refreshPage();
      });
  }
  refreshPage() {
    this.http
      .get(GetTeamsByMatch + this.matchId + '/' + this.teamsId)
      .subscribe((data) => {
        this.teams = data;
      });
  }
}
