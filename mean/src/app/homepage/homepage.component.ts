import { Component, OnInit } from '@angular/core';
import { lorem } from "faker";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  randomText = lorem.sentence();
  enteredText = "";

  onInput(value: string) {
    this.enteredText = value;
  }

  compares(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return "pending";
    }

    return randomLetter === enteredLetter ? "correct" : "incorrect";
  }



}

