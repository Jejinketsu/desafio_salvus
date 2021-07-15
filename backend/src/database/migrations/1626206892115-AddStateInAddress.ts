import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddStateInAddress1626206892115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('address', new TableColumn({
            name: 'state',
            type: 'varchar'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('address', 'state');
    }

}
