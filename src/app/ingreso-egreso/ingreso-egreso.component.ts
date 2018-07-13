import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styles: []
})
export class IngresoEgresoComponent implements OnInit {

    formData: FormGroup;
    tipo = 'ingreso';

    constructor() { }

    ngOnInit() {
        this.formData = new FormGroup({
            descripcion: new FormControl('', Validators.required),
            monto: new FormControl(0, Validators.min(1))
        });
    }

    crearIngresoEgreso() {
        console.log(this.formData.value);
    }

}
