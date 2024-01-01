import type {
	ImplantPart,
} from './types';
import astra2018Catalog from './data/astra2018.json';
import astra2023Catalog from './data/astra2023.json';
import nobelCatalog from './data/nobel.json';

export function isImplantPart(detectedReferenceNumber: string): boolean {
	return isAstraPart(detectedReferenceNumber) || isNobelPart(detectedReferenceNumber);
}

const astraPartRegex = new RegExp(/(((2|3)(\d){4})|(680\d{5}))$/);
function isAstraPartRegex(referenceNumber: string): boolean {
	return astraPartRegex.test(referenceNumber);
}

const combinedAstraCatalog = [...astra2018Catalog, ...astra2023Catalog];
function isAstraPart(referenceNumber: string): boolean {
	if (isAstraPartRegex(referenceNumber)) {
		return !!combinedAstraCatalog.find(
			(implantPart) => implantPart.referenceNumber === referenceNumber
		);
	}
	return false;
}

const nobelPartRegex = new RegExp(
	/((REFd{5}(-(\n)?d{2})?)|(Nd{4}(-B)?)|(NBd{8})|((DCA|DIA|DIB) d{3,4}(-(\n)?d))|(d{7}-(\n)?d{3})|(d{4,7}))$/
);
function isNobelPartRegex(referenceNumber: string): boolean {
	return nobelPartRegex.test(referenceNumber);
}

function isNobelPart(referenceNumber: string): boolean {
	if (isNobelPartRegex(referenceNumber)) {
		return !!nobelCatalog.find((implantPart) => implantPart.referenceNumber === referenceNumber);
	}
	return false;
}

export function getAstraPart(referenceNumber: string): ImplantPart | undefined {
	return combinedAstraCatalog.find(
		(implantPart) => implantPart.referenceNumber === referenceNumber
	);
}

export function getNobelPart(referenceNumber: string): ImplantPart | undefined {
	return nobelCatalog.find((implantPart) => implantPart.referenceNumber === referenceNumber);
}