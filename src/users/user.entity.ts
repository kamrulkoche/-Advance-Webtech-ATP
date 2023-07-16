import { Profile } from 'src/Admin/admin.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Profile, (profile) => profile.info, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
