export class Contact {
    id?: number
    name: string | undefined
    surname: string | undefined
    contactNumber: number | undefined
    emailAddress: string | undefined
    dateOfBirth: Date | undefined

    constructor(
        name: string,
        surname: string,
        contactNumber: number,
        emailAddress: string,
        dateOfBirth: Date,
        id?: number
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.contactNumber = contactNumber;
        this.emailAddress = emailAddress;
        this.dateOfBirth = dateOfBirth;
    }
    
}