import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get_match_by_id, getTeamsLastRanking } from '../../config';

@Component({
  selector: 'app-final-pts',
  templateUrl: './final-pts.component.html',
  styleUrl: './final-pts.component.scss',
})
export class FinalPtsComponent {
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {}
  matchId: any;
  teams: any;
  type: any;
  placement_marks = [12, 11, 10, 8, 6, 4, 2, 1, 1, 1, 0];
  match: any;
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param: any) => {
      this.matchId = param.matchId;
      this.type = param.type;
      console.log(this.matchId);
      if (this.matchId) {
        this.http.get(get_match_by_id + this.matchId).subscribe((data) => {
          this.match = data;
        });
        this.http
          .get(getTeamsLastRanking + '?match_id=' + this.matchId)
          .subscribe((data) => {
            this.teams = data;
          });
      }
    });
  }
}
