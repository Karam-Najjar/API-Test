import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  @Input() id!: any;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();

  onUpdate(): void {
    this.update.emit(this.id);
  }

  onDelete(): void {
    this.delete.emit(this.id);
  }

  onView(): void {
    this.view.emit(this.id);
  }
}
