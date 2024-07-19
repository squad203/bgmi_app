import { Component } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent {
  players = [
    {
      name: 'Krish',
      kill: 23,
      is_dead: false,
    },
    {
      name: 'Krish',
      kill: 23,
      is_dead: false,
    },
    {
      name: 'Krish',
      kill: 23,
      is_dead: true,
    },
    {
      name: 'Krish',
      kill: 23,
      is_dead: false,
    },
    {
      name: 'Krish',
      kill: 23,
      is_dead: false,
    },
    {
      name: 'Krish',
      kill: 23,
      is_dead: false,
    },
  ];
  team = [
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: true,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: false,
        },
        {
          is_dead: true,
        },
        {
          is_dead: true,
        },
        {
          is_dead: true,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: false,
        },
        {
          is_dead: true,
        },
        {
          is_dead: false,
        },
        {
          is_dead: true,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: true,
        },
        {
          is_dead: true,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: true,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: false,
      alive: [
        {
          is_dead: true,
        },
        {
          is_dead: false,
        },
        {
          is_dead: false,
        },
        {
          is_dead: true,
        },
      ],
    },
    {
      name: 'Krish',
      kill: 23,
      is_eliminated: true,
      alive: [
        {
          is_dead: true,
        },
        {
          is_dead: true,
        },
        {
          is_dead: true,
        },
        {
          is_dead: true,
        },
      ],
    },
  ];
}
