import { Validators } from "@angular/forms";
import { ExpRegular } from "./regex";
export class Vehiculo {

	public id: number;

	public anioFabricacion: number;

	public capacidadCarga: number;

	public capacidadTanque: number;

	public estado: boolean;

	public marca: string;

	public modelo: string;

	public nroPasajeros: number;

	public tipoVehiculoBean: any;

	public static maxlength = 'El tamaño máximo es de 4 digitos.';

	constructor() { }

	public static campos() {
		return [
			{
				id: 'anioFabricacion',
				validar: [Validators.nullValidator, Validators.required,Validators.maxLength(4), Validators.pattern(ExpRegular.entero)],
				pattern: ExpRegular.mentero,
				maxLength: this.maxlength
			},
			{
				id: 'capacidadCarga',
				validar: [Validators.nullValidator, Validators.required, Validators.pattern(ExpRegular.decimal)],
				pattern: ExpRegular.mdecimal,
				maxLength: ''
			},
			{
				id: 'capacidadTanque',
				validar: [Validators.nullValidator, Validators.required, Validators.pattern(ExpRegular.decimal)],
				pattern: ExpRegular.mdecimal,
				maxLength: ''
			},
			{
				id: 'marca',
				validar: [Validators.nullValidator, Validators.required, Validators.pattern(ExpRegular.letras)],
				pattern: ExpRegular.mletras,
				maxLength: ''
			},
			{
				id: 'modelo',
				validar: [Validators.nullValidator, Validators.required, Validators.pattern(ExpRegular.nroletras)],
				pattern: ExpRegular.mnroletras,
				maxLength: ''
			},
			{
				id: 'nroPasajeros',
				validar: [Validators.nullValidator, Validators.required, Validators.pattern(ExpRegular.entero)],
				pattern: ExpRegular.mentero,
				maxLength: ''
			},
			{
				id: 'tipoVehiculo',
				validar: [Validators.nullValidator, Validators.required],
				pattern: '',
				maxLength: ''
			},
		];
	}

	public static fieldEmpty() {
		return {
			anioFabricacion: '',
			capacidadCarga: '',
			capacidadTanque: '',
			marca: '',
			modelo: '',
			nroPasajeros: '',
			tipoVehiculo: '',
		};
	}
}