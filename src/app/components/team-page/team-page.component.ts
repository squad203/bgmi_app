import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { final_add_team, getTeam } from '../../config';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent {
  team_code: string = '';
  team_data: any;
  loading: boolean = false;
  default_list: any[] = [1, 2, 3, 4];
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params);
      this.team_code = params.team_code;
      if (this.team_code) {
        this.http.get(getTeam + this.team_code).subscribe(
          (res) => {
            console.log(res);

            this.team_data = res;
            console.log(this.team_data.players.length);

            this.default_list = Array(4 - this.team_data.players.length).fill(
              1
            );
          },
          (err) => {
            console.log(err);
            alert(err.error.detail);
          }
        );
      }
    });
  }
  goToPlayer() {
    this.router.navigate(['players'], {
      queryParams: {
        teamCode: this.team_code,
      },
    });
  }
  goToPlayerWithId(id: string) {
    this.router.navigate(['players'], {
      queryParams: {
        teamCode: this.team_code,
        player_id: id,
      },
    });
  }
  submitTeam() {
    this.loading = true;
    let cnf = confirm('After Submit you can not edit the team');
    if (!cnf) {
      this.loading = false;
      return;
    }
    this.http.get(final_add_team + this.team_code).subscribe(
      (res) => {
        alert('Team Submitted');
        this.loading = false;
      },
      (err) => {
        console.log(err);
        alert(err.error.detail);
        this.loading = false;
      }
    );
  }
}
