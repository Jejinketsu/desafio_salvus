import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProfessionalRelations1626372848148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('professional', new TableColumn({
            name: 'userId',
            type: 'uuid'
        }));

        await queryRunner.createForeignKey('professional', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.dropForeignKey('professional', 'userId');
        await queryRunner.dropColumn('professional', 'userId');
    }

}
