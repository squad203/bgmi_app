import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getTeamsLastRanking } from '../../config';

@Component({
  selector: 'app-final-pts',
  templateUrl: './final-pts.component.html',
  styleUrl: './final-pts.component.scss',
})
export class FinalPtsComponent {
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}
  matchId: any;
  teams: any;
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param: any) => {
      this.matchId = param.matchId;
      console.log(this.matchId);
      if (this.matchId) {
        this.http
          .get(getTeamsLastRanking + '?match_id=' + this.matchId)
          .subscribe((data) => {
            this.teams = data;
          });
      }
    });
  }
}
