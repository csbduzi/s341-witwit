import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search = faSearch;
  dynSearchList=[];
  dynSearchUser={};
  hidden: boolean;
  searchedUser: string;

  constructor(private _router: Router, private _search: SearchService) {
    this.hidden = false;
   }

  ngOnInit() {
  }

  dynSearch(searchedUsername){
    const searchedUserObj={'username':searchedUsername}
    this._search.dropDownUsers(searchedUserObj).subscribe(
      res => {this.dynSearchList = res},
      err => {console.log(err)},
    )
  }

  setSearch(searchedUser){
    if(searchedUser==''){
      this._router.navigate(['search', {p1: 'heyy'}]);
    }
    this.searchedUser=searchedUser;
    this._router.navigate(['search', {p1: this.searchedUser}]);
  }

  toggleInput() {
    this.hidden = !this.hidden;
  }

}
