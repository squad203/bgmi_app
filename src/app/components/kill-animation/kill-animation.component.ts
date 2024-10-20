import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  GetPlayersScore,
  GetTeamScore,
  GetTeamScoreNew,
  logoUrl,
} from '../../config';
@Component({
  selector: 'app-kill-animation',
  templateUrl: './kill-animation.component.html',
  styleUrl: './kill-animation.component.scss',
})
export class KillAnimationComponent {
  players: any;
  team: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  matchId: any;
  type: any;
  mainTeam: any[] = [];
  logoUrl = logoUrl;
  kill_list: any[] = [];
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.matchId = params.match_id;
      this.type = params.type;
      console.log(this.matchId);
      console.log(this.type);

      if (this.matchId && this.type == 'player') {
        setInterval(() => {
          this.http
            // .get(GetPlayersScore + '?match_id=' + this.matchId)
            .get(GetPlayersScore + '/?match_id=' + this.matchId)
            .subscribe((data) => {
              this.players = data;
            });
        }, 1000);
      }

      if (this.matchId && this.type == 'team') {
        setInterval(() => {
          this.http
            // .get(GetPlayersScore + '?match_id=' + this.matchId)
            .get(GetTeamScoreNew + '?match_id=' + this.matchId)
            .subscribe(async (data: any) => {
              this.team = data;
              const now = new Date(); // Get the current time
              this.team.forEach((item: any) => {
                const killTime = new Date(item.dead_at); // Convert item.date to a Date object
                const timeDifference =
                  (now.getTime() - killTime.getTime()) / 1000; // Difference in seconds
                console.log(timeDifference, item.teamName);

                // If the difference is less than 3 seconds, show animation
                if (timeDifference <= 4) {
                  item.showElimination = true;
                  console.log('showElimination', item.showElimination);
                } else {
                  item.showElimination = false; // Hide animation if it's more than 3 seconds
                }
              });
              console.log(this.team);
            });
        }, 1000);
      }
    });
  }
  // Function to check if kill happened within last 3 seconds
  checkKillTime(data: any) {}
}
