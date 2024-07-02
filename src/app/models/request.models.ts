export class BaseRequestModel {
    id: number;
}

export class AddressRequestModel extends BaseRequestModel {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export class AppointmentRequestModel extends BaseRequestModel {
    appointmentDate: Date;
    petOwnerId: number;
    petId: number;
    reason: string;
}

export class PetBreedRequestModel extends BaseRequestModel {
    name: string;
    petTypeId: number;
}

export class PetOwnerRequestModel extends BaseRequestModel {
    name: string;
    addressId: number;
    phoneNumber: string;
    emailAddress: string;
}

export class PetRequestModel extends BaseRequestModel {
    name: string;
    petTypeId: number;
    petBreedId: number;
    petOwnerId: number;
}

export class PetTypeRequestModel extends BaseRequestModel {
    name: string;
}
