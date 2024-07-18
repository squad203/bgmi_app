import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createTournament, getTournamentList } from '../config';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
})
export class TournamentComponent implements OnInit {
  createPopup = false;
  org_logo: File | null = null;
  tournament_banner: File | null = null;
  tournament_name: string = '';
  org_name: string = '';
  team_type: string = '';
  city: string = '';
  max_team: string = '';
  pool_price: string = '';
  game: string = 'BGMI';
  entryFees: string = '';
  loadding = false;
  tournaments: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http.get(getTournamentList).subscribe((res) => {
      console.log(res);
      this.tournaments = res as any[];
    });
  }
  openPopup() {
    this.createPopup = true;
  }
  closePopup() {
    this.createPopup = false;
  }

  selectOrgLogo(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.org_logo = input.files[0];
    }
  }
  selectTourLogo(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.tournament_banner = input.files[0];
    }
  }
  submit() {
    console.log(this.tournament_name);
    console.log(this.org_name);
    console.log(this.team_type);
    console.log(this.city);
    console.log(this.max_team);
    console.log(this.pool_price);
    console.log(this.game);
    console.log(this.entryFees);
    console.log(this.org_logo);
    console.log(this.tournament_banner);
    if (
      this.tournament_name &&
      this.org_name &&
      this.team_type &&
      this.city &&
      this.max_team &&
      this.pool_price &&
      this.game &&
      this.entryFees
    ) {
      let data = new FormData();
      data.append('name', this.tournament_name);
      data.append('org_name', this.org_name);
      data.append('team_type', this.team_type);
      data.append('city', this.city);
      data.append('max_teams', this.max_team);
      data.append('pool_prize', this.pool_price);
      data.append('game', this.game);
      data.append('entry_fee', this.entryFees);
      data.append('organizer_logo', this.org_logo || '');
      data.append('tournament_logo', this.tournament_banner || '');
      console.log(data);
      this.loadding = true;
      this.http.post(createTournament, data).subscribe(
        (res) => {
          console.log(res);
          this.http.get(getTournamentList).subscribe((res) => {
            console.log(res);
            this.tournaments = res as any[];
          });
          this.loadding = false;
          this.closePopup();
        },
        (err) => {
          console.log(err);
          this.loadding = false;
          alert('Something went wrong');
        }
      );
    } else {
      console.log('All fields are mandatory');
    }
  }
}
