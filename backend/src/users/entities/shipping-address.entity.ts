import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShippingAddress {
    @PrimaryGeneratedColumn('uuid')
    shippingId: string;

    @Column('uuid')
    userId: string;

    @Column()
    shippingAddress: string;
}
