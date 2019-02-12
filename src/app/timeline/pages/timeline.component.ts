import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TimelineService } from "../services/timeline.service";
import { MatSnackBar } from "@angular/material";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  witObject = {};
  @ViewChild("witPost") witPost: ElementRef;
  wits: any;
  userData: any;
  faHeart =  faHeart;
  faHeartBroken = faHeartBroken;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar
  ) {}

  //method that will be automatically invoked when the page will be loaded
  ngOnInit() {
    //populate the timeline with the wits
    this.getWits();

    this.getUser();
  
  }

  getWits() {
    this.timelineService.pullWit().subscribe(
      res => {
        this.wits = res;
        console.log(this.wits);
        // this.wits.sort(function(a ,b ){
        //   // Turn your strings into dates, and then subtract them
        //   // to get a value that is either negative, positive, or zero.
        //   return new Date(b.time) - new Date(a.time);
        // });
      },
      err => console.log("error", err)
    );
  }

  submitWit(value: string) {
    this.witObject["wit"] = value;
    this.timelineService.postWit(this.witObject).subscribe(
      res => {
        this.witPost.nativeElement.value = "";
        this.snackBar.open("Wit posted successfully", "ok", {
          duration: 3000
        });
        this.getWits();
        console.log(this.wits);
      },
      err => {
        this.snackBar.open("Error posting wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  getUser() {
    //PS: maybe we should change the name of the user that is logged in from 'userLoggedIN' to 'currentUser'
    //When i was working on my other project the professor told us to use the key word 'current'
    // to keep track of the object that are active.
    //(not sure if i should add that comment here or in the backend)

    //Populate the timeline profile with the current user informations
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
        console.log(this.userData);
      },
      err => console.log("error")
    );
  }
}