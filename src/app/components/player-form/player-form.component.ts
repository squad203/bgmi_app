import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { verifyEnrollment } from '../../config';

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
  playerHomeTown: string = '';
  playerEmail: string = '';
  playerEnrollment: string = '';
  errMsg: string | undefined;
  tournamentId: string | undefined;
  loading = false;
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  playerCount: number = 0;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      this.playerCount = params.player;
      this.tournamentId = params.tournamentId;
      let data = localStorage.getItem(this.playerCount.toString());
      if (data) {
        this.playerName = JSON.parse(data).player_name;
        this.playerNumber = JSON.parse(data).mobile;
        this.playerGameID = JSON.parse(data).game_id;
        this.playerEnrollment = JSON.parse(data).enrollNo;
        this.playerHomeTown = JSON.parse(data).city;
        this.playerEmail = JSON.parse(data).email;
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
  }
  async checkEnrollment() {}

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
    this.http.get(verifyEnrollment + this.playerEnrollment).subscribe(
      (data: any) => {
        if (data) {
          this.loading = false;
          let data = {
            player_name: this.playerName,
            game_id: this.playerGameID,
            captain: this.playerCount == 1 ? true : false,
            mobile: this.playerNumber,
            email: this.playerEmail,
            enrollNo: this.playerEnrollment,
            age: 0,
            city: '',
            college: '',
          };
          if (this.playerCount != 0) {
            localStorage.setItem(
              this.playerCount.toString(),
              JSON.stringify(data)
            );
          }
          this.router.navigate(['/form/' + this.tournamentId]);
        } else {
          alert('Enrollment not found');
          this.loading = false;
          return;
        }
      },
      (err) => {
        alert('Enrollment not found');
        this.loading = false;
        return;
      }
    );
  }
}
