import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GridService } from 'src/app/helpers/services/grid.service';

@Component({
  selector: 'app-grid-ws',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-ws.component.html',
  styleUrl: './grid-ws.component.scss'
})
export class GridWsComponent {
  grid$ = this.gridService.grid$;

  constructor(private gridService: GridService) {}
}
