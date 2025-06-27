// src/shared/types/iview.types.ts

export interface SorteoItem {
  promocion: string;
  puntos: number;
  cupones: number;
  puntos_Falta: number;
  cupones_Falta: number;
  inOpcionMaximaPermitida: boolean;
  promocionId: number;
  codigoEtapa: string;
  promocionCodigo: string | null;
}

export interface TorneoItem {
  promocion: string;
  posicion: number;
  puntos: number;
  premio: number;
  puntos_Falta: number;
  premio_Falta: number;
  premio_Total: number;
  premio_Total_Texto: string;
  texto_Informativo: string;
  texto_Ejecucion: string;
  mostrar_Puesto: number;
  estado_Activacion: number;
  promocion_Id: number;
  codigo_Etapa: string;
}

export interface PromocionItem {}

export interface IViewData {
  beneficio: SorteoItem[];
  torneo: TorneoItem[];
  promocion: PromocionItem[];
}

export interface IViewResponse {
  status: number;
  success: boolean;
  message: string | null;
  errors: string | null;
  data: IViewData;
}

// src/shared/types/promociones.types.ts

export interface IBeneficioRegalo {
  id: number;
  nombre: string;
  nombreImagen: string;
  stock: number;
}

export interface IBeneficio {
  id: number;
  promocion: string;
  puntos: number;
  puntos_Falta: number;
  puntos_Min: number;
  canjeado: boolean;
  promocion_Tipo_Id: number;
  tipo: string;
  lista_Regalos: IBeneficioRegalo[];
  fecha_ini: string;
  fecha_fin: string;
}

export interface IBeneficioGRID {
  id: number;
  nombre: string;
  nombreImagen: string;
  stock: number;
}

export interface IGrupoPromociones<T = any> {
  nombre: string;
  orden: number;
  lista: T[];
}

export interface IPromocionesData {
  beneficio: IGrupoPromociones[];
  torneo: any[];
  promocion: any[];
}

export interface IPromocionesResponse {
  status: number;
  success: boolean;
  message: string | null;
  errors: string | null;
  data: ISeccion[];
}

export interface ISorteoItem {
  promocion: string;
  puntos: number;
  cupones: number;
  puntos_Falta: number;
  cupones_Falta: number;
  inOpcionMaximaPermitida: boolean;
  promocionId: number;
  codigoEtapa: string;
  promocionCodigo: string;
}

export interface ITorneoItem {
  promocion: string;
  posicion: number;
  puntos: number;
  premio: number;
  puntos_Falta: number;
  premio_Falta: number;
  premio_Total: number;
  premio_Total_Texto: string;
  texto_Informativo: string;
  texto_Ejecucion: string;
  mostrar_Puesto: number;
  estado_Activacion: number;
  promocion_Id: number;
  codigo_Etapa: string;
}

export interface IRegalo {
  id: number;
  nombre: string;
  nombreImagen: string;
  stock: number;
}

export interface IPromocionItem {
  id: number;
  promocion: string;
  puntos: number;
  puntos_Falta: number;
  puntos_Min: number;
  canjeado: boolean;
  promocion_Tipo_Id: number;
  tipo: string;
  lista_Regalos: IRegalo[];
  fecha_ini: string;
  fecha_fin: string;
}

export interface ISeccion<T = any> {
  nombre: string;
  orden: number;
  lista: T[];
}

export interface CanjeRequest {
  promocionid: number;
  tarjeta: number;
  regalo: number;
  asset: number;
  puntos: number;
}
