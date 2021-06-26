"use strict";
var Vehiculos;
(function (Vehiculos) {
    var listaVehiculos = new Array();
    var globalTr;
    var contenedor;
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.getElementById("alta")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", Abrir);
        (_b = document.getElementById("btnGuardar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", Vehiculos.Guardar);
        (_c = document.getElementById("btnCerrarAbajo")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", Cerrar);
        (_d = document.getElementById("cerrar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", Cerrar);
        (_e = document.getElementById("filtro")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", Vehiculos.Filtrar);
        (_f = document.getElementById("tipo")) === null || _f === void 0 ? void 0 : _f.addEventListener("change", MostrarSelect);
    };
    function MostrarSelect(e) {
        var option = e.target.value;
        if (option == "Auto") {
            var puerta = document.getElementById("divPuertas");
            if (puerta != null)
                puerta.hidden = false;
            var cuatro = document.getElementById("divCuatro");
            if (cuatro != null)
                cuatro.hidden = true;
        }
        else {
            var cuatro = document.getElementById("divCuatro");
            if (cuatro != null)
                cuatro.hidden = false;
            var puerta = document.getElementById("divPuertas");
            if (puerta != null)
                puerta.hidden = true;
        }
    }
    Vehiculos.MostrarSelect = MostrarSelect;
    function Abrir() {
        var recuadro = document.getElementById("contenedorAgregar");
        contenedor = recuadro;
        recuadro.hidden = false;
    }
    Vehiculos.Abrir = Abrir;
    function Cerrar() {
        var recuadro = document.getElementById("contenedorAgregar");
        contenedor = recuadro;
        recuadro.hidden = true;
    }
    Vehiculos.Cerrar = Cerrar;
    function Guardar() {
        var marca = document.getElementById("marca").value;
        var modelo = document.getElementById("modelo").value;
        var precio = document.getElementById("precio").value;
        var cantidadPuertas = document.getElementById("puertas").value;
        var cuatro = document.getElementById("cuatro").value;
        var pro = new Promise((resolve, reject) => {
            var tipo = document.getElementById("tipo").value;
            if (tipo == "Auto") {
                var p = parseInt(precio);
                var cantidad = parseInt(cantidadPuertas);
                if (p.toString() != "NaN" && cantidad.toString() != "NaN") {
                    resolve(new Vehiculos.Auto(CalcularId(), marca, modelo, p, cantidad));
                }
                else {
                    reject("Error");
                }
            }
            else if (tipo == "Camioneta") {
                var p = parseInt(precio);
                resolve(new Vehiculos.Camioneta(CalcularId(), marca, modelo, p, cuatro));
            }
            else {
                reject("Error");
            }
        });
        pro.then((vehiculo) => {
            listaVehiculos.push(vehiculo);
            var tablaVehiculos = document.getElementById("tabla");
            ConstruirFila(tablaVehiculos, vehiculo.getId(), marca, modelo, precio);
        }).catch((error) => {
            alert("Elegir tipo" + error);
        });
    }
    Vehiculos.Guardar = Guardar;
    function Eliminar(tr) {
        var borrar = tr.target.parentNode.parentNode;
        var borrado = borrar.childNodes[0].innerHTML;
        var listaId = listaVehiculos.filter(Vehiculo => Vehiculo.getId() == borrado);
        if (listaId.length > 0) {
            listaVehiculos.splice(borrado, 1);
            tr.target.parentNode.parentNode.remove();
        }
    }
    Vehiculos.Eliminar = Eliminar;
    function CalcularId() {
        var id = 1;
        if (listaVehiculos.length != 0) {
            var lastRegisterIndex = listaVehiculos.length - 1;
            var lastRegister = listaVehiculos[lastRegisterIndex];
            id = lastRegister.getId() + 1;
        }
        return id;
    }
    function ConstruirFila(tabla, id, marca, modelo, precio) {
        var tr = document.createElement("tr");
        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode((id.toString())));
        tr.appendChild(td3);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(marca));
        tr.appendChild(td);
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(modelo));
        tr.appendChild(td2);
        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode(precio));
        tr.appendChild(td4);
        var tdAccion = document.createElement("td");
        var button = document.createElement("button");
        button.textContent = "Eliminar";
        button.addEventListener('click', Vehiculos.Eliminar);
        tdAccion.appendChild(button);
        tr.appendChild(tdAccion);
        tr.addEventListener("dblclick", fillData);
        tabla.appendChild(tr);
    }
    Vehiculos.ConstruirFila = ConstruirFila;
    function fillData(tr) {
        var trFill = tr.target.parentNode;
        globalTr = trFill;
        document.getElementById("nombre").value = trFill.childNodes[0].innerHTML;
        document.getElementById("atributo").value = trFill.childNodes[1].innerHTML;
        document.getElementById("tipo").value = trFill.childNodes[2].innerHTML;
    }
    Vehiculos.fillData = fillData;
    function Filtrar() {
        var promedio = 0;
        var total = 0;
        var select = document.getElementById("tipoFiltro").value;
        if (select == "Camioneta") {
            var listaCamionetas = listaVehiculos.filter(function (item) {
                if (item instanceof Vehiculos.Camioneta) {
                    return item;
                }
            });
            promedio = listaCamionetas.reduce(function (total, item) {
                console.log(item.getPrecio());
                return total += item.getPrecio();
            }, 0);
            promedio = promedio / listaCamionetas.length;
        }
        else if (select == "Auto") {
            var listaAutos = listaVehiculos.filter(function (item) {
                if (item instanceof Vehiculos.Auto) {
                    return item;
                }
            });
            promedio = listaAutos.reduce(function (total, item) {
                console.log(item.getPrecio());
                return total += item.getPrecio();
            }, 0);
            promedio = promedio / listaAutos.length;
        }
        document.getElementById("precioFiltro").value = promedio.toString();
    }
    Vehiculos.Filtrar = Filtrar;
})(Vehiculos || (Vehiculos = {}));
