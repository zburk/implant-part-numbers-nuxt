export type PartNumber = string;
export type UUID = string;

export type ImplantCompany = {
	id: UUID;
	title: string;
	implantBrand: string;
};

export type ImplantPlatform = {
	id: UUID;
	title: string;
	platformWidth: number;
	companyId: UUID;
};

export type ImplantPart = {
	referenceNumber: PartNumber;
	title: string;
};

export type HealingAbutment = ImplantPart & {
	id: UUID;
	width: number;
	height: number;
	implantPlatformId: UUID;
	healingAbutmentTypeId: UUID;
};

export type HealingAbutmentType = {
	id: UUID;
	title: string;
};

export type CoverScrew = ImplantPart & {
	id: UUID;
	implantPlatformId: UUID;
};

export type ImplantPlatformWithLength = ImplantPart & {
	id: UUID;
	implantPlatformId: UUID;
	length: number;
};