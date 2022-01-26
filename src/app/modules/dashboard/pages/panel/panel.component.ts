import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  providers: [DashboardService]
})
export class PanelComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  public userEmail: string;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private dashBoardService: DashboardService
  ) {
    this.userEmail = 'Usuario';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userEmail = this.dashBoardService.getUserName();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);;
  }

  logOut(){
    this.dashBoardService.logOutApp();
  }

}
