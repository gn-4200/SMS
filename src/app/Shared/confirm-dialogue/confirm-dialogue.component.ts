import { Component } from '@angular/core';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogue',
  imports: [MatDialogModule],
  templateUrl: './confirm-dialogue.component.html',
  styleUrl: './confirm-dialogue.component.css'
})
export class ConfirmDialogueComponent {

public constructor(private dialogueref:MatDialogRef<ConfirmDialogueComponent>){}
onCancel(){
  this.dialogueref.close(false);
}
onConfirm(){
  this.dialogueref.close(true);
}
}
