import { Setting } from "../../../app/settings/setting.entity";
import {getManager, MigrationInterface} from "typeorm";

export class InitialSettings1604279269059 implements MigrationInterface {

  public async up(): Promise<void> {
    const manager = getManager();

    // Insert app name
    const appName = new Setting();
    appName.key = 'APPLICATION_NAME';
    appName.value = 'Dev Helper';
    await manager.insert(Setting, appName);
  }

  public async down(): Promise<void> {
    const manager = getManager();
    
    const appName = await manager.findOneOrFail(Setting, { where: { key: 'APPLICATION_NAME' } } )
    await manager.delete(Setting, appName);
  }

}
