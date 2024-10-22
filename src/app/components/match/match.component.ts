import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  autoCalculateRAnk,
  createMatch,
  getMatchList,
  getMatchNew,
  GetTeamScore,
  GetTeamScoreNew,
  getTeamsLastRanking,
  getTournamentList,
  updateRank,
} from '../../config';
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
  teamPopup: boolean = false;
  matchs: any[] = [];
  Links: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get(getMatchNew).subscribe((res) => {
      console.log(res);
      this.matchs = res as any[];
    });
  }
  goToscoreboard(id: string) {
    const baseUrl = window.location.origin; // Gets the base URL (e.g., http://localhost:4200)

    const url = baseUrl + '/#/scoreboard?match_id=' + id + '&type=team';
    console.log(url);

    window.open(url, '_blank');
  }
  goToKillAnime(id: string) {
    const baseUrl = window.location.origin; // Gets the base URL (e.g., http://localhost:4200)

    // this.router.navigateByUrl('/kill_animation?match_id=' + id + '&type=team');
    const url = baseUrl + '/#/kill_animation?match_id=' + id + '&type=team';
    console.log(url);
    window.open(url, '_blank');
  }
  goToFinalPts(id: string) {
    // this.router.navigateByUrl('/final_pts?matchId=' + id);
    const baseUrl = window.location.origin; // Gets the base URL (e.g., http://localhost:4200)
    const url = baseUrl + '/#/final_pts?matchId=' + id;
    console.log(url);
    window.open(url, '_blank');
  }
  goToNames(id: string) {
    // this.router.navigateByUrl('/final_pts?matchId=' + id + '&type=team');
    const baseUrl = window.location.origin; // Gets the base URL (e.g., http://localhost:4200)
    const url = baseUrl + '/#/final_pts?matchId=' + id + '&type=team';
    console.log(url);
    window.open(url, '_blank');
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
  updateIndex(team_id: string, rank: number) {
    this.http
      .put(
        updateRank +
          '?team_id=' +
          team_id +
          '&rank=' +
          rank +
          '&match_id=' +
          this.selectedMatch,
        {}
      )
      .subscribe((res) => {
        console.log(res);
        this.http
          .get(getTeamsLastRanking + '?match_id=' + this.selectedMatch)
          .subscribe((res) => {
            console.log(res);
            this.teamsList = res as any[];
          });
      });
  }
  autoCalculateRank() {
    let cnf = prompt('Are you sure you want to auto calculate rank?');
    if (cnf != 'DronaIsBest') {
      return;
    }
    this.http
      .get(autoCalculateRAnk + '?match_id=' + this.selectedMatch)
      .subscribe((res) => {
        console.log(res);
        this.http
          .get(getTeamsLastRanking + '?match_id=' + this.selectedMatch)
          .subscribe((res) => {
            console.log(res);
            this.teamsList = res as any[];
          });
      });
  }
  teamId: any[] = [];
  teamsList: any;
  selectedMatch: any;
  openTeamPopup(id: string) {
    this.selectedMatch = id;
    this.http
      .get(getTeamsLastRanking + '?match_id=' + this.selectedMatch)
      .subscribe((res) => {
        console.log(res);
        this.teamsList = res as any[];
        this.teamPopup = true;
      });
  }
  appendToList(id: string) {
    if (this.teamId.includes(id)) {
      let count = this.teamId.indexOf(id);
      this.teamId.splice(count, 1);
      console.log(this.teamId);
      return;
    }
    this.teamId.push(id);
  }
  generateUrl() {
    let url = `https://bgmiform.netlify.app/#/scoreboardUpdate/${
      this.selectedMatch
    }/${this.teamId.join(',')}`;
    this.copy(url);
    this.Links = [url];
  }

  chunkArray(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
      console.log(i + chunkSize);
    }
    return chunks;
  }
  generateMultipleUrl(event: any) {
    this.Links = [];
    let number = event.target.value;
    console.log(number);
    let ids = [];
    for (let i = 0; i < this.teamsList.length; i++) {
      const element = this.teamsList[i];
      ids.push(element.team_id);
    }
    var arrayList = this.chunkArray(ids, parseInt(number));
    console.log(arrayList);

    for (let i = 0; i < arrayList.length; i++) {
      const element = arrayList[i];
      this.Links.push(
        `https://bgmiform.netlify.app/#/scoreboardUpdate/${
          this.selectedMatch
        }/${element.join(',')}`
      );
    }
  }
  openFullScoreBoard(match_id: string) {
    this.Links = [];

    this.http
      .get(getTeamsLastRanking + '?match_id=' + match_id)
      .subscribe((res) => {
        console.log(res);
        this.teamsList = res as any[];
        let ids = [];
        for (let i = 0; i < this.teamsList.length; i++) {
          const element = this.teamsList[i];
          ids.push(element.team_id);
        }
        var arrayList = this.chunkArray(ids, this.teamsList.length);
        console.log(arrayList);

        for (let i = 0; i < arrayList.length; i++) {
          const element = arrayList[i];
          this.Links.push(
            `https://bgmiform.netlify.app/#/scoreboardUpdate/${match_id}/${element.join(
              ','
            )}`
          );
        }
        window.open(this.Links[0], '_blank');
      });
  }
  closePopup() {
    this.createPopup = false;
  }
  closeTeamPopup() {
    this.teamPopup = false;
    this.Links = [];
  }
  navigateToTeam(matchName: string) {
    // Navigate to team component
    this.router.navigateByUrl('/team?match=' + matchName + '&type=add');
  }
  navigateToTeamView(matchName: string) {
    // Navigate to team component
    this.router.navigateByUrl('/team?match=' + matchName + '&type=view');
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
