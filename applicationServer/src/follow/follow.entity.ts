import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class Follow {
  @PrimaryColumn({ length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  follower: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  following: string;

  @Column('timestamp', { name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export { Follow };
