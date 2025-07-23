export interface GetTiresParams {
  branchOfficesId: number;
  pageSize: number;
  pageNumber: number;
  companyId?: number;
  tireStatuses?: 'INVENTORY' | 'ANALYSIS' | 'INSTALLED' | 'DISPOSAL';
  makeIds?: number;
  modelIds?: number;
  treadMakeId?: number;
  treadModelId?: number;
  currentLifeCycles?: number;
  dimensionsIds?: number;
}

export interface TireListResponse {
  content: TireItem[];
  pageSize: number;
  pageNumber: number;
  numberOfElements: number;
  empty: boolean;
  lastPage: boolean;
}
export interface TireListError {
  content: [];
  error: string;
}
export interface ResponseSuccess {
  content: any[];
  pageSize: number;
  pageNumber: number;
  numberOfElements: number;
  empty: boolean;
  lastPage: boolean;
}
export interface ResponseError {
  content: [];
  error?: string;
}

export interface TireItem {
  id: number;
  serialNumber: string;
  additionalId?: string;
  companyGroupId: number;
  companyGroupName: string;
  branchOfficeId: number;
  branchOfficeName: string;
  currentLifeCycle: number;
  timesRetreaded: number;
  maxRetreadsExpected: number;
  maxLifeCycles: number;
  recommendedPressure: number;
  currentPressure?: number | null;
  middleInnerTreadDepth?: number | null;
  outerTreadDepth?: number | null;
  middleOuterTreadDepth?: number | null;
  innerTreadDepth?: number | null;
  dot?: string;
  purchaseCost: number;
  newTire: boolean;
  status: 'INVENTORY' | 'ANALYSIS' | 'INSTALLED' | 'DISPOSAL';
  createdAt?: string; // ISO 8601 format (date-time)

  tireSize: TireSizeInfo;
  make: TireMake;
  model: TireModel;

  currentRetread?: TireCurrentRetread;
  installed?: InstalledInfo;
  disposal?: DisposalInfo;
  analysis?: AnalysisInfo;

  registrationImages: TireRegistrationImages[];
}

// Subinterfaces
export interface TireSizeInfo {
  id: number;
  width: number;
  height: number;
  rim: number;
}

export interface TireMake {
  id: number;
  name: string;
}

export interface TireModel {
  id: number;
  name: string;
  groovesQuantity: number;
  treadDepth: number;
}

export interface TireCurrentRetread {
  make: TireMake;
  model: TireModel;
  retreadCost: number;
}

export interface InstalledInfo {
  vehicleId: number;
  vehiclePlate: string;
  fleetId: string;
  installedPosition: number;
  isOnSteeringAxle: boolean;
  vehicleTypeName: string;
}

export interface DisposalInfo {
  disposalReasonId: number;
  disposalReasonDescription: string;
  disposalImagesUrl: Array<string>;
}

export interface AnalysisInfo {
  analysisId: number;
  recapperName: string;
  recapperPickUpId: string;
  reason: string;
}

export interface TireRegistrationImages {
  id: number;
  url: string;
}
