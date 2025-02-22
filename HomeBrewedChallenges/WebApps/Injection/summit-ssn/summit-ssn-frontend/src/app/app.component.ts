import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Agent } from '../../../summit-ssn-backend/src/models/agent.model';
import { AgentResponseBody } from '../../../summit-ssn-backend/src/models/agentResponseBody.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MatProgressBarModule, MatExpansionModule, MatToolbarModule, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  private http: HttpClient = inject(HttpClient);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  title = 'Agent Details';
  agents: Agent[] = [];
  sqlThatRan: SafeHtml = '';
  errorMessageFromCall: string = '';
  dataSource = new MatTableDataSource<Agent>();
  @ViewChild (MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['agencyNumber', 'fullName', 'SSN'];
  isAgentCallFinished: boolean = false;


  ngOnInit() {
    this.fetchAgents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  fetchAgents() {
    this.sqlThatRan = '';
    let agencyNumberFromQueryParam = new URLSearchParams(window.location.search).get('agencyNumber');

    if (!agencyNumberFromQueryParam) {
      agencyNumberFromQueryParam = '21';
      let newUrl = new URL(window.location.href);
      newUrl.searchParams.set('agencyNumber', agencyNumberFromQueryParam);
      window.history.pushState({}, '', newUrl);
    }

    this.http.get<AgentResponseBody>(`https://summit-ssn-backend.fozzyfrommuppetsstudio.workers.dev/api/agents?agencyNumber=${agencyNumberFromQueryParam}`)
      .subscribe((data: AgentResponseBody) => {
        this.dataSource.data = data.agents;
        this.sqlThatRan = this.sanitizer.bypassSecurityTrustHtml(data.sqlThatRan);
        this.errorMessageFromCall = data.errorMessage;
      }, (error) => {
        this.errorMessageFromCall = error;
      }, () => {
        this.isAgentCallFinished = true;
      });
  }
}
