import { Component, OnInit, ElementRef, Renderer, OnDestroy, Input, trigger, state, animate, transition, style } from '@angular/core';
import { ActivitiesService} from "./activities.service";
import { Router } from '@angular/router'
import { config } from '../../../smartadmin.config'
import { UserService } from '../../../user/user.service'


declare var $: any;

@Component({
  selector: 'sa-activities',
  templateUrl: 'activities.component.html',
  providers: [ActivitiesService],
  animations: [
  trigger('visibilityChanged', [
    state('shown' , style({ opacity: 1 })),
    state('hidden', style({ opacity: 0 , display: 'none'})),
    transition('shown => hidden', animate('.5s')),
  ])
  ]
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  count:number;
  active:boolean;
  loading: boolean;

  private usuarioDNI: string = '1003443295';


  private socketURL = config.socketUrl; 
  private socket: any;

  public tipoNotificacionActual: string;

  public notificacionesNuevas: any[];
  public notificacionesLeidas: any[];

  constructor(
    private el:ElementRef,
    private renderer: Renderer,
    private activitiesService:ActivitiesService,
    private router:Router,
    private userService:UserService
    ) {
    
    
  }

  ngOnInit() {
    this.active = false;
    this.loading = false;
    this.count = 0;
  }

  setTipoNotificacion(tipo : string){
    this.tipoNotificacionActual= tipo;
  }

  getNotificaionesActivas()
  {
    this.activitiesService.getNotificacionesActivas(this.usuarioDNI)
    .subscribe(response => {this.notificacionesNuevas = response;this.loading= false; this.count = this.notificacionesNuevas.length});
  }
  getNotificaionesInactivas()
  {
    this.activitiesService.getNotificacionesInactivas(this.usuarioDNI)
    .subscribe(response => {this.notificacionesLeidas = response;this.loading= false});
  }

  leerNotificacion(index:number)
  { 
    let notificacion = this.notificacionesNuevas[index];
    notificacion.notEstado = false;
    if(this.count)--this.count;
    this.activitiesService.leerNotificacion(notificacion.notCodig).subscribe();
  }

  borrarNotificacion(index:number)
  {
    let notificacion = this.notificacionesLeidas[index];
    notificacion.notEstado = true;
    this.activitiesService.borrarNotificacion(notificacion.notCodig)
    .subscribe(response => this.notificacionesLeidas.splice(index, 1));
  }

  updateEvent(tipo:string)
  {
    this.loading = true;
    if(tipo == 'Nuevas')
      this.getNotificaionesActivas();
    else if(tipo == 'Archivadas')
      this.getNotificaionesInactivas();
  }

  redirectTo(item:any)
  {
    if(item.notReferenciaDocumento && item.notReferenciaDocumentoCodigo){
      this.router.navigateByUrl(`/${config.routeDoc[item.notReferenciaDocumento]}/${item.notReferenciaDocumentoCodigo}`);
      console.log(`Redirect: /${config.routeDoc[item.notReferenciaDocumento]}/${item.notReferenciaDocumentoCodigo} de ${item.notReferenciaDocumento}`);
    }
  }

  initSocketLayer()
  {
    this.socket = new WebSocket(this.socketURL);
    this.socket.onopen = this.autenticateSocket;
    this.socket.onmessage = this.handleMessage;
    this.socket.parent = this;
  }

  autenticateSocket(this: any, ev: Event) : any
  {
    this.send(`INIT:${this.parent.usuarioDNI}`);
  }

  handleMessage(this: any, ev: MessageEvent): any
  {
    let response = JSON.parse(ev.data);
    this.parent.notificacionesNuevas.unshift(response);
    this.parent.count += response.length || 1;

    //TODO: Agregar mensaje y sonido
    $.smallBox({
          title: "Nueva notificación.",
          content: "",
          color: "#3276b1",
          iconSmall: "fa fa-bell fadeInRight animated",
          timeout: 2000
        });
  }
  vaciarNotificacionesCount()
  {
    this.count = 0;
  }

  

  private documentSub: any;
  onToggle() {
    let dropdown = $('.ajax-dropdown', this.el.nativeElement);
    this.active = !this.active;
    if (this.active) {
      dropdown.fadeIn()


      this.documentSub = this.renderer.listenGlobal('document', 'mouseup', (event) => {
        if (!this.el.nativeElement.contains(event.target)) {
          dropdown.fadeOut();
          this.active = false;
          this.documentUnsub()
        }
      });


    } else {
      dropdown.fadeOut()

      this.documentUnsub()
    }
  }


  ngOnDestroy(){
    this.documentUnsub()
  }

  documentUnsub(){
    this.documentSub && this.documentSub();
    this.documentSub = null
  }

}