import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column('uuid')
    userId: string;

    @Column({type: 'json'})
    orderDetails: Record<string, any>;

    @Column()
    address: string;

    @Column()
    totalAmount: number;

    @Column()
    orderStatus: string;

    @Column()
    paymentMethod: string;

    @CreateDateColumn()
    createdAt: Date;
}
