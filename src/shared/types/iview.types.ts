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
  sorteo: SorteoItem[];
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
