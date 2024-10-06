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
  get_teams,
  get_team_by_code,
  toggleVerification_player,
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
  players: any[] = [];
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
      if (this.type === 'view') {
        this.http.get(get_teams).subscribe((res) => {
          console.log(res);
          this.teams = res as any[];
          this.view = 'card';
        });
      } else {
        this.http.get(get_teams).subscribe((res) => {
          console.log(res);
          this.teams = res as any[];
        });
      }
    });
  }
  copy(id: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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
      .get(toggleVerification_player + player_id, {})
      .subscribe((res) => {
        console.log(res);
        this.refreshPage();
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
  updateClick(player_id: any, type: any) {
    this.http
      .put(updateKill + '?player_id=' + player_id + '&type=' + type, {})
      .subscribe((res) => {
        console.log(res);
        this.refreshPage();
      });
  }
  paymentClick(team_id: any) {
    this.http
      .put(togglePaymentReceived + '?team_id=' + team_id, {})
      .subscribe((res) => {
        console.log(res);
        this.refreshPage();
      });
  }
  addTeam() {
    this.router.navigateByUrl('/formteam');
  }
  refreshPage() {
    if (this.type === 'view') {
      this.http.get(get_teams).subscribe((res) => {
        console.log(res);
        this.teams = res as any[];
        this.view = 'card';
      });
    } else {
      this.http.get(get_teams).subscribe((res) => {
        console.log(res);
        this.teams = res as any[];
      });
    }
  }
  changeToCard() {
    this.view = 'card';
  }
  changeToTable() {
    this.view = 'table';
  }
  openPopup(code: string, index: number) {
    if (this.match) {
      return;
    }

    this.http.get(get_team_by_code + code).subscribe(
      (res: any) => {
        console.log(res);
        this.players = res.players;
      },
      (err) => {
        console.log(err);
        alert(err.error.detail);
      }
    );
    this.openIndex = index;
    console.log(index);

    this.createPopup = true;
  }
  closePopup() {
    this.createPopup = false;
  }
}
