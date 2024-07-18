import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createMatch, getMatchList, getTournamentList } from '../../config';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss',
})
export class MatchComponent {
  createPopup = false;
  view = 'table';
  tournaments: any[] = [];
  name: string = '';
  type: string = '';
  tournament_id: string = '';
  map: string = '';
  mode: string = '';
  date: string = '';
  loading: boolean = false;
  matchs: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get(getMatchList).subscribe((res) => {
      console.log(res);
      this.matchs = res as any[];
    });
  }
  changeToCard() {
    this.view = 'card';
  }
  changeToTable() {
    this.view = 'table';
  }
  openPopup() {
    this.http.get(getTournamentList).subscribe((res) => {
      console.log(res);
      this.tournaments = res as any[];
    });
    this.createPopup = true;
  }
  closePopup() {
    this.createPopup = false;
  }
  navigateToTeam(matchName: string) {
    // Navigate to team component
    this.router.navigateByUrl('/team?match=' + matchName);
  }
  submit() {
    if (
      this.name &&
      this.type &&
      this.tournament_id &&
      this.map &&
      this.mode &&
      this.date
    ) {
      this.loading = true;
      let data = new FormData();
      data.append('match_name', this.name);
      data.append('match_type', this.type);
      data.append('tournament_id', this.tournament_id);
      data.append('map', this.map);
      data.append('mode', this.mode);
      data.append('match_date', this.date);
      this.http.post(createMatch, data).subscribe(
        (res) => {
          this.loading = false;
          this.closePopup();
        },
        (err) => {
          this.loading = false;
          console.log(err);

          alert('Something went wrong');
        }
      );
    } else {
      this.loading = false;

      alert('Please fill all the fields');
    }
  }
}
