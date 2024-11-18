import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class Member {
  @PrimaryColumn({ length: 255 })
  private id: string;

  @Column({ length: 255, nullable: false })
  private name: string;

  @Column({ length: 255, nullable: false })
  private profile_image: string;

  @Column({ length: 255, nullable: false })
  private stream_key: string;

  @Column({ length: 255, nullable: false })
  private broadcast_id: string;

  @Column({ type: 'int', nullable: false })
  private follower_count: number;

  @Column('timestamp with time zone', { name: 'created_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  private updatedAt: Date;
}

export { Member };