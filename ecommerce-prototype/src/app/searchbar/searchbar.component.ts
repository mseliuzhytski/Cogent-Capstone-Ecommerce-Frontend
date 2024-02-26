import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {


  
  //animation for search bar
  words: string[] = ["Search...","Red Shirt...", "Airpods...", "Nivea Cream...", "Lenovo Laptop..."]; // List of words to animate
  placeholderIndex: number = 0;
  placeholder: string = 'Search...';


  constructor(){
    //this.animatePlaceholder(); 
  }

  animatePlaceholder() {
    let index = 0;
    const delay = 250;
    let word = this.words[this.placeholderIndex];

    //set interval repeatedly calls at specified interval, basically
    //animation continues every 100 miliseconds until word is done
    const intervalId = setInterval(() => {
      //basically the animation
      this.placeholder += word.charAt(index);
      index++;

      //word done move onto next word
      if (index === word.length) {
        //stop the interval-based function execution set by setinterval
        clearInterval(intervalId);
        //resets variables and sets up the next word after a 1 sec delay
        setTimeout(() => {
          this.placeholder = ''; // Clear placeholder on search bar
          this.placeholderIndex = (this.placeholderIndex + 1) % this.words.length; // Move to next word and go to front if last word
          this.animatePlaceholder(); // Start animation for the next word
        }, 1000);
      }
    }, delay);
  }

  



}
