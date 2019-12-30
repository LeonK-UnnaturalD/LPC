import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/Chat.service';

export interface ReportData {
  ChatId: string,
  ReportedUserId: string
}

@Component({
  selector: 'app-ReportDialog',
  templateUrl: './ReportDialog.component.html',
  styleUrls: ['./ReportDialog.component.css']
})
export class ReportDialogComponent implements OnInit {
  public Report: FormControl = new FormControl('', { validators: Validators.required });

  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: ReportData,
    private ChatService: ChatService
  ) { }

  ngOnInit() {
  }

  public async ReportUser():Promise<void> {
    if(this.Report.invalid) return;

    this.Data["Reason"] = this.Report.value;
    const reportReq = this.ChatService.Report(this.Data);

    this.ChatService.Error.HandleResult(reportReq, () => {
      window.location.assign('/chats');
      this.ChatService.SendBlock(this.Data.ReportedUserId);
    }, (err) => {
      
    });
  }

}
