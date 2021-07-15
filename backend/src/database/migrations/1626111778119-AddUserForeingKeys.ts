import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserForeingKeys1626111778119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user', new TableColumn({ 
            name: 'addressId',
            type: 'int' 
        }));

        await queryRunner.createForeignKey('user', new TableForeignKey({
            columnNames: ['addressId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'address',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.dropForeignKey('user', 'addressId');
        await queryRunner.dropColumn('user', 'addressId');
    }

}
