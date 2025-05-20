import { Component } from '@angular/core';
import { VehiclesDataListReponse } from '../../types/responses.type';
import { VehiclesService } from '../../services/vehicles.service';
import { IVehicleData } from '../../interfaces/vehicleData.interface';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-table',
  imports: [ReactiveFormsModule],
  templateUrl: './info-table.component.html',
  styleUrl: './info-table.component.scss'
})
export class InfoTableComponent {

  vehiclesDataList: IVehicleData[] = [];
  filteredVehicleData: IVehicleData | null = null;

  vinControl = new FormControl('');

  constructor(private readonly vehiclesService: VehiclesService) { }



  ngOnInit(): void {

    this.vehiclesService.getVehicles<VehiclesDataListReponse>('vehiclesData')
      .pipe(take(1))
      .subscribe((vehiclesData) => {
        this.vehiclesDataList = vehiclesData;
      })

    this.vinControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(vin => {
      this.filteredVehicleData = this.vehiclesDataList.find(v => v.vin_code.toLowerCase() === vin!.toLowerCase()) || null;
    });

  }

  onVinChange(value: string) {
    this.filteredVehicleData = this.vehiclesDataList.find(v => v.vin_code.toLowerCase() === value.toLowerCase()) || null;
  }
}
