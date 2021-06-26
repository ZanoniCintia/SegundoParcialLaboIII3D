"use strict";
var Vehiculos;
(function (Vehiculos) {
    class Camioneta extends Vehiculos.Vehiculo {
        constructor(id, marca, modelo, precio, cuatroxcuatro) {
            super(id, marca, modelo, precio);
            this.cuatroxcuatro = cuatroxcuatro;
        }
        getCuatro() {
            return this.cuatroxcuatro;
        }
        setCuatro(cuatro) {
            this.cuatroxcuatro = cuatro;
        }
    }
    Vehiculos.Camioneta = Camioneta;
})(Vehiculos || (Vehiculos = {}));
