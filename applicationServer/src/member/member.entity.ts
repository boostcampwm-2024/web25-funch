import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class Member {
  @PrimaryColumn({ length: 255 })
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  profile_image: string;

  @Column({ length: 255, nullable: false })
  stream_key: string;

  @Column({ length: 255, nullable: false })
  broadcast_id: string;

  @Column({ type: 'int', nullable: false })
  follower_count: number;

  @Column('timestamp', { name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}

export { Member };
