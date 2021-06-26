namespace Vehiculos
{
    export class Camioneta extends Vehiculo
    {
        private cuatroxcuatro:string;

        constructor(id:number,marca:string,modelo:string,precio:number,cuatroxcuatro:string)
        {
            super(id,marca,modelo,precio);
            this.cuatroxcuatro=cuatroxcuatro;
        }

        public getCuatro():string
        {
            return this.cuatroxcuatro;
        }

        public setCuatro(cuatro:string):void
        {
            this.cuatroxcuatro=cuatro;
        }
    }
}