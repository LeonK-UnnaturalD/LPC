import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PageData {
  Url: string;
  ImageUrl: string;
  Description: string;
  Name: string;
}

@Component({
  selector: 'app-News',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.css']
})
export class NewsComponent implements OnInit {
  public Pages: PageData[] = new Array<PageData>();
  public Index: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.Pages = [{
      ImageUrl: "https://changelly.com/blog/wp-content/uploads/2019/12/Pi-Network-PI-Cryptocurrency-Review.jpg",
      Description: "Here is a review and roadmap of the new digital cryptocurrency Pi Network (PI). Introduction into the world of eco-mining on your mobile device",
      Url: "https://changelly.com/blog/pi-network-pi-cryptocurrency-review/",
      Name: "changelly"
    },
  {
    ImageUrl: "https://miro.medium.com/max/900/1*RGzTbraqrhHxF-N4Pj_WJA.jpeg",
    Description: "According to different sources (including, stanforddaily) Pi Network was founded by 3 (or 4) individuals only one of which has some technical background the rest came from science, administrative…",
    Url: "https://cryptodigestnews.com/pi-network-rating-update-3f965bcac9",
    Name: "Medium"
  }];

    this.SetBackground();

    setInterval(() => {
      if(this.Index + 1 >= this.Pages.length)
      {
        this.Index = 0;
      }
      else
      {
        ++this.Index;
      }

      this.SetBackground();
    }, 8000);
  }

  public SetBackground():void {
    const html = document.getElementById("reviewImg");
    html.style.backgroundImage = `url(${this.Pages[this.Index].ImageUrl})`;
  }

  public Open():void {
    window.location.assign(this.Pages[this.Index].Url);
  }

}
