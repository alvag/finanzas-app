
export class IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;

    constructor(dataObj) {
        this.descripcion = dataObj && dataObj.descripcion || null;
        this.monto = dataObj && dataObj.monto || null;
        this.tipo = dataObj && dataObj.tipo || null;
        /* this.uid = dataObj && dataObj.uid || null; */
    }
}
