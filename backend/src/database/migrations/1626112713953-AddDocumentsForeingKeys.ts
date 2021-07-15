import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddDocumentsForeingKeys1626112713953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('documents', new TableColumn({
            name: 'professionalId',
            type: 'varchar',
        }));

        await queryRunner.createForeignKey('documents', new TableForeignKey({
            columnNames: ['professionalId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'professional',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.dropForeignKey('documents', 'professionalId');
        await queryRunner.dropColumn('documents', 'professionalId');
    }

}
