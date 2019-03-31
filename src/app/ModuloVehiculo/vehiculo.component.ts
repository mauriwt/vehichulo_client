import { Component, OnInit } from '@angular/core';
import { config } from 'app/shared/smartadmin.config';
import { GenericoService, CRUDService, AlertasService, FormService } from 'app/providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehiculo, TipoVehiculo } from 'app/models';
import { FormGroup } from '@angular/forms';

declare var $;
@Component({
    selector: 'app-vehiculo',
    templateUrl: './vehiculo.component.html',
    styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {


    public formulario: FormGroup;
    public formErrors = Vehiculo.fieldEmpty();
    public vehiculo: Vehiculo;
    public vehiculos: Vehiculo[];
    public tpVehiculos: TipoVehiculo[];
    public cargando: boolean;
    public tipoSelected: number;
    public fechaNacimiento:string;
    public litros:number;
    public galones:number;
    
    constructor(private formService: FormService,
      private crud: CRUDService, private genServer: GenericoService, private router: Router, private aroute: ActivatedRoute, private msj: AlertasService) { }
  
    ngOnInit() {
      this.formulario = this.genServer.generar(Vehiculo.campos());
      this.formulario.valueChanges.subscribe((data) => {
        this.formErrors = this.formService.validateForm(this.formulario, this.formErrors, Vehiculo.campos(), true)
      });
      this.vehiculos = new Array<Vehiculo>();
      this.vehiculo = new Vehiculo();
      this.getTipoVehiculos();
      this.getVehiculos();
    }
  
    getTipoVehiculos() {
      this.cargando = true;
      this.crud.obtener(`${this.genServer._base}${config.APIRest.tpVehiculos.base}`).subscribe(response => {
        this.tpVehiculos = response;
        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  
    getVehiculos() {
      this.cargando = true;
      this.litros = 0;
      this.galones = 0;
      this.crud.obtener(`${this.genServer._base}${config.APIRest.vehiculos.base}`).subscribe(response => {
        this.vehiculos = response;
        this.vehiculos.forEach(item => {
          this.litros += item.capacidadTanque;
        });
        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  
    calcular(litros:number){
      return this.genServer.litrosAgalon(litros);
    }

    save(ruta) {
      console.log(ruta,this.vehiculo)
      this.cargando = true;
      this.setAtributos();
      this.crud.save(`${this.genServer._base}${config.APIRest.vehiculos.base}`, this.vehiculo, ruta).subscribe(response => {
        this.getVehiculos();
        this.cancelar('frmVehiculo');
        this.formulario.reset();
        this.msj.mostrarAlertaMessage("<b>Información</b>", "<b>El registro se guardó correctamente.</b>", "")
      }, error => {
        this.cargando = false;
      })
    }
  
    control() {
      this.vehiculo.id ? this.save("update") : this.save("insert");
    }
  
    setAtributos() {
      this.vehiculo.estado = true;
      this.vehiculo.tipoVehiculoBean = { id: this.tipoSelected };
    }
  
  
    open(modalID) {
      this.genServer.openClose(modalID, 'show')
    }
  
    close(modalID) {
      this.genServer.openClose(modalID, 'hide')
    }
  
    getFila(s) {
      this.vehiculo = Object.assign({}, s);
      this.tipoSelected = this.vehiculo.tipoVehiculoBean.id;
      this.open('mdgVehiculo')
    }
  
    public smbox() {
      //this.formService.markFormGroupTouched(this.formulario);
      if (this.formulario.invalid) {
        this.formErrors = this.formService.validateForm(this.formulario, this.formErrors, Vehiculo.campos(), false);
        return;
      } else {
        $.SmartMessageBox({
          title: "¿ Está seguro que desea continuar ?",
          content: "Si esta seguro que todos los campo están correctamente ingresados pulse en botón aceptar.",
          buttons: "[CANCELAR][ACEPTAR]"
        }, (ButtonPress, Value) => {
          if (ButtonPress === "ACEPTAR") {
            this.control();
          }
        });
      }
    }
  
   
    cancelar(value) {
      this.vehiculo = Object.assign({}, new Vehiculo());
      this.tipoSelected = null;
      this.formulario.reset();
      this.close('mdgVehiculo');
    }


    
}
