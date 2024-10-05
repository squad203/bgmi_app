import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { registerApi } from '../../config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  player1: string = 'Player 1';
  player2: string = 'Player 2';
  player3: string = 'Player 3';
  player4: string = 'Player 4';
  teamName: string = '';
  teamEmail: string = '';
  teamPhone: string = '';
  teamCity: string = '';
  teamCollege: string = '';
  tournamentId: string | undefined;
  loadding = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: any) => {
    //   this.tournamentId = params.id;
    // });
    let one = localStorage.getItem('1');
    let two = localStorage.getItem('2');
    let three = localStorage.getItem('3');
    let four = localStorage.getItem('4');
    if (one) {
      this.player1 = JSON.parse(one).player_name;
    }
    if (two) {
      this.player2 = JSON.parse(two).player_name;
    }
    if (three) {
      this.player3 = JSON.parse(three).player_name;
    }
    if (four) {
      this.player4 = JSON.parse(four).player_name;
    }
    let data = localStorage.getItem('data');
    if (data) {
      this.teamName = JSON.parse(data).teamName;
      this.teamEmail = JSON.parse(data).teamEmail;
      this.teamPhone = JSON.parse(data).teamPhone;
      this.teamCity = JSON.parse(data).teamCity;
      this.teamCollege = JSON.parse(data).teamCollege;
    }
  }
  selectedFile: File | null = null;

  onfileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  onInput(event: any, type: string = 'text') {
    if (type == 'number') {
      if (event.target.value.length > 10) {
        event.target.value = event.target.value.slice(0, 10);
        this.teamPhone = event.target.value;
      }
    }
    if (this.teamCollege == 'Bhagwan Mahavir University') {
      this.teamCity = 'Surat';
    } else if (this.teamCollege == 'Institute of Quality Education') {
      this.teamCity = 'Rajkot';
    } else if (this.teamCollege == 'Kalyan Polytechnic') {
      this.teamCity = 'Jamnagar';
    } else if (this.teamCollege == 'Noble University') {
      this.teamCity = 'Junagadh';
    } else if (this.teamCollege == 'RK University') {
      this.teamCity = 'Rajkot';
    } else if (this.teamCollege == 'Shanti Business School (SBS)') {
      this.teamCity = 'Ahmedabad';
    } else if (this.teamCollege == 'Shri Parekh College') {
      this.teamCity = 'Mahuva';
    } else if (this.teamCollege == 'Sigma University') {
      this.teamCity = 'Vadodara';
    } else if (this.teamCollege == 'Silver Oak University') {
      this.teamCity = 'Ahmedabad';
    } else if (this.teamCollege == 'Skybright Education') {
      this.teamCity = 'Keshod';
    }
    localStorage.setItem(
      'data',
      JSON.stringify({
        teamName: this.teamName,
        teamEmail: this.teamEmail,
        teamPhone: this.teamPhone,
        teamCity: this.teamCity,
        teamCollege: this.teamCollege,
      })
    );
  }
  numberInput(event: any) {}
  goToPlayers(number: number) {
    if (
      !this.teamCity ||
      !this.teamCollege ||
      !this.teamEmail ||
      !this.teamName ||
      !this.teamPhone
    ) {
      alert('Please fill out all team information');
      return;
    }

    if (number == 2) {
      let one = localStorage.getItem('1');

      if (!one) {
        alert('Please fill first player information');
        return;
      }
    }
    if (number == 3) {
      let one = localStorage.getItem('1');
      let two = localStorage.getItem('2');
      if (!one) {
        alert('Please fill first player information');
        return;
      }

      if (!two) {
        alert('Please fill second player information');
        return;
      }
    }
    if (number == 4) {
      let one = localStorage.getItem('1');
      let two = localStorage.getItem('2');
      let three = localStorage.getItem('3');
      if (!one) {
        alert('Please fill second player information');
        return;
      }
      if (!two) {
        alert('Please fill second player information');
        return;
      }
      if (!three) {
        alert('Please fill second player information');
        return;
      }
    }
    this.router.navigateByUrl(
      '/players?player=' + number + '&tournamentId=' + this.tournamentId
    );
  }
  submit() {
    // verify email address is valid
    let email = this.teamEmail;
    let at = email.indexOf('@');
    let dot = email.lastIndexOf('.');
    if (at < 1 || dot < at + 2 || dot + 2 >= email.length) {
      alert('Please enter a valid email');
      return;
    }
    // let player1 = localStorage.getItem('1');
    // let player2 = localStorage.getItem('2');
    // let player3 = localStorage.getItem('3');
    // let player4 = localStorage.getItem('4');

    // if (!player1 || !player2 || !player3 || !player4) {
    //   alert('Please fill out all player information');
    //   return;
    // }
    // if (this.teamPhone.toString().length != 10) {
    //   alert('Phone number should be 10 digit');
    //   return;
    // }
    // if (
    //   JSON.parse(player1).enrollNo == JSON.parse(player2).enrollNo ||
    //   JSON.parse(player1).enrollNo == JSON.parse(player3).enrollNo ||
    //   JSON.parse(player1).enrollNo == JSON.parse(player4).enrollNo ||
    //   JSON.parse(player2).enrollNo == JSON.parse(player1).enrollNo ||
    //   JSON.parse(player2).enrollNo == JSON.parse(player3).enrollNo ||
    //   JSON.parse(player2).enrollNo == JSON.parse(player4).enrollNo ||
    //   JSON.parse(player3).enrollNo == JSON.parse(player1).enrollNo ||
    //   JSON.parse(player3).enrollNo == JSON.parse(player2).enrollNo ||
    //   JSON.parse(player3).enrollNo == JSON.parse(player4).enrollNo ||
    //   JSON.parse(player4).enrollNo == JSON.parse(player1).enrollNo ||
    //   JSON.parse(player4).enrollNo == JSON.parse(player2).enrollNo ||
    //   JSON.parse(player4).enrollNo == JSON.parse(player3).enrollNo ||
    //   JSON.parse(player1).enrollNo == '' ||
    //   JSON.parse(player2).enrollNo == '' ||
    //   JSON.parse(player3).enrollNo == '' ||
    //   JSON.parse(player4).enrollNo == ''
    // ) {
    //   alert('Duplicate Enrollment number Found');
    //   return;
    // }
    // player1 = JSON.parse(player1);
    // player2 = JSON.parse(player2);
    // player3 = JSON.parse(player3);
    // player4 = JSON.parse(player4);

    // let player = [player1, player2, player3, player4];
    var data = new FormData();
    // data.append('tournament_id', this.tournamentId || '');
    data.append('team_name', this.teamName);
    data.append('email', this.teamEmail);
    data.append('mobile', this.teamPhone);
    data.append('city', this.teamCity);
    data.append('college', this.teamCollege);
    // data.append('players', JSON.stringify(player));
    data.append('logo', this.selectedFile || '');
    this.loadding = true;
    this.http.post(registerApi, data).subscribe(
      (data: any) => {
        console.log(data);
        this.loadding = false;
        localStorage.clear();
        this.router.navigateByUrl('/team_page/' + data.teamCode);
      },
      (err) => {
        console.log(err);
        this.loadding = false;
        alert(err.error.detail);
      }
    );
  }
}
