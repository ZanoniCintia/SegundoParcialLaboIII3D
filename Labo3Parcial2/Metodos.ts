namespace Vehiculos
{
    var listaVehiculos: Array<Vehiculo> = new Array <Vehiculo>();
    var globalTr : any;
    var contenedor:any;


    window.onload = function ()
    {
        document.getElementById("alta")?.addEventListener("click",Abrir);
        document.getElementById("btnGuardar")?.addEventListener("click",Vehiculos.Guardar);
        document.getElementById("btnCerrarAbajo")?.addEventListener("click",Cerrar);
        document.getElementById("cerrar")?.addEventListener("click",Cerrar);
        document.getElementById("filtro")?.addEventListener("click",Vehiculos.Filtrar);
        document.getElementById("tipo")?.addEventListener("change",MostrarSelect);
        
    }

    export function MostrarSelect(e:any){

        var option = e.target.value;
        if(option == "Auto"){
           var puerta=document.getElementById("divPuertas");
           if(puerta != null)
           puerta.hidden=false;

           var cuatro=document.getElementById("divCuatro");
           if(cuatro != null) 
           cuatro.hidden=true;

        }else{
            var cuatro=document.getElementById("divCuatro");
            if(cuatro != null) 
            cuatro.hidden=false;
    
            var puerta=document.getElementById("divPuertas");
            if(puerta != null)
            puerta.hidden=true;
            
        }

    }


    export function Abrir()
        {
            var recuadro:any = document.getElementById("contenedorAgregar");
            contenedor=recuadro;
            recuadro.hidden=false;
        }

    export function Cerrar()
    {
        var recuadro:any = document.getElementById("contenedorAgregar");
            contenedor=recuadro;
            recuadro.hidden=true;
    }
    
    export function Guardar()
    {

        var marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
        var modelo = (<HTMLInputElement>document.getElementById("modelo")).value;
        var precio =(<HTMLInputElement>document.getElementById("precio")).value;
        var cantidadPuertas = (<HTMLSelectElement>document.getElementById("puertas")).value;
        var cuatro = (<HTMLSelectElement>document.getElementById("cuatro")).value;

        var pro = new Promise((resolve, reject) => {
            var tipo = (<HTMLSelectElement>document.getElementById("tipo")).value;
            if (tipo == "Auto")
            {
               
                var p = parseInt(precio);
                var cantidad = parseInt(cantidadPuertas);
                if (p.toString() != "NaN" && cantidad.toString()!="NaN")
                {
                resolve(new Auto(CalcularId(),marca, modelo,p,cantidad))
                }
                else
                {
                    reject("Error")
                }
            }
            else if (tipo == "Camioneta")
            {
                
                var p = parseInt(precio);
                resolve (new Camioneta(CalcularId(),marca, modelo,p,cuatro))
            }
            else 
            {
                reject("Error")
            }
        });

        pro.then((vehiculo) => {
            listaVehiculos.push(<Vehiculo>vehiculo);
            var tablaVehiculos = (<HTMLTableElement>document.getElementById("tabla")); 
            ConstruirFila(tablaVehiculos, (<Vehiculo>vehiculo).getId(), marca, modelo,precio);
                }).catch((error)=>
        {
            alert("Elegir tipo" + error)
        })
    }

    export function Eliminar(tr:any){
        var borrar = tr.target.parentNode.parentNode;
        var borrado  = borrar.childNodes[0].innerHTML
        var listaId = listaVehiculos.filter(Vehiculo => Vehiculo.getId()== borrado);
        if(listaId.length>0)
        {
            listaVehiculos.splice(borrado,1);
            tr.target.parentNode.parentNode.remove();
        }
    }

    function CalcularId()
    {
        var id : number = 1;
        if(listaVehiculos.length != 0)
        {
            var lastRegisterIndex : number = listaVehiculos.length-1;
            var lastRegister : Vehiculo = listaVehiculos[lastRegisterIndex];
            id = lastRegister.getId() + 1;
        }
        return id;
    }


    export function ConstruirFila(tabla:HTMLTableElement, id:number, marca:string, modelo:string,precio:string):void
    {

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
        button.addEventListener('click',Vehiculos.Eliminar);
        tdAccion.appendChild(button);
        tr.appendChild(tdAccion);
        
        tr.addEventListener("dblclick", fillData);
        tabla.appendChild(tr); 
    } 

    export function fillData(tr:any)
    {
        var trFill = tr.target.parentNode;
        globalTr=trFill;
        (<HTMLInputElement>document.getElementById("nombre")).value=trFill.childNodes[0].innerHTML;
        (<HTMLInputElement>document.getElementById("atributo")).value=trFill.childNodes[1].innerHTML;
        (<HTMLInputElement>document.getElementById("tipo")).value=trFill.childNodes[2].innerHTML;
    }

    export function Filtrar()
    {
        var promedio : number=0;
        var total=0;
        var select = (<HTMLInputElement>document.getElementById("tipoFiltro")).value;
        if (select == "Camioneta")
        {
            var listaCamionetas:Array<Vehiculo> = listaVehiculos.filter(function(item){
                if (item instanceof Camioneta)
                {
                    return item;
                }
            } );
            promedio = listaCamionetas.reduce(function(total,item){
                console.log(item.getPrecio());
                return total+=item.getPrecio();
            },0);
            promedio= promedio/listaCamionetas.length;
        }else if (select == "Auto")
        {
            var listaAutos:Array<Vehiculo> = listaVehiculos.filter(function(item){
                if (item instanceof Auto)
                {
                    return item;
                }
        
            });
            promedio = listaAutos.reduce(function(total,item){
                console.log(item.getPrecio());
                return total+=item.getPrecio();
            },0);
            promedio= promedio/listaAutos.length;
        }

        (<HTMLInputElement>document.getElementById("precioFiltro")).value =promedio.toString();
    }



    



              
    

}