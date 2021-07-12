import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserForeingKeys1626111778119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({ 
            name: 'addressId',
            type: 'int' 
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['addressId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'address',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'addressId');
        await queryRunner.dropColumn('users', 'addressId')
    }

}
