import { Guid } from "guid-typescript";

export interface Position {
    secondaryPositionId: Guid;
    objectIdCompany: string;
    posClassName: string;
    posTypeName: string;
    productCategory: string;
    supplier: string;
    location: string;
    comment:string;
    img:string;
    isImgHorizontal:boolean;
    valid: boolean;
}
