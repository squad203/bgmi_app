import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getTeamList,
  toggleIsDead,
  togglePaymentReceived,
  toggleVerification,
  updateKill,
  logoUrl,
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
  teamList: Array<any> = [];
  teams: any[] = [];
  openIndex = -1;
  logoUrl = logoUrl;
  constructor(
    public activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.match = params.match;
      console.log(this.match);
    });
    this.http.get(getTeamList).subscribe((res) => {
      console.log(res);
      this.teams = res as any[];
    });
  }
  openinNewTab(url: string) {
    window.open(url, '_blank')?.focus();
  }
  appendToList(team: any) {
    this.teamList.push(team);
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
    this.http.get(getTeamList).subscribe((res) => {
      console.log(res);
      this.teams = res as any[];
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
