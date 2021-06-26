"use strict";
var Vehiculos;
(function (Vehiculos) {
    class Auto extends Vehiculos.Vehiculo {
        constructor(id, marca, modelo, precio, cantidadPuertas) {
            super(id, marca, modelo, precio);
            this.cantidadPuertas = cantidadPuertas;
        }
        getPuertas() {
            return this.cantidadPuertas;
        }
        setPuertas(cantidadPuertas) {
            this.cantidadPuertas = cantidadPuertas;
        }
    }
    Vehiculos.Auto = Auto;
})(Vehiculos || (Vehiculos = {}));
