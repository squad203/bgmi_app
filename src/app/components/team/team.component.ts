import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getTeamList,
  toggleIsDead,
  togglePaymentReceived,
  toggleVerification,
  updateKill,
  logoUrl,
  AddTeamInMatch,
  GetMatchPlayers,
} from '../../config';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  createPopup = false;
  view = 'table';
  match = '';
  type = 'view';
  teamList: Array<any> = [];
  teams: any[] = [];
  openIndex = -1;
  logoUrl = logoUrl;
  constructor(
    public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.match = params.match;
      this.type = params.type;
      console.log(this.match);
      if (this.match && this.type === 'view') {
        this.http.get(GetMatchPlayers + this.match).subscribe((res) => {
          console.log(res);
          this.teams = res as any[];
          this.view = 'card';
        });
      } else {
        this.http.get(getTeamList).subscribe((res) => {
          console.log(res);
          this.teams = res as any[];
        });
      }
    });
  }
  openinNewTab(url: string) {
    window.open(url, '_blank')?.focus();
  }
  appendToList(team: any) {
    this.http
      .post(AddTeamInMatch + this.match + '/' + team, '')
      .subscribe((res) => {
        console.log(res);
      });
  }
  removeFromList(team: any) {
    this.teamList = this.teamList.filter((item) => item !== team);
  }
  verificationClick(player_id: any) {
    this.http
      .put(toggleVerification + '?player_id=' + player_id, {})
      .subscribe((res) => {
        console.log(res);
        this.refresPage();
      });
  }
  deadClick(player_id: any) {
    this.http
      .put(toggleIsDead + '?player_id=' + player_id, {})
      .subscribe((res) => {
        console.log(res);
        this.refresPage();
      });
  }
  updateClick(player_id: any, type: any) {
    this.http
      .put(updateKill + '?player_id=' + player_id + '&type=' + type, {})
      .subscribe((res) => {
        console.log(res);
        this.refresPage();
      });
  }
  paymentClick(team_id: any) {
    this.http
      .put(togglePaymentReceived + '?team_id=' + team_id, {})
      .subscribe((res) => {
        console.log(res);
        this.refresPage();
      });
  }
  refresPage() {
    let currentUrl = this.router.url;
    console.log(currentUrl);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
  changeToCard() {
    this.view = 'card';
  }
  changeToTable() {
    this.view = 'table';
  }
  openPopup(index: number) {
    if (this.match) {
      return;
    }
    this.openIndex = index;
    console.log(index);

    this.createPopup = true;
  }
  closePopup() {
    this.createPopup = false;
  }
}
