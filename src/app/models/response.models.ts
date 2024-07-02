export class BaseResponseModel {
    id: number;
}

export class AddressResponseModel extends BaseResponseModel {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export class AppointmentResponseModel extends BaseResponseModel {
    appointmentDate: Date;
    petOwnerId: number;
    petId: number;
    reason: string;
    petOwner: PetOwnerResponseModel;
    pet: PetResponseModel;
}

export class PetBreedResponseModel extends BaseResponseModel {
    name: string;
    petTypeId: number;
    petType: PetTypeResponseModel;
}

export class PetOwnerResponseModel extends BaseResponseModel {
    name: string;
    addressId: number;
    phoneNumber: string;
    emailAddress: string;
    pets: PetResponseModel[];
    address: AddressResponseModel;
}

export class PetResponseModel extends BaseResponseModel {
    name: string;
    petTypeId: number;
    petBreedId: number;
    petOwnerId: number;
    petType: PetTypeResponseModel;
    petBreed: PetBreedResponseModel;
    petOwner: PetOwnerResponseModel;
}

export class PetTypeResponseModel extends BaseResponseModel {
    name: string;
    petBreeds: PetBreedResponseModel[];
}

export class APIResponseModel<T> {
    status: string;
    message: string;
    data: T | null; 
  
    constructor(status: string, message: string, data: T | null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }