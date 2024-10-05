import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  get_player,
  register_player,
  update_player,
  verify_enrollment,
  verifyEnrollment,
} from '../../config';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
  // imports: [FormsModule, ReactiveFormsModule],
})
export class PlayerFormComponent {
  playerName: string = '';
  playerNumber: number | undefined;
  playerGameID: string = '';
  playerGameName: string = '';
  playerHomeTown: string = '';
  playerEmail: string = '';
  playerEnrollment: string = '';
  errMsg: string | undefined;
  // tournamentId: string | undefined;
  teamCode: string | undefined;
  player_id: string | undefined;
  loading = false;
  playerCount: any;
  name_loading: boolean = false;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  // playerCount: number = 0;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      // this.playerCount = params.player;
      // this.tournamentId = params.tournamentId;
      this.teamCode = params.teamCode;
      this.player_id = params.player_id;
      if (this.player_id) {
        this.http.get(get_player + this.player_id).subscribe((data: any) => {
          this.playerName = data.player_name;
          this.playerNumber = data.mobile;
          this.playerGameID = data.game_info[0].game_id;
          this.playerGameName = data.game_info[0].game_name;
          this.playerEmail = data.email;
          this.playerEnrollment = data.enrollment_no;
        });
      }
    });
  }
  onInput(event: any, type: string = 'text') {
    if (type == 'number') {
      if (event.target.value.length > 10) {
        event.target.value = event.target.value.slice(0, 10);
        this.playerNumber = event.target.value;
      }
    }
    if (type == 'gameId') {
      event.target.value = event.target.value.toString().trim();
      this.playerGameID = event.target.value;
    }
  }
  checkEnrollment() {
    this.playerName = 'Loading....';
    this.http
      .get(verify_enrollment + this.playerEnrollment)
      .subscribe((data: any) => {
        if (data.find == false) {
          alert('Enrollment not found');

          return;
        } else {
          this.playerName = data.name;
        }
      });
  }

  goToPlayers() {
    if (this.playerNumber?.toString().length != 10) {
      this.errMsg = 'Please enter a valid phone number';
      return;
    }

    // #verify all field are filled
    if (
      this.playerName == '' ||
      this.playerNumber == undefined ||
      this.playerGameID == '' ||
      this.playerEmail == '' ||
      this.playerEnrollment == ''
    ) {
      console.log(this.playerEnrollment);

      this.errMsg = 'Please fill all the fields';
      return;
    }
    let email = this.playerEmail;
    let at = email.indexOf('@');
    let dot = email.lastIndexOf('.');
    if (at < 1 || dot < at + 2 || dot + 2 >= email.length) {
      this.errMsg = 'Please enter a valid email';
      return;
    }
    this.loading = true;

    this.http
      .post(register_player, {
        team_code: this.teamCode,
        enrollNo: this.playerEnrollment,
        player_name: this.playerName,
        mobile: this.playerNumber.toString(),
        email: this.playerEmail,
        gameInfo: {
          game_id: this.playerGameID,
          game_name: this.playerGameName,
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate(['/team_page/' + this.teamCode]);
        },
        (err) => {
          this.loading = false;
          console.log(err);
          alert(err.error.detail);
        }
      );
  }
  updatePlayer() {
    if (this.playerNumber?.toString().length != 10) {
      this.errMsg = 'Please enter a valid phone number';
      return;
    }

    // #verify all field are filled
    if (
      this.playerName == '' ||
      this.playerNumber == undefined ||
      this.playerGameID == '' ||
      this.playerEmail == '' ||
      this.playerEnrollment == ''
    ) {
      console.log(this.playerEnrollment);

      this.errMsg = 'Please fill all the fields';
      return;
    }
    let email = this.playerEmail;
    let at = email.indexOf('@');
    let dot = email.lastIndexOf('.');
    if (at < 1 || dot < at + 2 || dot + 2 >= email.length) {
      this.errMsg = 'Please enter a valid email';
      return;
    }
    this.loading = true;

    this.http
      .put(update_player + this.player_id, {
        team_code: this.teamCode,
        enrollNo: this.playerEnrollment,
        player_name: this.playerName,
        mobile: this.playerNumber.toString(),
        email: this.playerEmail,
        gameInfo: {
          game_id: this.playerGameID,
          game_name: this.playerGameName,
        },
      })
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate(['/team_page/' + this.teamCode]);
        },
        (err) => {
          this.loading = false;
          console.log(err);
          alert(err.error.detail);
        }
      );
  }
}
