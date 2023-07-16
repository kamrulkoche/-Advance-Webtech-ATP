import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity, AdminUpdateEntity, Profile, chatwithmechanic} from './admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { ManagerEntity } from 'src/manager/manager.entity';
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO, AdminUpdatePassDTO, AdminVarifyPassDTO, NewsDTO, profileDTO } from './adminform.dto';
import { NewsEntity } from 'src/news/news.entity';


@Injectable()
export class AdminService {
  private pin: number;
  private id: any;

  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
   @InjectRepository(NewsEntity) private newsRepo: Repository<NewsEntity>,
   @InjectRepository(chatwithmechanic) private customerChatRepo: Repository<chatwithmechanic>,
   @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
    private readonly mailerService: MailerService
  ) { }


  // ------------------- admin signup Routes [Start] ---------------------//
  async signup(data: AdminDTO): Promise<AdminEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.adminRepo.save(data);
  }

  // ------------------- admin signIn Routes [Start] ---------------------//
  async signIn(data: AdminLoginDTO) {
    try {
      const userdata = await this.adminRepo.findOneBy({ email: data.email });
      if (userdata) {
        const match: boolean = await bcrypt.compare(data.password, userdata.password);
        console.log(`${userdata} and ${match}`);
        return match;
      }
      else
        return false;
    }
    catch (error) {
      throw new UnauthorizedException("Enter the proper email or password");
    }
  }

  // ------------------- admin getProfile Routes [Start] ---------------------//
  getProfile(email): Promise<any> {
    return this.adminRepo.findOneBy({ email: email });
  }

  // ------------------- admin forgetPassword Routes [Start] ---------------------//
  async forgetPassword(acc: any) {
    let user = await this.adminRepo.findOneBy({
      email: acc.email
    });

    try {
      this.id = user.id;
      console.log(`ID is ${this.id}`);

      this.pin = Math.floor(100000 + Math.random() * 900000);
      await this.mailerService.sendMail({
        from: "",
        to: acc.email,
        subject: `Reset password Instruction from GraspWay`,
        text: `Let's reset your password\nG-${this.pin} is you varification code\n\n*Don't share with anyone.`,
      });
      console.log(this.pin);

      return "Varification Code sent to Admin Email."
    }
    catch {
      return "Email not found!";
    }
  }

  // ------------------- admin forgetPassword varifyPass Routes [Start] ---------------------//
  async varifyPass(admin: AdminVarifyPassDTO) {
    let isValid = false;
    let user = await this.adminRepo.findOne({
      where: {
        id: this.id,
      }
    });
    console.log(user);
    if (user && this.pin == admin.pin) {
      isValid = true;
    }

    if (isValid) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(admin.password, salt);
      await this.adminRepo.save(user);
      console.log();
      return "Password reseted!";
    }

    else
      return "Invalid or expired pin.";
  }

  // ------------------- admin Id Search Routes [Start] ---------------------//
  async getAdminById(id: number): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id });
  }
  // ------------------- admin Id Search Routes [End] ---------------------//



  // ------------------- admin Id Search By Name Routes [Start] ---------------------//
  async getAdminbyIDAndName(id, data): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id: id, lname: data });
  }
  // ------------------- admin Id Search By Name Routes [End] ---------------------//



  // ------------------- admin all Registration Listshow Routes [Start] ---------------------//
  async findAll(): Promise<AdminEntity[]> {
    return this.adminRepo.find();
  }
  // ------------------- admin all Registration Listshow Routes [End] ---------------------//



  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.adminRepo.delete(id);
    return deleteResult.affected > 0;
  }



  async updateAdmin(email: string, data: AdminUpdateDTO): Promise<AdminEntity> {
    await this.adminRepo.update({ email: email }, data);
    return this.adminRepo.findOneBy({ id: data.id });
  }


  // ------------------- Admin UpdateById Routes [Start] ---------------------//
  async updateAdminById(id: number, data: AdminUpdateDTO): Promise<AdminUpdateEntity> {
    await this.adminRepo.update(id, data);
    return this.adminRepo.findOneBy({ id });
  }
  // ------------------- admin UpdateById Routes [End] ---------------------//


  // ------------------- Admin getManagersByAdminID Routes [Start] ---------------------//
  getManagersByAdminID(id): any {
    return this.adminRepo.find({
      where: { id: id },
      relations: {
        managers: true,
      },
    });
  }


  // ------------------- Admin deleteManagersByAdminID Routes [Start] ---------------------//
  async deleteManagersByAdminID(id): Promise<any> {
    // select * form manager where id = id
    const user = await this.managerRepo.findOne({
      where: { id: id }
    });

    if (user) {

      this.managerRepo.delete(id);
      return "Delete Manager ID"
    }

    else
      return { Failed: "Manager not found!" }
  }


// ------------------- Admin changePassword verifyPassword Routes [Start] ---------------------//
  //verify password
  async verifyPassword(id, data: AdminUpdatePassDTO): Promise<any> {
    const profile = await this.adminRepo.findOneBy({ id: id });
    const isMatch: boolean = await bcrypt.compare(data.password, profile.password);
    if (isMatch) {
      return isMatch;
    }
    else {
      return false;
    }
  }


// ------------------- Admin changePassword  Routes [Start] ---------------------//
  async changePassword(id, password): Promise<any> {
    const pass = await bcrypt.genSalt();
    password = await bcrypt.hash(password, pass);
    return this.adminRepo.update(id, { password: password });
  }
  


  async chatWithMechanic(id, data: chatwithmechanic): Promise<chatwithmechanic> {
    data.sender = id;
    return this.customerChatRepo.save(data);
  }

  async getCustomerChat(id) {
    return this.customerChatRepo.find({
      where: { sender: id },
      relations: {
        sender: true,
        receiver: true
      },
    });
  }

  async getMechanicChat(id) {
    return this.customerChatRepo.find({
      where: { receiver: id },
      relations: {
        sender: true,
        receiver: true
      },
    });
  }


  addprofile(mydto: profileDTO): any {
    return this.profilesRepository.save(mydto);
}

getProfileByUser(id): any {
    return this.profilesRepository.find({ where: { id: id }, relations: { info: true },});
}



}