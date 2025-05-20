import { Component, OnInit, signal, computed, effect, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehiclesService } from '../../services/vehicles.service';
import { IVehicle } from '../../interfaces/vehicle.interface';
import { NgOptimizedImage } from '@angular/common';

import { VehiclesListReponse } from '../../types/responses.type';
import { take } from 'rxjs';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { InfoTableComponent } from '../../components/info-table/info-table.component';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, StatCardComponent, InfoTableComponent, NgOptimizedImage, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vehiclesList = signal<IVehicle[]>([]);
  selectedVehicleModel = signal<string>('Ranger');
  
  
  constructor(
    private readonly _vehiclesService: VehiclesService
  ) { }
  
  selectedCurrentVehicle = computed(() => {
    const found = this.vehiclesList().find(v => v.model === this.selectedVehicleModel());
    return found ?? null;
  });

  onVehicleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.selectedVehicleModel.set(selectedValue);
  }

  ngOnInit(): void {
    this._vehiclesService.getVehicles<VehiclesListReponse>('vehicles')
      .pipe(take(1))
      .subscribe((vehiclesList) => {
        console.log(vehiclesList)
        this.vehiclesList.set(vehiclesList);
        if (vehiclesList.some(v => v.model === this.selectedVehicleModel())) {
          return;
        }
        this.selectedVehicleModel.set(vehiclesList[0]?.model || '');
      })
  }

}
