import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProfessionalTable1625784328191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'professional',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'date_of_birth',
                    type: 'timestamp'
                },
                {
                    name: 'gender',
                    type: 'varchar'
                },
                {
                    name: 'job',
                    type: 'varchar'
                },
                {
                    name: 'registration_number',
                    type: 'varchar'
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('professional');
    }

}
