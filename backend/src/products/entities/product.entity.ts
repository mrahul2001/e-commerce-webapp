import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    productPrice: number;

    @Column()
    productImage: string;

    @Column()
    productDescription: string;

    @Column()
    productAvailability: number;

    @Column()
    productRating: number;
}
